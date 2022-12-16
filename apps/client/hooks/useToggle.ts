'use client'

import { useState } from 'react'

export const useToggle = () => {
  const [toggle, setToggle] = useState(false)

  const toggleHandler = () => setToggle(!toggle)

  return [toggle, toggleHandler] as const
}
