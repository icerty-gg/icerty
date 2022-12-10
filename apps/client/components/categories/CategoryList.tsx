// 'use client'

import Image from 'next/image'
// import { useState, useEffect } from 'react'

// import { CATEGORIES } from '../../constants/categories'

// import { CategoryItem } from './CategoryItem'

export const CategoryList = () => {
  // const [categories, setCategories] = useState([])

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const res = await fetch('localhost:3001/api/categories').then(data => {})
  //   }
  // })

  return (
    <ul>
      {/* {CATEGORIES.map(c => (
        <CategoryItem image={c.image} name={c.name} key={c.id} />
      ))} */}
      <Image
        src='https://categories.olxcdn.com/assets/categories/olxpl/praca-4-2x.png'
        alt='xd'
        width={200}
        height={200}
      />
    </ul>
  )
}
