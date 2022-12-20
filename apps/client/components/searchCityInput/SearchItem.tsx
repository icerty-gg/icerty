interface Props {
  readonly name: string
}

export const SearchItem = ({ name }: Props) => {
  return (
    <button className='p-2 hover:bg-gray-800'>
      <li>{name}</li>
    </button>
  )
}
