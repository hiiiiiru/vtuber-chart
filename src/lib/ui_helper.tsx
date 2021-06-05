import { ImArrowDown, ImArrowUp } from "react-icons/im"
import { ChartVideo } from "./types"
import { FC } from "react"

export interface RankCalculatorProps {
  index: number
  indexAdd: number
  video: ChartVideo
}

export interface Rank {
  rankProgress: "NEW" | number | string
  highestRank: number
}

function rankCalculator<RankCalculatorProps>({ index, indexAdd, video }): Rank {
  const currentRank = index + indexAdd
  const { isNew, bestPosition, lastWeek } = video
  const progress = lastWeek - currentRank

  switch (true) {
    case isNew:
      return {
        rankProgress: "NEW",
        highestRank: currentRank,
      }
    case bestPosition > 0:
      return {
        rankProgress: progress === 0 ? "=" : lastWeek - currentRank,
        highestRank: bestPosition,
      }
    default:
      return {
        rankProgress: progress === 0 ? "=" : lastWeek - currentRank,
        highestRank: lastWeek < currentRank ? lastWeek : currentRank,
      }
  }
}

function ProgressIndicator({ rankProgress }) {
  switch (true) {
    case rankProgress > 0:
      return (
        <div className="rank-progress_wrapper d-flex flex-column align-items-center">
          <div className="rank-icon">
            <ImArrowUp />
          </div>
          <div className="rank-progress text-center">{rankProgress}</div>
        </div>
      )
    case rankProgress === "NEW":
    case !rankProgress:
      return <>NEW</>
    case rankProgress === "=":
      return <>=</>
    default:
      return (
        <div className="rank-progress_wrapper d-flex flex-column align-items-center">
          <div className="rank-icon">
            <ImArrowDown />
          </div>
          <div className="rank-progress text-center">{Math.abs(rankProgress)}</div>
        </div>
      )
  }
}

interface ChartComponentProps {
  video: ChartVideo
  index: number
  indexAdd: number
  mode?: "all" | "cover" | "original"
}

export const ChartComponent: FC<ChartComponentProps> = ({
  video,
  index,
  indexAdd,
  mode = "all",
}) => {
  const { highestRank, rankProgress } = rankCalculator({ video, index, indexAdd })

  let copyText = ""

  switch (mode) {
    case "cover":
      copyText = "Composed By"
      break
    case "original":
      copyText = "Original By"
      break
    case "all":
      if (video.type === "ORIGINAL") {
        copyText = "Composed By"
      } else {
        copyText = "Original By"
      }
      break
  }

  return (
    <div className="entry-wrapper" key={video.id}>
      <div className="rank-wrapper">{index + indexAdd}</div>
      <div className="video-info">
        <img src={video.thumbnail} alt="" />
        <div className="overlay-info">
          <div className="info">
            <div className="title">{video.title}</div>
            <div className="artist">{video.artist}</div>
            <div className="composer">
              {copyText} {video.composer}
            </div>
          </div>
          {mode === "all" ? (
            <div className={`type ${video.type.toLocaleLowerCase()}`}>{video.type}</div>
          ) : null}
        </div>
      </div>
      <div className="chart-info">
        <div className="progress-column">
          <ProgressIndicator rankProgress={rankProgress} />
        </div>
        <div className="chart-progress">
          <div className="info">Score : {video.score}</div>
          <div className="info">Week in chart : {video.weeksInChart ?? 1}</div>
          <div className="info">Highest rank : {highestRank}</div>
        </div>
      </div>
    </div>
  )
}
