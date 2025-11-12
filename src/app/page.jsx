import Link from 'next/link';

export default function Home() {
  return (
    <div className="m-auto flex-1 flex mt-8 w-[500px] h-[700px] bg-no-repeat bg-contain bg-center bg-[url('/assets/book-bg.png')]">
      <div className="w-full flex-1 text-center pt-[15vh]">
        <div className="cardo-regular uppercase text-[clamp(1.3rem,_4.8vh,_5rem)] text-[#3b2d2b] blur-[0.5px]">Erasmiana</div>
        <div className="cardo-regular -mt-4 uppercase text-[clamp(1rem,_3vh,_5rem)] text-[#3b2d2b] blur-[0.5px]">a digital corpus</div>
        <div className="cardo-regular -mt-2 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">Comprising the works of Erasmus of Rot</div>
        <div className="cardo-regular -mt-1 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">terdam, the light of the Northern Renaiss</div>
        <div className="cardo-regular -mt-1 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">ance, the Prince of the Humanists, includi</div>
        <div className="cardo-regular -mt-1 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">ng his writings and correspondences</div>
        <div className="cardo-regular -mt-1 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">across the length and breadth</div>
        <div className="cardo-regular -mt-1 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">of all Europe and with a</div>
        <div className="cardo-regular -mt-1 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">chance to debate</div>
        <div className="cardo-regular -mt-1 text-[clamp(0.7rem,_1.7vh,_5rem)] text-[#3b2d2b]">as he might.</div>
        <Link href="/preface">
          <div className="mt-[2%] cursor-pointer bg-white/20 hover:bg-white/15 border-2 shadow-lg rounded-lg border-[#3b2d2b] px-4 py-2 inline-block">
            <div className="cardo-regular text-3xl text-[#3b2d2b] blur-[0.5px]">Intrā, hospes!</div>
            <div className="cardo-regular text-1xl text-[#3b2d2b] blur-[0.5px]">Enter, guest!</div>
            <svg className="m-auto mt-2" width="30" height="30" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
