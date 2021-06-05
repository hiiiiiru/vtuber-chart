import got from "got"
import { PlaylistIdentifier, PlaylistResponse, VideoDetail } from "../lib/types"
import { metaVideoGetter } from "../lib/api-helper"

export default class YoutubeApiV3 {
  async getPlaylistVideos(playlist: PlaylistIdentifier, nextToken?: string) {
    try {
      const res = await got(`${process.env.YOUTUBE_API_URL}/playlistItems`, {
        searchParams: {
          part: "snippet",
          playlistId: playlist.id,
          maxResults: 50,
          key: process.env.YOUTUBE_API_KEY,
          ...(nextToken && { pageToken: nextToken }),
        },
        responseType: "json",
      })

      const body = res.body as PlaylistResponse
      const items = body.items
      const ids: string[] = []

      for (const item of items) {
        const snippet = item.snippet
        ids.push(snippet.resourceId.videoId)
      }

      return {
        nextPageToken: body.nextPageToken,
        ids,
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getMetaVideos(ids: string[], identifier: PlaylistIdentifier) {
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
          type: identifier.type,
          group: identifier.group,
        }

        videos.push(obj)
      }

      return videos
    } catch (e) {
      console.log({ e })
    }
  }
}
