export const PriceInput = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center relative'>
        <input
          type='text'
          className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
        />
        <span className='text-white absolute left-[1.2rem]'>zł</span>
      </div>

      <p className='text-white'>-</p>
      <div className='flex items-center relative'>
        <input
          type='text'
          className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
        />
        <span className='text-white absolute left-[1.2rem]'>zł</span>
      </div>
    </div>
  )
}
