import { useEffect, useState } from 'react'

export const useCheckScroll = (scrollHeight: number) => {
  const [active, setIsActive] = useState(false)

  useEffect(() => {
    const active = () => {
      if (window.scrollY > scrollHeight) {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }

    window.addEventListener('scroll', active)

    return () => window.removeEventListener('scroll', active)
  }, [scrollHeight])

  return active
}
