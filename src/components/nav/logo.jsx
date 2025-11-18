import Link from 'next/link'

export default function Logo({ minimized }) {

  return (
    <div className={`m8 text-black im-fell-dw-pica-regular cursor-pointer`}>
      <Link href="/">
        <div className="text-7xl">
          <img className="w-[100px]" src="/assets/letter-e-black.png" />
          <div className={`${minimized ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all duration-600 ease-in-out absolute -mt-[75px] ml-[78px]`}><span className="hidden">E</span>rasmiana</div>
        </div>
        <div className={`${minimized ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all duration-600 ease-in-out absolute text-md ml-[285px] -mt-[15px] text-[#3b2d2b]`}>Digital</div>
      </Link>
    </div>
  );
}