"use client"

import NProgress from "nprogress"
import * as React from "react"


import { usePathname, useParams, useRouter } from "next/navigation"

export const TopLoader = ({
  color: propColor,
  height: propHeight,
  showSpinner,
  crawl,
  crawlSpeed,
  initialPosition,
  easing,
  speed,
  shadow,
}) => {
  const pathname = usePathname()
  const params = useParams()
  const defaultColor = "rgba(var(--on-background))"
  const defaultHeight = 4

  const router = useRouter()
  const { push, replace, back, forward } = router

  router.push = (href, options) => {
    if (!NProgress.isStarted()) {
      NProgress.start()
    }
    push(href, options)
  }

  router.back = () => {
    if (!NProgress.isStarted()) {
      NProgress.start()
    }
    back()
  }

  router.forward = () => {
    if (!NProgress.isStarted()) {
      NProgress.start()
    }
    forward()
  }

  router.replace = (href, options) => {
    if (!NProgress.isStarted()) {
      NProgress.start()
    }
    replace(href, options)
  }

  const color = propColor || defaultColor
  const height = propHeight || defaultHeight

  const boxShadow =
    !shadow && shadow !== undefined
      ? ""
      : shadow
        ? `box-shadow:${shadow}`
        : `box-shadow:0 0 10px ${color},0 0 5px ${color}`

  const styles = (
    <style>
      {`#nprogress{pointer-events:none}#nprogress .bar{background:${color};position:fixed;z-index:1031;top:0;left:0;width:100%;height:${height}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${boxShadow};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${color};border-left-color:${color};border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}
    </style>
  )

  React.useEffect(() => {
    NProgress.configure({
      showSpinner: showSpinner ?? true,
      trickle: crawl ?? true,
      trickleSpeed: crawlSpeed ?? 200,
      minimum: initialPosition ?? 0.08,
      easing: easing ?? "ease",
      speed: speed ?? 200,
    })

    function isAnchorOfCurrentUrl(currentUrl, newUrl) {
      const currentUrlObj = new URL(currentUrl)
      const newUrlObj = new URL(newUrl)

      if (
        currentUrlObj.hostname === newUrlObj.hostname &&
        currentUrlObj.pathname === newUrlObj.pathname &&
        currentUrlObj.search === newUrlObj.search
      ) {
        const currentHash = currentUrlObj.hash
        const newHash = newUrlObj.hash

        return (
          currentHash !== newHash &&
          currentUrlObj.href.replace(currentHash, "") ===
          newUrlObj.href.replace(newHash, "")
        )
      }
      return false
    }

    const npgclass =
      document.querySelectorAll("html")

    function findClosestAnchor(element) {
      while (element && element.tagName.toLowerCase() !== "a") {
        element = element.parentElement
      }
      return element
    }

    function handleClick(event) {
      try {
        const target = event.target
        const anchor = findClosestAnchor(target)

        if (anchor) {
          const currentUrl = window.location.href
          const newUrl = (anchor).href
          const isExternalLink =
            (anchor).target === "_blank"
          const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl)

          if (
            newUrl === currentUrl ||
            isAnchor ||
            isExternalLink ||
            event.ctrlKey
          ) {
            NProgress.start()
            NProgress.done()

            npgclass.forEach((el) => {
              el.classList.remove("nprogress-busy")
            })
          } else {
            NProgress.start()
              ; (function (history) {
                const pushState = history.pushState

                history.pushState = function () {
                  NProgress.done()
                  npgclass.forEach((el) => {
                    el.classList.remove("nprogress-busy")
                  })
                  return pushState.apply(history, arguments)
                }
              })(window.history)
          }
        }
      } catch (err) {
        console.error(err)
        NProgress.start()
        NProgress.done()
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [crawl, crawlSpeed, easing, initialPosition, showSpinner, speed])

  React.useEffect(() => {
    NProgress.done()
  }, [pathname, params])

  return styles
}
