'use client'
import { useState } from 'react';
import Link from 'next/link'

export default function BottomNav() {

  const [ openMenu, setOpenMenu ] = useState(false)

  return (
    <div className="fixed bottom-0 w-full h-[120px] bg-cover bg-top bg-center bg-[url('/assets/edge-3.png')] p-8">
      <div className="m-auto mt-6 text-3xl text-center flex items-center justify-center gap-4 im-fell-dw-pica-regular-italic ">
        <Link className="hidden lg:block ml-auto" href="/debate">
          <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Debate</div>
        </Link>
        <Link className="hidden lg:block ml-auto" href="/learn">
          <div className="ml-auto text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Learn</div>
        </Link>
        <Link className="hidden lg:block ml-auto" href="/data">
          <div className="ml-auto text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Data</div>
        </Link>
        <Link className="hidden lg:block m-auto w-[50px]" href="/preface">
          <img src="/assets/letter-e-black.png" />
        </Link>
        <Link className="hidden lg:block mr-auto" href="/search">
          <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Search</div>
        </Link>
        <Link className="hidden lg:block mr-auto" href="/works">
          <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Works</div>
        </Link>
        <Link className="hidden lg:block mr-auto" href="/letters">
          <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Letters</div>
        </Link>

        <div className="lg:hidden flex items-center im-fell-dw-pica-regular relative">
          <div onClick={() => setOpenMenu(!openMenu)} className="mr-8 p-2 rounded-lg bg-black/80 text-center cursor-pointer hover:opacity-80">
            <svg className="m-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 17C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17H20Z" fill="#FFF"/>
              <path d="M20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20Z" fill="#FFF"/>
              <path d="M20 5C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5H20Z" fill="#FFF"/>
            </svg>
          </div>
          {openMenu ? 
            <div onClick={() => setOpenMenu(false)} className="absolute bottom-0 mb-14 -ml-10 bg-[#d2c9b8] p-4 rounded-md shadow-lg border border-[#3b2d2b]">
              <Link className="ml-auto" href="/debate">
                <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Debate</div>
              </Link>
              <Link className="ml-auto" href="/learn">
                <div className="ml-auto text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Learn</div>
              </Link>
              <Link className="ml-auto" href="/data">
                <div className="ml-auto text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Data</div>
              </Link>
              <Link className="mr-auto" href="/search">
                <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Search</div>
              </Link>
              <Link className="mr-auto" href="/works">
                <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Works</div>
              </Link>
              <Link className="mr-auto" href="/letters">
                <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Letters</div>
              </Link>
            </div>
          : false}
          <div>
            <Link className="flex items-center" href="/preface">
              <div className="w-[50px]">
                <img src="/assets/letter-e-black.png" />
              </div>
              <div className="text-4xl text-black mt-2">
                <span className="hidden">E</span>rasmiana
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}