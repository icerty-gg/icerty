import { BiErrorCircle } from 'react-icons/bi'

export const ErrorMessage = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <p className='text-red-700 flex items-center gap-2 text-sm' role='alert'>
      <BiErrorCircle className='text-lg' /> {children}
    </p>
  )
}
