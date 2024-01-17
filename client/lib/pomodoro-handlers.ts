"use client"

import { hmsToSeconds } from "./convert"

export function nextSessionHandler(
  pomodoroSession: string,
  setPomodoroSession: Function,
  workSessionsCounter: number,
  setWorkSessionsCounter: Function,
  shortBreakDuration: string,
  workDuration: string,
  longBreakDuration: string,
  setPomodoroDuration: Function,
  setTimerRunning: Function,
  setRemainingTime: Function
) {
  console.log(pomodoroSession, workSessionsCounter)
  switch (pomodoroSession) {
    case "Session 4":
      setPomodoroSession("Long Break")
      setPomodoroDuration(hmsToSeconds(longBreakDuration))
      setRemainingTime(hmsToSeconds(longBreakDuration))
      setWorkSessionsCounter(1) // Reset for the next cycle
      break
    case "Long Break":
      setPomodoroSession("Session 1")
      setPomodoroDuration(hmsToSeconds(workDuration))
      setRemainingTime(hmsToSeconds(workDuration))
      break
    case "Short Break":
      const nextSession = `Session ${workSessionsCounter}`
      setPomodoroSession(nextSession)
      setPomodoroDuration(hmsToSeconds(workDuration))
      setRemainingTime(hmsToSeconds(workDuration))
      if (workSessionsCounter < 4) {
        setWorkSessionsCounter(workSessionsCounter + 1)
      }
      break
    default:
      setPomodoroSession("Short Break")
      setPomodoroDuration(hmsToSeconds(shortBreakDuration))
      setRemainingTime(hmsToSeconds(shortBreakDuration))
      console.log("I got here")
      break
  }
  setTimerRunning(false)
}

export function previousSessionHandler(
  pomodoroSession: string,
  setPomodoroSession: Function,
  workSessionsCounter: number,
  setWorkSessionsCounter: Function,
  shortBreakDuration: string,
  workDuration: string,
  longBreakDuration: string,
  setPomodoroDuration: Function,
  setTimerRunning: Function,
  setRemainingTime: Function
) {
  switch (pomodoroSession) {
    case "Session 1":
      setPomodoroSession("Long Break")
      setPomodoroDuration(hmsToSeconds(longBreakDuration))
      setRemainingTime(hmsToSeconds(longBreakDuration))
      setWorkSessionsCounter(4)
      break
    case "Session 2":
    case "Session 3":
    case "Session 4":
      setPomodoroSession("Short Break")
      setPomodoroDuration(hmsToSeconds(shortBreakDuration))
      setRemainingTime(hmsToSeconds(shortBreakDuration))
      break
    case "Short Break":
      if (workSessionsCounter > 1) {
        const previousSessionNumber = workSessionsCounter - 1
        setPomodoroSession(`Session ${previousSessionNumber}`)
        setPomodoroDuration(hmsToSeconds(workDuration))
        setRemainingTime(hmsToSeconds(workDuration))
        setWorkSessionsCounter(previousSessionNumber)
      } else {
        setPomodoroSession("Session 1")
        setPomodoroDuration(hmsToSeconds(workDuration))
        setRemainingTime(hmsToSeconds(workDuration))
      }
      break
    case "Long Break":
      setPomodoroSession("Session 4")
      setPomodoroDuration(hmsToSeconds(workDuration))
      setRemainingTime(hmsToSeconds(workDuration))
      setWorkSessionsCounter(4)
      break
    default:
      setPomodoroSession("Short Break")
      setPomodoroDuration(hmsToSeconds(shortBreakDuration))
      setRemainingTime(hmsToSeconds(shortBreakDuration))
      setWorkSessionsCounter(1)
      break
  }
  setTimerRunning(false)
}
