'use client'

import { useEffect, useState } from 'react'

export const useCheckScroll = (scrollHeight: number) => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const active = () => {
      if (window.scrollY > scrollHeight) {
        setValue(true)
      } else {
        setValue(false)
      }
    }

    window.addEventListener('scroll', active)

    return () => window.removeEventListener('scroll', active)
  }, [scrollHeight])

  return value
}
