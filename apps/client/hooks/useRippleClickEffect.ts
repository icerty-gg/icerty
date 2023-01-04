'use client'

import { useState, useEffect } from 'react'

import type { MouseEvent } from 'react'

export const useRippleClickEffect = () => {
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRipple, setIsRipple] = useState(false)

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRipple(true)

      setTimeout(() => setIsRipple(false), 1500)
    } else setIsRipple(false)
  }, [coords.x, coords.y])

  useEffect(() => {
    if (!isRipple) setCoords({ x: -1, y: -1 })
  }, [isRipple])

  const createRippleHandler = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return {
    coords: coords,
    isRipple: isRipple,
    createRippleHandler
  }
}
