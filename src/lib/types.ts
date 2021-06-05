type VideoType = "COVER" | "ORIGINAL"
type Group = "HOLOLIVE" | "NIJISANJI" | "OTHER"
export type PlaylistIdentifier = {
  id: string
  type: VideoType
  group: Group
}

export interface PlaylistResponse {
  nextPageToken?: string
  items: PlaylistItem[]
  pageInfo: {
    totalResults: number
  }
}

export interface VideoListResponse {
  items: VideoListItems[]
}

export interface VideoListItems {
  id: string
  statistics: VideoStatistic
  snippet: VideoSnippet
}

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface PlaylistItem {
  id: string
  snippet: VideoSnippet
}

export interface VideoSnippet {
  publishedAt: Date
  channelId: string
  title: string
  description: string
  thumbnails: {
    default?: Thumbnail
    medium?: Thumbnail
    high?: Thumbnail
    standard?: Thumbnail
    maxres?: Thumbnail
  }
  channelTitle: string
  playlistId: string
  videoOwnerChannelTitle: string
  videoOwnerChannelId: string
  resourceId: {
    videoId: string
  }
}

export interface VideoStatistic {
  commentCount: number
  dislikeCount: number
  favoriteCount: number
  likeCount: number
  viewCount: number
}

export interface VideoDetail {
  id?: string
  channelName?: string
  publishedAt?: Date | string
  channelId?: string
  videoTitle?: string
  thumbnail?: string
  viewCount: number
  likeCount: number
  commentCount: number
  type?: VideoType
  group?: Group
}

export interface ChartVideo extends VideoDetail {
  artist: string
  title: string
  composer: string
  weeksInChart?: number
  lastWeek?: number
  bestPosition?: number
  isNew: boolean
  score: number
  modifierLike: number
  modifierView: number
}
