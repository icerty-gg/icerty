'use client'

import { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const activeButton = () => {
      if (window.scrollY > 800) setIsVisible(true)
      else setIsVisible(false)
    }

    window.addEventListener('scroll', activeButton)

    return () => window.removeEventListener('scroll', activeButton)
  }, [])

  const scrollToTopHandler = () => {
    document.documentElement.scrollTop = 0
  }

  return (
    <button
      className={`fixed bottom-12 right-4 transition-transform ${
        isVisible ? 'translate-x-[0]' : 'translate-x-[150%]'
      } flex gap-2 items-center text-white bg-sky-500/10 hover:bg-sky-400/20 py-2 px-4 rounded-full border border-slate-300/10`}
      onClick={scrollToTopHandler}
    >
      <BiArrowBack className='rotate-90' />
      <p>Top</p>
    </button>
  )
}
