interface Props {
  readonly name: string
  readonly onAddCity: (city: string) => void
}

export const SearchItem = ({ name, onAddCity }: Props) => {
  return (
    <li className='p-4 hover:bg-gray-700 text-center cursor-pointer' onClick={() => onAddCity(name)}>
      {name}
    </li>
  )
}
