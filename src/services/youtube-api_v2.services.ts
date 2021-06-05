import got from "got"
import { PlaylistResponse, VideoDetail, VideoSnippet } from "../lib/types"
import * as _ from "lodash"
import ChartHelper from "../lib/helper"
import { metaVideoGetter } from "../lib/api-helper"

export default class YoutubeApiV2 extends ChartHelper {
  async getPlaylistVideos(playlistId: string, nextToken?: string) {
    try {
      const res = await got(`${process.env.YOUTUBE_API_URL}/playlistItems`, {
        searchParams: {
          part: "snippet",
          playlistId: playlistId,
          maxResults: 50,
          key: process.env.YOUTUBE_API_KEY,
          ...(nextToken && { pageToken: nextToken }),
        },
        responseType: "json",
      })

      const body = res.body as PlaylistResponse
      const items = body.items
      const ids: string[] = []
      const snippets: VideoSnippet[] = []

      for (const item of items) {
        const snippet = item.snippet
        ids.push(snippet.resourceId.videoId)
        snippets.push(snippet)
      }

      return {
        nextPageToken: body.nextPageToken,
        totalResults: body.pageInfo.totalResults,
        ids,
        snippets,
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getPlaylistIds(playlistIds: string[]) {
    try {
      let arrayIds: string[] = []

      for (const playlistId of playlistIds) {
        let nextToken: string
        let stop = false

        while (!stop) {
          const res = await this.getPlaylistVideos(playlistId, nextToken)
          const ids = res.ids

          const arr = [...arrayIds]
          arrayIds = _.union(ids, arr)

          if (res.nextPageToken) {
            nextToken = res.nextPageToken
          } else {
            stop = true
          }
        }
      }

      const chunk = _.chunk(arrayIds, 50)

      return {
        flat: arrayIds,
        chunk,
      }
    } catch (e) {
      console.log({ e })
    }
  }

  async getMetaVideos(ids: string[]) {
    try {
      const items = await metaVideoGetter(ids)
      const videos: VideoDetail[] = []

      for (let i = 0; i < items.length; i++) {
        const element = items[i]
        const statistics = element.statistics
        const snippet = element.snippet

        const obj: VideoDetail = {
          id: element.id,
          channelName: snippet.channelTitle,
          publishedAt: snippet.publishedAt,
          channelId: snippet.channelId,
          videoTitle: snippet.title,
          thumbnail: snippet.thumbnails.maxres
            ? snippet.thumbnails.maxres.url
            : snippet.thumbnails.standard
            ? snippet.thumbnails.standard.url
            : snippet.thumbnails.high.url,
          viewCount: statistics.viewCount,
          likeCount: statistics.likeCount ?? 0,
          commentCount: statistics.commentCount ?? 0,
        }

        videos.push(obj)
      }

      return videos
    } catch (e) {
      console.log({ e })
    }
  }
}
