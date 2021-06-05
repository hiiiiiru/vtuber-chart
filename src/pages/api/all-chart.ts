import { NextApiRequest, NextApiResponse } from "next"
import YoutubeApiV2 from "../../services/youtube-api_v2.services"
import { UrlList } from "../../lib/url"
import * as _ from "lodash"

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const youtube = new YoutubeApiV2()
      const ids = new UrlList()

      const response = await youtube.getPlaylistIds(ids.allIds)
      const prom = await Promise.all(
        response.chunk.map(async (i) => {
          return await youtube.getMetaVideos(i)
        })
      )

      const data = _.flatten(prom)

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "" })
    }
  } else {
    res.status(405).end()
  }
}
