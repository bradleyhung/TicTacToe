import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen gap-8 bg-purple-500'> 
      <Link className='border border-slate-950 p-4 rounded-2xl bg-purple-600 w-48 text-center' href='/create'>Create New Game</Link>
      <Link className='border border-slate-950 p-4 rounded-2xl bg-purple-600 w-48 text-center' href='/lobby'>Join Lobby</Link>
    </main>
  );
}
