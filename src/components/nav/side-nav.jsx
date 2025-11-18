'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import Logo from '@/components/nav/logo';
import FakeWaveform from '@/components/audio/waveform'

export default function SideNav({}) {

  const pathname = usePathname()
  const router = useRouter()

  const [ openMenu, setOpenMenu ] = useState(false)
  const [ minimized, setMinimized ] = useState(pathname === "/" ? false : true);
  
  const isMobile = () => {
    let isMobile = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobile = true;
    }
    return isMobile;
  }

  useEffect(() => {
    if(pathname === "/") {
      setMinimized(false)
    } else {
      setMinimized(true)
    }
  }, [pathname])

  const animateLink = (route) => {
    if(pathname === "/" && !isMobile()) {
      setMinimized(true)
      setTimeout(() => {
        router.push(route);
      }, 600)
    } else {
      router.push(route);
    }
  }

  return (
    <div>
      <div id="scroll-container-nav" className={`${pathname !== "/" ? "hidden lg:block" : ""} fixed h-full ${minimized ? 'min-w-[170px] w-[170px]' : 'min-w-[400px] w-[400px]'} z-99 p-8 transition-all duration-500 ease-in-out bg-cover bg-no-repeat bg-right bg-[url('/assets/large-left-parchment-bg.png')] overflow-y-auto`}>
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex-1 flex flex-col justify-center gap-10">
            <div className="h-[100px]">
              <Logo minimized={minimized} />
            </div>
            <div className="mt-10 w-full text-[#3b2d2b] text-3xl im-fell-dw-pica-regular flex flex-col gap-4 items-center">
              <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
                <div onMouseDown={(e) => e.preventDefault()} onClick={() => animateLink("/debate")}>Debate</div>
              </div>
              <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
                <div onClick={() => animateLink("/search")}>Search</div>
              </div>
              <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
                <div onClick={() => animateLink("/works")}>Works</div>
              </div>
              <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
                <div onClick={() => animateLink("/letters")}>Letters</div>
              </div>
              <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
                <div onClick={() => animateLink("/data")}>Data</div>
              </div>
              <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
                <div onClick={() => animateLink("/about")}>About</div>
              </div>
            </div>
            <div className="relative">
              <img className="w-[100px] block m-auto" src="/assets/sig-black.png" />
              {!minimized ? <div className="border-t border-black w-[80px] ml-[20px] -mt-[13px]"></div> : false}
              {!minimized ? <div className="border-t border-black w-[80px] ml-[235px]"></div> : false}
            </div>
          </div>
          <FakeWaveform />
        </div>
      </div>
      <div>
        <div className={`${pathname !== "/" ? "fixed lg:hidden" : "hidden"} p-2 flex items-center bg-[#d5cdbe] border-r border-b rounded-br shadow-lg z-99`}>
          <img className="w-[50px] mr-2" src="/assets/letter-e-black.png" />
          <div onClick={() => setOpenMenu(!openMenu)} className="p-2 rounded-lg bg-black/80 text-center cursor-pointer hover:opacity-80">
            <svg className="m-auto" width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 17C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17H20Z" fill="#FFF"/>
              <path d="M20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20Z" fill="#FFF"/>
              <path d="M20 5C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5H20Z" fill="#FFF"/>
            </svg>
          </div>
        </div>
        {openMenu ? 
          <div onClick={() => setOpenMenu(false)} className="fixed top-0 left-0 m-8 mt-18 bg-[#d2c9b8] p-4 rounded-md shadow-lg border text-3xl border-[#3b2d2b] z-99">
            <Link className="ml-auto" href="/debate">
              <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Debate</div>
            </Link>
            <Link className="ml-auto mt-2" href="/learn">
              <div className="ml-auto text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Learn</div>
            </Link>
            <Link className="ml-auto mt-2" href="/data">
              <div className="ml-auto text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Data</div>
            </Link>
            <Link className="mr-auto mt-2" href="/search">
              <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Search</div>
            </Link>
            <Link className="mr-auto mt-2" href="/works">
              <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Works</div>
            </Link>
            <Link className="mr-auto mt-2" href="/letters">
              <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">Letters</div>
            </Link>
            <Link className="mr-auto mt-2" href="/about">
              <div className="text-[#3b2d2b] cursor-pointer hover:underline underline-offset-4 decoration-2">About</div>
            </Link>
          </div>
        : false}
      </div>
    </div>
  );
}