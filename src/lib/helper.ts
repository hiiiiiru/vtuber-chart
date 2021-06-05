import moment from "moment-timezone"
import { VideoDetail } from "./types"

export default class ChartHelper {
  scoreMultiplier(video: VideoDetail) {
    /*
    View * Modifier C + Comment * Modifier A + like * Modifier B
    Limit for like points is view * 5

    Modifier A = (views + like) / (view + comment + mylist) ^10
    Modifier B = (like/views * 100) * 2
    Modifier C = 1.4 - (days elapsed from upload date / 40)
    *if days elapsed is more than 14, modifier C is 1.00

    (View + Mylist) / (View + Comment + Mylist) (rounded to 2 decimal places)
    (Mylist/View*100)*2, max. 40 (rounded to 2 decimal places)
    */

    const { likeCount, viewCount, publishedAt } = video

    function modifierLike(): number {
      const modifier = (likeCount / viewCount) * 100 * 2

      return parseFloat(modifier.toFixed(2))
    }

    function modifierView() {
      const now = moment(new Date())
      const uploadMoment = moment(publishedAt)
      const diff = now.diff(uploadMoment, "days")
      if (diff > 14) {
        return 1.0
      } else if (diff < 1) {
        return 1.4
      } else {
        const modifier = (1.4 - diff / 40).toFixed(2)
        return parseFloat(modifier)
      }
    }

    function likePoints() {
      const points = likeCount * modifierLike()

      if (points > viewCount * 5) {
        return viewCount * 5
      } else {
        return points
      }
    }

    return {
      score: Math.floor(viewCount * modifierView() + likePoints()),
      modifierLike: modifierLike(),
      modifierView: modifierView(),
    }
  }

  chartMaker(thisWeek, lastWeek) {
    const array = []

    for (let i = 0; i < thisWeek.length; i++) {
      const element = thisWeek[i]

      const lastWeekObj = lastWeek.find((value) => value.id === element.id)

      if (lastWeekObj) {
        const thisWeekView = element.viewCount - lastWeekObj.viewCount
        const thisWeekLike = element.likeCount - lastWeekObj.likeCount
        const thisWeekComment = element.commentCount - lastWeekObj.commentCount

        const { score, modifierLike, modifierView } = this.scoreMultiplier({
          likeCount: thisWeekLike ?? 0,
          viewCount: thisWeekView,
          commentCount: thisWeekComment,
          publishedAt: element.publishedAt,
        })

        const obj = {
          id: element.id,
          isNew: false,
          channelName: element.channelName,
          publishedAt: element?.publishedAt,
          channelId: element?.channelId,
          videoTitle: element?.videoTitle,
          thumbnail: element?.thumbnail,
          viewCount: thisWeekView,
          likeCount: thisWeekLike ?? 0,
          commentCount: thisWeekComment ?? 0,
          score,
          modifierLike,
          modifierView,
        }

        array.push(obj)
      } else {
        const limit = moment(new Date()).subtract(1, "weeks").startOf("week")
        const uploadDate = moment(element?.publishedAt)

        const { score, modifierLike, modifierView } = this.scoreMultiplier(element)

        const obj = {
          ...element,
          isNew: limit.isBefore(uploadDate),
          score,
          modifierLike,
          modifierView,
        }

        array.push(obj)
      }
    }

    return array
  }

  convertToCSV(objArray) {
    const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray
    let str: string

    for (let i = 0; i < array.length; i++) {
      let line = ""
      for (const index in array[i]) {
        if (line != "") line += ","

        line += array[i][index]
      }

      str += line + "\r\n"
    }

    return str
  }

  exportCSVFile(items, fileTitle) {
    // if (headers) {
    //   items.unshift(headers)
    // }

    // Convert Object to JSON
    const jsonObject = JSON.stringify(items)

    const csv = this.convertToCSV(jsonObject)

    const exportedFilenmae = fileTitle + ".csv" || "export.csv"

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae)
    } else {
      const link = document.createElement("a")
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", exportedFilenmae)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
}
