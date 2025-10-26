import Link from '@/components/nav/link'

export default function Logo({ id = "erasmiana-logo", margin = false, header = false }) {

  return (
    <div id={id} className={`${margin ? `m-8` : ''} ${header ? '' : 'absolute'} text-white im-fell-dw-pica-regular cursor-pointer`}>
      <Link href="/">
        <div className="text-7xl">
          <img className="w-[100px]" src="/assets/letter-e-white-3.png" />
          <div className="absolute -mt-[75px] ml-[78px] text-shadow-md text-shadow-gray-950"><span className="hidden">E</span>rasmiana</div>
        </div>
        <div className="absolute text-md ml-[285px] -mt-[15px] text-gray-300">Digital</div>
      </Link>
    </div>
  );
}