import Link from 'next/link'

export default function Logo({ minimized }) {

  return (
    <div className={`m8 text-white im-fell-dw-pica-regular cursor-pointer`}>
      <Link href="/">
        <div className="text-7xl">
          <img className="w-[100px]" src="/assets/letter-e-white-3.png" />
          <div className={`${minimized ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all duration-600 ease-in-out absolute -mt-[75px] ml-[78px] text-shadow-md text-shadow-gray-950`}><span className="hidden">E</span>rasmiana</div>
        </div>
        <div className={`${minimized ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all duration-600 ease-in-out absolute text-md ml-[285px] -mt-[15px] text-gray-300`}>Digital</div>
      </Link>
    </div>
  );
}