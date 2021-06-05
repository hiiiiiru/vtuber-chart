import { PlaylistIdentifier } from "./types"

export class UrlList {
  playlistPart1: string
  playlistPart2: string
  original: string
  nijisanji: string
  nijisanjiOg: string
  hololive: string
  hololiveOg: string
  allIds: string[]
  coverIds: string[]
  originalIds: string[]
  big2: string[]

  constructor() {
    this.playlistPart2 = "PLpHQKBFP1_SkTZeiBfQLove_jZBIn_kYK"
    this.playlistPart1 = "PLpHQKBFP1_SkiSqlweBIcwv2lNiD3U9Rq"
    this.original = "PLpHQKBFP1_Sn4R2ajRHNRvKHXvrgCt5gu"
    this.nijisanji = "PLXuGkVLvpfdpcSKTh6BTjqcy3rTOVCoY8"
    this.nijisanjiOg = "PLnbXWCI7ERjkNDVrtMDkc7drh8w5Eln3l"
    this.hololive = "PLQmVFdwvZgfXlb2RDXWV1NaPXgYPu786G"
    this.hololiveOg = "PLcA50eR_E8Zbi4hdQHU5Rl1J6KrWRlHpM"
    this.allIds = [
      this.hololive,
      this.nijisanji,
      this.playlistPart1,
      this.playlistPart2,
      this.original,
      this.nijisanjiOg,
      this.hololiveOg,
    ]
    this.coverIds = [this.hololive, this.nijisanji, this.playlistPart1, this.playlistPart2]
    this.originalIds = [this.hololiveOg, this.nijisanjiOg, this.original]
    this.big2 = [this.nijisanji, this.hololive, this.nijisanjiOg, this.hololiveOg]
  }
}

export class IdentifierList {
  playlistPart1: PlaylistIdentifier
  playlistPart2: PlaylistIdentifier
  original: PlaylistIdentifier
  nijisanjiCover: PlaylistIdentifier
  nijisanjiOg: PlaylistIdentifier
  hololiveCover: PlaylistIdentifier
  hololiveOg: PlaylistIdentifier

  constructor() {
    this.hololiveOg = {
      id: "PLcA50eR_E8Zbi4hdQHU5Rl1J6KrWRlHpM",
      type: "ORIGINAL",
      group: "HOLOLIVE",
    }
    this.nijisanjiOg = {
      id: "PLnbXWCI7ERjkNDVrtMDkc7drh8w5Eln3l",
      type: "ORIGINAL",
      group: "NIJISANJI",
    }
    this.hololiveCover = {
      id: "PLQmVFdwvZgfXlb2RDXWV1NaPXgYPu786G",
      type: "COVER",
      group: "HOLOLIVE",
    }
    this.nijisanjiCover = {
      id: "PLXuGkVLvpfdpcSKTh6BTjqcy3rTOVCoY8",
      type: "COVER",
      group: "HOLOLIVE",
    }
    this.original = {
      id: "PLpHQKBFP1_Sn4R2ajRHNRvKHXvrgCt5gu",
      type: "ORIGINAL",
      group: "OTHER",
    }
    this.playlistPart1 = {
      id: "PLpHQKBFP1_SkiSqlweBIcwv2lNiD3U9Rq",
      type: "COVER",
      group: "OTHER",
    }
    this.playlistPart2 = {
      id: "PLpHQKBFP1_SkTZeiBfQLove_jZBIn_kYK",
      type: "COVER",
      group: "OTHER",
    }
  }

  getAll() {
    return [
      this.hololiveOg,
      this.nijisanjiOg,
      this.hololiveCover,
      this.nijisanjiCover,
      this.original,
      this.playlistPart1,
      this.playlistPart2,
    ]
  }
}
