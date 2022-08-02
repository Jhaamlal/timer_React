import Head from "next/head"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import styles from "../styles/Home.module.css"

let timeInterval //Timout sustain outside even after re-render

export default function Home() {
  const timerRef = useRef(180) //initiated the useRef to sustain after re-render also
  const [minute, setMinute] = useState(3) //Default
  const [second, setSecond] = useState(0)

  timerRef.current = parseInt(minute) * 60 + parseInt(second) //Change into number

  let startTimer = () => {
    // Every second it is going to reduce the time
    timerRef.current = timerRef.current - 1
    if (timerRef.current == 0) {
      setMinute(0)
      setSecond(0)
      clearInterval(timeInterval)
      return
    }
    setSecond((prev) => timerRef.current % 60)
    setMinute((prev) => parseInt(timerRef.current / 60))
  }

  let startInterval = () => {
    // Cleartime out to stop memory leak
    clearInterval(timeInterval)
    timeInterval = setInterval(() => {
      startTimer()
    }, 1000)
  }

  let paused = () => {
    // Puased by clearing time out
    console.log("Paused ckicked")
    clearInterval(timeInterval)
  }
  let reset = () => {
    setSecond(0)
    setMinute(3)
    timerRef.current = 180
    clearInterval(timeInterval)
  }

  return (
    <>
      <div className="">
        <div className="tw-flex tw-border-2">
          <div className="tw-my-1 tw-p-2">{minute}</div>
          <div className="tw-my-1 tw-p-2">{second}</div>
        </div>
        <br />

        <div className="tw-flex">
          <button
            className="tw-bg-green-400 tw-p-1 tw-mx-2"
            onClick={startInterval}
          >
            start
          </button>
          <button
            className="tw-bg-green-400 tw-p-1 tw-mx-2"
            onClick={startInterval}
          >
            continue
          </button>
          <button className="tw-bg-green-400 tw-p-1 tw-mx-2" onClick={paused}>
            Paused
          </button>
          <button className="tw-bg-green-400 tw-p-1 tw-mx-2" onClick={reset}>
            Reset
          </button>
        </div>

        <div className="tw-flex tw-mt-2 tw-border-2">
          <input
            type="text"
            onChange={(e) => setMinute(e.target.value)}
            placeholder="Minute "
            className="tw-border-2 tw-border-red-400"
          />
          <input
            type="text"
            onChange={(e) => setSecond(e.target.value)}
            placeholder="seconds"
            className="tw-border-2 tw-border-green-400"
          />
        </div>
      </div>
    </>
  )
}
