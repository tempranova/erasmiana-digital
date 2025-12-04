import Link from 'next/link';

import { getDictionary } from '@/lib/intl/dictionaries'

export default async function Preface({ params }) {

  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="m-auto flex-1 flex">
      <div className="m-4 lg:m-auto w-full lg:w-2/3 h-full pb-16 lg:pb-0 lg:w-[950px] lg:h-[700px] bg-no-repeat bg-cover lg:bg-contain bg-center lg:bg-[url('/assets/main-paper-bg.png')] bg-[url('/assets/mobile-parchment-bg.png')] ">
        <div className="w-full m-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 text-left">
            <div className="order-2 lg:order-1 p-8">
              <div>
                <Link href="/debate">
                  <div className="im-fell-dw-pica-regular-italic text-3xl text-[#3b2d2b] leading-none flex items-center cursor-pointer hover:underline underline-offset-4 decoration-2">
                    {dict['debate']}
                    <svg className="ml-2" width="15" height="15" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
                <p className="mt-2 ml-4 cardo-regular text-sm text-[#3b2d2b] opacity-80">{dict['debate-link-text']}</p>
              </div>
              <div className="mt-4">
                <Link href="/learn">
                  <div className="im-fell-dw-pica-regular-italic text-3xl text-[#3b2d2b] leading-none flex items-center cursor-pointer hover:underline underline-offset-4 decoration-2">
                    {dict['learn']}
                    <svg className="ml-2" width="15" height="15" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
                <p className="mt-2 ml-4 cardo-regular text-sm text-[#3b2d2b] opacity-80">{dict['learn-link-text']}</p>
              </div>
              <div className="mt-4">
                <Link href="/search">
                  <div className="im-fell-dw-pica-regular-italic text-3xl text-[#3b2d2b] leading-none flex items-center cursor-pointer hover:underline underline-offset-4 decoration-2">
                    {dict['search']}
                    <svg className="ml-2" width="15" height="15" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
                <p className="mt-2 ml-4 cardo-regular text-sm text-[#3b2d2b] opacity-80">{dict['search-link-text']}</p>
              </div>
              <div className="mt-4">
                <Link href="/works">
                  <div className="im-fell-dw-pica-regular-italic text-3xl text-[#3b2d2b] leading-none flex items-center cursor-pointer hover:underline underline-offset-4 decoration-2">
                    {dict['works']}
                    <svg className="ml-2" width="15" height="15" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
                <p className="mt-2 ml-4 cardo-regular text-sm text-[#3b2d2b] opacity-80">{dict['works-link-text']}</p>
              </div>
              <div className="mt-4">
                <Link href="/letters">
                  <div className="im-fell-dw-pica-regular-italic text-3xl text-[#3b2d2b] leading-none flex items-center cursor-pointer hover:underline underline-offset-4 decoration-2">
                    {dict['letters']}
                    <svg className="ml-2" width="15" height="15" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
                <p className="mt-2 ml-4 cardo-regular text-sm text-[#3b2d2b] opacity-80">{dict['letters-link-text']}</p>
              </div>
              <div className="mt-4">
                <Link href="/data">
                  <div className="im-fell-dw-pica-regular-italic text-3xl text-[#3b2d2b] leading-none flex items-center cursor-pointer hover:underline underline-offset-4 decoration-2">
                    {dict['data']}
                    <svg className="ml-2" width="15" height="15" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                    </svg>
                  </div>
                </Link>
                <p className="mt-2 ml-4 cardo-regular text-sm text-[#3b2d2b] opacity-80">{dict['data-link-text']}</p>
              </div>
              
            </div>
            <div id="scroll-container" className="order-1 lg:order-2 p-4 mt-4 mb-4 pl-8 lg:max-h-[700px] lg:overflow-y-scroll">
              <div className="text-center">
                <div className="mt-4 cardo-regular uppercase text-3xl text-[#3b2d2b] leading-none break-all">Erasmiana Digital</div>
              </div>
              <div className="mt-4 cardo-regular text-lg text-[#3b2d2b] whitespace-pre-line">{dict['about-text']}</div>
              <div className="mt-4 cardo-regular text-lg text-[#3b2d2b]"><a href="https://victortemprano.com" className="im-fell-dw-pica-regular-italic text-lg hover:underline underline-offset-4 decoration-2">Website made by Victor Temprano.</a></div>
              <img className="m-auto mt-8 w-1/2" src="/assets/flourish-1.png" />
              <div className="text-center">
                <div className="mt-4 cardo-regular uppercase text-3xl text-[#3b2d2b] leading-none break-all">{dict['how-its-made']}</div>
              </div>
              <div className="mt-4 cardo-regular text-lg text-[#3b2d2b]">{dict['how-its-made-text']}</div>
              <iframe className="my-4" width="100%" height="315" src="https://www.youtube.com/embed/Gdi5ylDggVQ?si=DorSQ18nVChVdBe9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <div className="pb-12 mt-4 cardo-regular text-lg text-[#3b2d2b]"><a className="im-fell-dw-pica-regular-italic text-lg hover:underline underline-offset-4 decoration-2" href="https://github.com/tempranova/erasmiana-digital">Github here.</a></div>
              <div className="text-center">
                <div className="mt-4 cardo-regular uppercase text-3xl text-[#3b2d2b] leading-none break-all">{dict['thanks']}</div>
              </div>
              <div className="mt-4 cardo-regular text-lg text-[#3b2d2b]">{dict['thanks-text']}</div>
              <ul className="pb-12 mt-4 text-xl">
                <li>John Tholen</li>  
                <li>Sanne Steen</li>
                <li>Ronald van Raak</li>
                <li>Han van Ruler</li>
                <li>Hélène Haug</li>
                <li>Laure Goemans</li>
                <li>Wiep van Bunge</li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
