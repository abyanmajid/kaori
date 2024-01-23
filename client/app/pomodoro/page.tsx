"use client"

import React, { useEffect, useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import AudioPlayer from "react-h5-audio-player"
import useSound from "use-sound"

import { hmsToSeconds, secondsToHMS } from "@/lib/convert"
import delay from "@/lib/delay"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"

import "react-h5-audio-player/lib/styles.css"

export default function PomodoroPage() {
  const [music, setMusic] = useState("lofi.mp3")

  const [workDuration, setWorkDuration] = useState("1 min")
  const [shortBreakDuration, setShortBreakDuration] = useState("1 min")
  const [longBreakDuration, setLongBreakDuration] = useState("1 min")
  const [untouchedPage, setUntouchedPage] = useState(true)

  const [workSessionsCounter, setWorkSessionsCounter] = useState(1)
  const [pomodoroSession, setPomodoroSession] = useState("Session 1")
  const [pomodoroDuration, setPomodoroDuration] = useState(
    hmsToSeconds(workDuration)
  )

  const [timerRunning, setTimerRunning] = useState(false)
  const [remainingTime, setRemainingTime] = useState(pomodoroDuration)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load sounds
  const [cueChangeSession] = useSound("/sounds/change-session.mp3")
  const [cueStartPomodoro] = useSound("/sounds/tts/start-pomodoro.mp3")
  const [cueS1Short] = useSound("/sounds/tts/s1-short.mp3")
  const [cueShortS2] = useSound("/sounds/tts/short-s2.mp3")
  const [cueS2Short] = useSound("/sounds/tts/s2-short.mp3")
  const [cueShortS3] = useSound("/sounds/tts/short-s3.mp3")
  const [cueS3Short] = useSound("/sounds/tts/s3-short.mp3")
  const [cueShortS4] = useSound("/sounds/tts/short-s4.mp3")
  const [cueS4Long] = useSound("/sounds/tts/s4-long.mp3")
  const [cueLongS1] = useSound("/sounds/tts/long-s1.mp3")

  function changeTimerPreferenceHandler(
    newValue: string,
    forSession: string,
    setTimerPreference: Function
  ) {
    const newDurationInSeconds = hmsToSeconds(newValue)
    setTimerPreference(newValue)
    if (
      forSession === pomodoroSession.slice(0, 7) ||
      forSession === pomodoroSession
    ) {
      setPomodoroDuration(newDurationInSeconds)
      setRemainingTime(newDurationInSeconds)
    }
  }

  useEffect(() => {
    if (remainingTime <= 0) {
      nextSessionHandler2()
    }
  }, [remainingTime])

  function nextSessionHandler2() {
    let nextSession
    let newDurationInSeconds
    console.log(pomodoroSession, workSessionsCounter)
    if (pomodoroSession === "Short Break" && workSessionsCounter < 4) {
      nextSession = `Session ${workSessionsCounter + 1}`
      newDurationInSeconds = hmsToSeconds(workDuration)
      setWorkSessionsCounter((c) => c + 1) // Increment counter
      switch (workSessionsCounter) {
        case 1:
          cueShortS2()
          break
        case 2:
          cueShortS3()
          break
        default:
          cueShortS4()
          break
      }
    } else {
      switch (pomodoroSession) {
        case "Session 4":
          cueS4Long()
          nextSession = "Long Break"
          newDurationInSeconds = hmsToSeconds(longBreakDuration)
          setWorkSessionsCounter(1) // Reset for next cycle
          break
        case "Long Break":
          cueLongS1()
          nextSession = "Session 1"
          newDurationInSeconds = hmsToSeconds(workDuration)
          break
        case "Short Break":
          nextSession = "Session 1"
          newDurationInSeconds = hmsToSeconds(workDuration)
          setWorkSessionsCounter(1)
          break
        default: // Work session
          switch (workSessionsCounter) {
            case 1:
              cueS1Short()
              break
            case 2:
              cueS2Short()
              break
            default:
              cueS3Short()
              break
          }
          nextSession = "Short Break"
          newDurationInSeconds = hmsToSeconds(shortBreakDuration)
          break
      }
    }

    setPomodoroSession(nextSession)
    setPomodoroDuration(newDurationInSeconds)
    setRemainingTime(newDurationInSeconds)
  }

  async function startTimerHandler() {
    setTimerRunning(true)
    if (untouchedPage) {
      cueChangeSession()
      await delay(1500)
      cueStartPomodoro()
      setUntouchedPage(false)
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          // @ts-ignore
          clearInterval(timerRef.current)
          timerRef.current = null
          nextSessionHandler2()
          return 0
        } else {
          return prevTime - 1
        }
      })
    }, 1000) // Update every second
  }

  function pauseTimerHandler() {
    setTimerRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current) // Clear the interval, pausing the timer
      timerRef.current = null // Reset the timer reference
    }
    setPomodoroDuration(remainingTime)
  }

  function resetTimerHandler() {
    switch (pomodoroSession) {
      case "Short Break":
        setRemainingTime(hmsToSeconds(shortBreakDuration))
        break
      case "Long Break":
        setRemainingTime(hmsToSeconds(longBreakDuration))
        break
      default:
        setRemainingTime(hmsToSeconds(workDuration))
        break
    }
  }

  let timerProgress = 0
  if (timerRunning) {
    switch (pomodoroSession) {
      case "Short Break":
        timerProgress =
          (1 - remainingTime / hmsToSeconds(shortBreakDuration)) * 100
        break
      case "Long Break":
        timerProgress =
          (1 - remainingTime / hmsToSeconds(longBreakDuration)) * 100
        break
      default:
        timerProgress = (1 - remainingTime / hmsToSeconds(workDuration)) * 100
        break
    }
  }

  return (
    <section className="grid lg:grid-cols-2 gap-8 container pb-8 pt-6 md:py-10">
      <div className="border-gray-700  bg-gray-950 bg-opacity-35 border rounded-lg p-8 justify-center grid text-center">
        <h1 className="text-white text-2xl font-extrabold mb-2">
          <span
            className={`${
              pomodoroSession.startsWith("Session") ? "bg-primary" : ""
            } ${pomodoroSession === "Short Break" ? "bg-green-400" : ""} ${
              pomodoroSession === "Long Break" ? "bg-purple-400" : ""
            } px-2 py-0.5 rounded-lg bg-opacity-50`}
          >
            {pomodoroSession}
          </span>
        </h1>

        <h1 className="text-white text-8xl font-extrabold my-4">
          {secondsToHMS(remainingTime)}
        </h1>
        <Progress value={timerProgress} className="my-2 mb-4" />
        <div className="grid grid-cols-3 mb-8">
          <div className="grid justify-start">
            <Button disabled variant="secondary">
              <ChevronLeftIcon /> Previous
            </Button>
          </div>
          <div className="grid justify-center">
            <Button disabled variant="destructive">
              Reset Session
            </Button>
          </div>
          <div className="grid justify-end">
            <Button disabled variant="secondary">
              Next <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground max-w-[700px] text-base mb-2">
          The options to skip, rewind, or reset the timer have been disabled to
          enforce the intended structured workflow of the Pomodoro technique.{" "}
        </p>
        <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>

        <div className="grid">
          <div className="grid justify-center">
            {timerRunning ? (
              <Button
                variant="secondary"
                className="text-3xl px-56 py-16"
                onClick={() => pauseTimerHandler()}
              >
                Pause
              </Button>
            ) : (
              <Button
                className="text-3xl px-56 py-16"
                onClick={() => startTimerHandler()}
              >
                Start
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="border-gray-700  bg-gray-950 bg-opacity-35 border rounded-lg p-8">
        <h1 className="text-white text-3xl font-extrabold">Settings</h1>
        <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>
        <h2 className="text-white text-xl font-extrabold mb-2">
          Duration preferences
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-base py-8"
                disabled={timerRunning}
              >
                <span className="font-extrabold">Work:</span>&nbsp;
                {workDuration}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Set Duration</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={workDuration}
                onValueChange={(newValue) =>
                  changeTimerPreferenceHandler(
                    newValue,
                    "Session",
                    setWorkDuration
                  )
                }
              >
                <DropdownMenuRadioItem value="10 min">
                  10 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="25 min">
                  25 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="40 min">
                  40 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="55 min">
                  55 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1 hour 20 min">
                  1 hour 20 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1 hour 45 min">
                  1 hour 45 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2 hours">
                  2 hours
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2 hours 15 min">
                  2 hours 15 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2 hours 30 min">
                  2 hours 30 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2 hours 45 min">
                  2 hours 45 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2 hours 60 min">
                  2 hours 60 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3 hours">
                  3 hours
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-base py-8"
                disabled={timerRunning}
              >
                <span className="font-extrabold">Short Break:</span>&nbsp;
                {shortBreakDuration}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Set Duration</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={shortBreakDuration}
                onValueChange={(newValue) =>
                  changeTimerPreferenceHandler(
                    newValue,
                    "Short Break",
                    setShortBreakDuration
                  )
                }
              >
                <DropdownMenuRadioItem value="5 min">
                  5 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10 min">
                  10 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="15 min">
                  15 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="20 min">
                  20 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="25 min">
                  25 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="30 min">
                  30 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="35 min">
                  35 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="40 min">
                  40 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="45 min">
                  45 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="55 min">
                  55 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1 hour">
                  1 hour
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-base py-8"
                disabled={timerRunning}
              >
                <span className="font-extrabold">Long Break:</span>&nbsp;
                {longBreakDuration}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Set Duration</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={longBreakDuration}
                onValueChange={(newValue) =>
                  changeTimerPreferenceHandler(
                    newValue,
                    "Long Break",
                    setLongBreakDuration
                  )
                }
              >
                <DropdownMenuRadioItem value="5 min">
                  5 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10 min">
                  10 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="15 min">
                  15 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="20 min">
                  20 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="25 min">
                  25 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="30 min">
                  30 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="35 min">
                  35 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="40 min">
                  40 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="45 min">
                  45 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="55 min">
                  55 min
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1 hour">
                  1 hour
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h2 className="text-white text-xl font-extrabold mb-2">Music </h2>
        <p className="text-muted-foreground max-w-[700px] text-base mb-2">
          By default, the music player is set to loop and has a volume of 0.05
          (in order to prevent it from distracting you).
        </p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button
            variant={music === "lofi.mp3" ? "secondary" : "outline"}
            className="w-full py-8"
            onClick={() => setMusic("lofi.mp3")}
          >
            Lofi
          </Button>
          <Button
            variant={music === "piano.mp3" ? "secondary" : "outline"}
            className="w-full py-8"
            onClick={() => setMusic("piano.mp3")}
          >
            Piano
          </Button>
          <Button
            variant={music === "classical.mp3" ? "secondary" : "outline"}
            className="w-full py-8"
            onClick={() => setMusic("classical.mp3")}
          >
            Classical
          </Button>
        </div>
        <AudioPlayer
          autoPlay={false}
          className="rounded-3xl"
          loop
          volume={0.05}
          src={`/sounds/music/${music}`}
          // other props here
        />
      </div>
    </section>
  )
}
