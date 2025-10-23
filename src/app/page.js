import Link from 'next/link'

import Search from '@/components/search/search';

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col pb-16 bg-[url('/assets/erasmus-bg-2.png')]">
      <div className="p-4 flex bg-green-950 text-white align-center items-center">
        <img src="/assets/erasmus-logo.png" className="w-16 h-16" />
        <div>
          <p className="text-3xl ml-4 cardo-bold">Erasmiana</p>
          <p className="text-lg ml-4 cardo-regular-italic">The letters of Erasmus of Rotterdam</p>
        </div>
        <div className="flex flex-1 justify-end cardo-regular">
          <Link prefetch={false} href="/search" className="ml-4">Search</Link>
          <Link prefetch={false} href="/about" className="ml-4">About</Link>
        </div>
      </div>
      <div className="p-8 mt-4 m-auto w-3/4 flex flex-col flex-1">
        <Search />
      </div>
    </div>
  );
}
