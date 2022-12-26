interface Props {
  readonly name: string
  readonly onAddCity: (city: string) => void
}

export const SearchItem = ({ name, onAddCity }: Props) => {
  return (
    <li className='hover:bg-gray-700 text-center cursor-pointer'>
      <button type='button' className='w-full h-full p-4' onClick={() => onAddCity(name)}>
        {name}
      </button>
    </li>
  )
}
