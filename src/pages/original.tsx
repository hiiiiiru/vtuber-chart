import { useEffect, useState } from "react"
import Head from "next/head"
import { VideoDetail } from "../lib/types"
import ChartHelper from "../lib/helper"
import { May02AllSong } from "../../database/raw/may_1"
import { Apr24AllSongs } from "../../database/raw/apr_24"
import { Container } from "react-bootstrap"
import { May02Chart } from "../../database/chart/may2_chart"
import { ChartComponent } from "../lib/ui_helper"

const acvypImage =
  "https://lh3.googleusercontent.com/p6JT0Bz1YiAgrqey6vYKYFOSQV_w0BFW_3nCNF1INnl2k7KvGCTQrZwRY_Ttjakm7K4XwgZt_5kcl9s8fV1YYSSVys4SgQP953FkDcwki-HnncE9PA9optYm27ZYbKAId-h5aRrSgHOlXfb7BiKPnRQhrOBfXOzOUjaUbeo-EZp48V4pAWHnwcLsMiqmKsGRWxfgTok9Ydd9EXf8oYysY2ehX4NYEg9TVvC1X--GVCEMG9Cnku5GbXSJ9YQ4G8LyCg3g3fml7K6P3477Od_O-flSJ54ZiSt5gxeOt5JbcXyg9--YwrAzbkjAQjg8c1BlstzmMM15Ystuj9nuhl3bzkOfpCJS2XApZH544cB7RrTk1JIy9X3WH7K_Ks2ZyG6bIcyKI27jUAPZK2rffr9WuNcPQ6lPRWGEz4RS8UXmYkYbXuzBTWJ_LkcTOfKYXFI3gtGPUA-lQ9E1GCgnXOaY2c6oVeQnHYjJWSI5M9gOBNBASYZ4NaLZBH83n1kH5nhDSJLXQggLaLDYo1nBR3jr485OPzFle7BMtEG6TlofE9uT3WAO-EVLOCMSRqkQq_5De9d29KspNorbecu78nDMStbpP28DbKo0nwf9--Mf3XDZEymRI0BoV9A1xNA9lx5tAbmMQ_3tZjqe5JG8LghG8-dD24ppbu6F0WpHTjfmWmouwMLA7-bpHDCG1eA4=s613-no?authuser=0"

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function Index(props) {
  const [videos, setVideos] = useState<VideoDetail[]>([])

  const helper = new ChartHelper()

  useEffect(() => {
    const getData = async () => {
      try {
        // const res = await fetch("/api/original")
        // if (res.ok) {
        //   const data = await res.json()
        //   setVideos(data)
        // }
        // const newArray = await helper.chartMaker(May02AllSong, Apr24AllSongs)
        // setVideos(newArray)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  return (
    <>
      <Head>
        <title>Original Song</title>
      </Head>
      <div className="youtube-page_container">
        {/*<Container className="chart-header">*/}
        {/*  <img src={acvypImage} alt="" />*/}
        {/*  <div className="title">*/}
        {/*    <h1>Vtuber/Vsinger Music Chart</h1>*/}
        {/*    <h2>Original Song Edition</h2>*/}
        {/*    <h6>Per May 02, 2021</h6>*/}
        {/*  </div>*/}
        {/*  <div className="week-column">*/}
        {/*    <div className="week">*/}
        {/*      <div className="label">Week</div>*/}
        {/*      <div className="week-int">1</div>*/}
        {/*    </div>*/}
        {/*    <div className="month">MAY 2021</div>*/}
        {/*  </div>*/}
        {/*</Container>*/}

        {/*<Container className="chart-container">*/}
        {/*  {May02Chart.slice(10, 20).map((value, index) => (*/}
        {/*    <ChartComponent video={value} index={index} indexAdd={11} key={index} />*/}
        {/*  ))}*/}
        {/*</Container>*/}

        <pre>
          <pre>{JSON.stringify(videos, null, 2)}</pre>
        </pre>
      </div>
    </>
  )
}

export default Index
