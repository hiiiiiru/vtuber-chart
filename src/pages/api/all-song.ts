import { NextApiRequest, NextApiResponse } from "next"
import * as _ from "lodash"

import { IdentifierList } from "../../lib/url"
import YoutubeApiV3 from "../../services/youtube-api_v3.services"
import { PlaylistIdentifier, VideoDetail } from "../../lib/types"

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const youtube = new YoutubeApiV3()
      const identifier = new IdentifierList()

      const identifiers: PlaylistIdentifier[] = identifier.getAll()

      let arrayVideos: VideoDetail[] = []
      let arrayIds: string[] = []

      for (const identifier1 of identifiers) {
        let nextToken: string
        let stop = false
        let localIds: string[] = []

        while (!stop) {
          const res = await youtube.getPlaylistVideos(identifier1, nextToken)
          const ids: string[] = res.ids

          const spreadArrayIds = [...arrayIds]
          const spreadLocalIds = [...localIds]

          const diff = _.difference(ids, spreadArrayIds)

          arrayIds = [...spreadArrayIds, ...diff]
          localIds = [...spreadLocalIds, ...diff]

          if (res.nextPageToken) {
            nextToken = res.nextPageToken
          } else {
            stop = true
          }
        }

        const chunk = _.chunk(localIds, 50)
        chunk.push("sGZsWaYDTQU")

        const prom = await Promise.all(
          chunk.map(async (i) => {
            return await youtube.getMetaVideos(i, identifier1)
          })
        )

        const data = _.flatten(prom)
        arrayVideos = [...arrayVideos].concat(data)
      }

      //
      // const response = await youtube.getPlaylistIds(ids.allIds)
      // const prom = await Promise.all(
      //   response.chunk.map(async (i) => {
      //     return await youtube.getMetaVideos(i)
      //   })
      // )
      //
      // const data = _.flatten(prom)
      //
      res.status(200).json(arrayVideos)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "" })
    }
  } else {
    res.status(405).end()
  }
}
