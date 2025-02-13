"use client"
import * as React from "react"

export function useHour() {
  const [date, setDate] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return date
}