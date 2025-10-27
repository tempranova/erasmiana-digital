'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'

import Logo from '@/components/nav/logo';
import FakeWaveform from '@/components/audio/waveform'

export default function SideNav({}) {

  const pathname = usePathname()
  const router = useRouter()

  const [ minimized, setMinimized ] = useState(pathname === "/" ? false : true);

  useEffect(() => {
    if(pathname === "/") {
      setMinimized(false)
    } else {
      setMinimized(true)
    }
  }, [pathname])

  const animateLink = (route) => {
    if(pathname === "/") {
      setMinimized(true)
      setTimeout(() => {
        router.push(route);
      }, 600)
    } else {
      router.push(route);
    }
  }

  return (
    <div className={`fixed h-full ${minimized ? 'min-w-[170px] w-[170px]' : 'min-w-[400px] w-[400px]'} z-99 p-8 bg-black border-r-2 border-gray-600 transition-all duration-500 ease-in-out`}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex-1 flex flex-col justify-center">
          <div className="h-[100px]">
            <Logo minimized={minimized} />
          </div>
          <div className="mt-22 w-full text-white text-3xl im-fell-dw-pica-regular flex flex-col gap-4 items-center">
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
              <div onClick={() => animateLink("/search")}>Search</div>
            </div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
              <div onClick={() => animateLink("/letters")}>Books</div>
            </div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
              <div onClick={() => animateLink("/letters")}>Letters</div>
            </div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
              <div onClick={() => animateLink("/letters")}>Data</div>
            </div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline">
              <div onClick={() => animateLink("/about")}>About</div>
            </div>
          </div>
          <div className="mt-22 relative">
            <img className="w-[100px] block m-auto" src="/assets/sig-white-2.png" />
            {!minimized ? <div className="border-t border-gray-200 w-[80px] ml-[20px] -mt-[13px]"></div> : false}
            {!minimized ? <div className="border-t border-gray-200 w-[80px] ml-[235px]"></div> : false}
          </div>
        </div>
        <FakeWaveform />
      </div>
    </div>
  );
}
      