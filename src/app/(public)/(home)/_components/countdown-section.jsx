"use client"

import { ProseInnerHtmlContainer } from "@/components/prose-container"
import quoteImage from "@/assets/images/misc/quote.svg"
import { Image } from "@/components/image"
import { useTimer } from "react-timer-hook"
import { convertMySqlDateToJSDate } from "@/lib/utils"
import React, { Suspense, useCallback, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import DateBg from "./_images/datebox.png"
import dynamic from "next/dynamic"

const Sparkles = dynamic(
  () => import("@/components/fancy/sparkle").then((_) => _.Sparkles),
  { ssr: false }
)

const AnimatedNumber = React.lazy(() =>
  import("@/components/fancy/animated-number").then((module) => ({
    default: module.AnimatedNumber,
  }))
)

export function CountDownSection({ data }) {
  function formatDate(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]

    const dayOfWeek = days[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th" // 11th, 12th, 13th
      switch (day % 10) {
        case 1:
          return "st"
        case 2:
          return "nd"
        case 3:
          return "rd"
        default:
          return "th"
      }
    }

    return `${dayOfWeek}, ${dayOfMonth}${daySuffix(
      dayOfMonth
    )} ${month} ${year}`
  }

  const date = convertMySqlDateToJSDate(data.date)

  return (
    <div className="space-y-6 text-center">
      <div className="text-4xl md:text-5xl font-semibold">{data.title}</div>

      <ProseInnerHtmlContainer className="font-medium text-center"  html={data.subtitle} />

      <div className="relative z-0 mx-auto w-64 text-amber-50">
        <Image
          loadingAnimation={false}
          className="w-64 mx-auto h-auto"
          src={DateBg}
        />
        <div className="absolute z-10 text-center inset-6 font-extrabold">
          {formatDate(date)}
        </div>

        <Sparkles
          colors={{
            first: "#fbbf24",
            second: "#f59e0b",
          }}
          sparklesCount={6}
        />
      </div>

      <Counter date={date} />

      <div className="relative">
        <ProseInnerHtmlContainer className="pt-8 text-center" html={data.text} />

        <Image
          height={56}
          width={56}
          src={quoteImage}
          className="absolute left-0 -top-2"
        />

        <Image
          height={56}
          width={56}
          src={quoteImage}
          className="absolute right-0 bottom-0 transform rotate-180"
        />
      </div>
    </div>
  )
}

function Counter({ date }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: date,
    autoStart: true,
  })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const formatNumber = useCallback((num) => String(num).padStart(2, "0"), [])
  return mounted ? (
    <Suspense
      fallback={
        <Skeleton
          className={"h-24 max-w-sm mx-auto w-full bg-surface flex-grow"}
        />
      }
    >
      <div className="flex items-start justify-center gap-5 sm:gap-8 text-center text-sm font-bold text-amber-500 relative max-w-max mx-auto">
        <span>
          <div className="text-4xl md:text-5xl">
            {<AnimatedNumber value={days} format={formatNumber} />}
          </div>
          <div>Days</div>
        </span>

        <span>
          <div className="text-4xl md:text-5xl">
            {<AnimatedNumber value={hours} format={formatNumber} />}
          </div>
          <div>Hours</div>
        </span>

        <span>
          <div className="text-4xl md:text-5xl">
            {<AnimatedNumber value={minutes} format={formatNumber} />}
          </div>
          <div>Minutes</div>
        </span>

        <span>
          <div className="text-4xl md:text-5xl">
            {<AnimatedNumber value={seconds} format={formatNumber} />}
          </div>
          <div>Seconds</div>
        </span>
      </div>
    </Suspense>
  ) : (
    <Skeleton className={"h-24 max-w-sm mx-auto w-full"} />
  )
}
