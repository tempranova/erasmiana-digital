import Link from '@/components/nav/link'
import Logo from '@/components/nav/logo'
import FakeWaveform from '@/components/audio/waveform'

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <div className="min-w-[400px] w-[400px] p-8 bg-black flex items-center border-r-2 border-gray-600">
        <div className="block w-full">
          <div className="h-[100px]">
            <Logo />
          </div>
          <div className="mt-22 w-full text-white text-3xl im-fell-dw-pica-regular flex flex-col gap-4 items-center">
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline"><Link href="/search">Search</Link></div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline"><Link href="/letters">Books</Link></div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline"><Link href="/letters">Letters</Link></div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline"><Link href="/letters">Maps & Charts</Link></div>
            <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline"><Link href="/about">About</Link></div>
          </div>
          <div className="mt-22 relative">
            <img className="w-[100px] block m-auto" src="/assets/sig-white-2.png" />
            <div className="border-t border-gray-200 w-[80px] ml-[20px] -mt-[13px]"></div>
            <div className="border-t border-gray-200 w-[80px] ml-[235px]"></div>
          </div>
          <FakeWaveform />
        </div>
      </div>
      <div className="w-full bg-cover bg-right bg-[url('/assets/erasmus-bg.png')]">

      </div>
    </div>
  );
}
