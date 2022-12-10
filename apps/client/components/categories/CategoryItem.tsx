import Image from 'next/image'

interface Props {
  readonly image: string
  readonly name: string
}

export const CategoryItem = ({ image, name }: Props) => {
  console.log(image)

  return (
    <li>
      <Image width={200} height={200} src={image} alt='category' />

      <h3>{name}</h3>
    </li>
  )
}
