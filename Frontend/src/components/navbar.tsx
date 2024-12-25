export default function navbar() {
  return (
    <div className = 'flex flex-row w-full justify-end p-10 gap-10 bg-blue-300'>
        <button className='text-purple-200 font-extrabold text-xl'>Create User</button>
        <button className='text-purple-200 font-extrabold text-xl mr-8'>Sign in</button>
    </div>
  )
}