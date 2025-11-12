import Link from 'next/link'

export default function Logo({ minimized }) {

  return (
    <div className={`m8 text-slate-800 im-fell-dw-pica-regular cursor-pointer`}>

      <div className="-mt-6">
        <div className={`${minimized ? 'opacity-0 pointer-events-none' : 'opacity-100'} text-[55px] transition-all duration-600 ease-in-out absolute uppercase font-[300] blur-[0.5px]`}>Erasmiana</div>
        <div className={`${minimized ? 'opacity-0 pointer-events-none' : 'opacity-100'} ovo-regular mt-[60px] text-[15px] transition-all duration-600 ease-in-out absolute uppercase font-[300] blur-[0.5px]`}>your Digital corpus and living search</div>
      </div>    
    </div>
  );
}