interface Props {
  readonly name: string
  readonly onAddCity: (city: string) => void
}

export const SearchItem = ({ name, onAddCity }: Props) => {
  return (
    <button className='p-2 hover:bg-gray-800' onClick={() => onAddCity(name)}>
      {name}
    </button>
  )
}
