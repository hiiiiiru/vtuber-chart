import got from "got"
import { VideoListResponse } from "./types"

export async function metaVideoGetter(ids: string[]) {
  const idParams = [
    ["part", "statistics"],
    ["part", "snippet"],
    ["key", process.env.YOUTUBE_API_KEY],
  ]
  for (const id of ids) {
    idParams.push(["id", id])
  }

  const searchParams = new URLSearchParams(idParams)

  const res = await got(`${process.env.YOUTUBE_API_URL}/videos`, {
    searchParams,
    responseType: "json",
  })

  const data = res.body as VideoListResponse
  return data.items
}
