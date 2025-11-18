'use client';
import Link from 'next/link';

export default function SectionContainer({ section, prevSection, nextSection, numberOfPages }) {

  console.log(section)

  return (
    <div className="grid grid-cols-2 gap-4 flex-1 text-left max-h-[700px] overflow-y-scroll text-[#3b2d2b] cardo-regular">
      <div className="p-4 pt-8">
        <div className="text-center">
          <h1 className="capitalize text-2xl font-semibold">{section.work.title.toLowerCase()}</h1>
          <hr className="m-auto my-4 w-1/3 border-[#3b2d2b]" />
          <h4 className="mt-1 flex-1 m-auto text-md italic">Excerpted from page{section.pages.length > 1 ? 's' : ''} {section.pages.join(', ')}</h4>
          <div className="mt-2 flex gap-2 justify-center items-center">
            {prevSection ? 
              <Link href={`/works/${section.work.id}/sections/${prevSection.id}`} className="border rounded-md text-xs px-1 py-1 bg-white/30 cursor-pointer hover:bg-white/20">
                Previous
              </Link>
            : false}
            <Link href={`/works/${section.work.id}/sections`} className="border rounded-md text-xs px-1 py-1 bg-white/30 cursor-pointer hover:bg-white/20">
              Browse All
            </Link>
            {nextSection ? 
              <Link href={`/works/${section.work.id}/sections/${nextSection.id}`} className="border rounded-md text-xs px-1 py-1 bg-white/30 cursor-pointer hover:bg-white/20">
                Next
              </Link>
            : false}
          </div>
          <hr className="m-auto my-4 w-1/4 border-[#3b2d2b]" />
        </div>
        <div className="whitespace-pre-line leading-5 text-sm">
          {section.text}
        </div>
      </div>
      <div className="p-4 mt-4 mb-4 pl-8">
        <h2 className="mt-4 text-xl font-semibold">Commentary</h2>
        <details className="mt-2" open={true}>
          <summary className="cursor-pointer hover:underline underline-offset-2 italic">AI Summary</summary>
          <p className="mt-2">{section.metadata.summary}</p>
        </details>
        {section.pages.length > 0 ? 
          <>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {section.pages.map((page, index) => {
                const url = `https://d1cmk1mkpb53mi.cloudfront.net/works/${section.work.slug}/page-${String(page).padStart(numberOfPages.toString().length, '0')}.jpg`
                return (
                  <div key={`image-${index}`} className="p-2 border border-[#3b2d2b] rounded-md shadow-md bg-white/20">
                    <a href={url} target="_blank">
                      <img className="w-full" src={url} />
                    </a>
                  </div>
                )
              })}
            </div>
          <hr className="m-auto my-4 w-1/3 border-[#3b2d2b]" />
          </>
        : false}
        <h2 className="mt-4 text-xl font-semibold">Sources</h2>
        {section.work.title.indexOf("adagi") === -1 ? 
          <div className="text-sm">
            This section has been generated from scanned copies of Froben's <em>Opera Omnia</em> (1538-40), and likely contain some errors. See <Link className="im-fell-dw-pica-regular-italic underline underline-offset-2 hover:no-underline" href="/about">About</Link> for more information on how these excerpts were generated.
          </div>
        : false}
        <div className="mt-4 text-xs">
          {section.work.sources.map((source, i) => {

            let textToShow = "";
            if(source.publication && source.author) {
              textToShow = `${source.publication}, ${source.author}`
            } else if(source.title && source.author) {
              textToShow = `${source.title}, ${source.author}`
            } else if(source.publication && source.title) {
              textToShow = `${source.publication}, ${source.title}`
            } else if(source.publication) {
              textToShow = `${source.publication}`
            } else if(source.title) {
              textToShow = `${source.title}`
            }

            return (
              <div key={`source-${i}`} className="mt-2">
                <div className="text-sm flex">
                  <div className="mr-2">{i + 1}.</div>
                  <div>
                    {source.url ? 
                      <a className="underline" href={source.url} target="_blank">
                        {textToShow}
                        <svg className="ml-1 -mt-1 inline" width="12" height="12" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.16699 3.33301C9.62708 3.33318 10 3.70686 10 4.16699C9.99982 4.62697 9.62697 4.99982 9.16699 5H4.16699C3.94598 5 3.73343 5.08786 3.57715 5.24414C3.42105 5.40033 3.33309 5.61219 3.33301 5.83301V15.833C3.33301 16.054 3.42087 16.2666 3.57715 16.4229C3.73343 16.5791 3.94598 16.667 4.16699 16.667H14.167C14.3878 16.6669 14.5997 16.579 14.7559 16.4229C14.9121 16.2666 15 16.054 15 15.833V10.833C15.0002 10.373 15.373 10.0002 15.833 10C16.2931 10 16.6668 10.3729 16.667 10.833V15.833C16.667 16.4959 16.4032 17.1318 15.9346 17.6006C15.4658 18.0693 14.8299 18.3329 14.167 18.333H4.16699C3.50395 18.333 2.86825 18.0694 2.39941 17.6006C1.93057 17.1317 1.66699 16.496 1.66699 15.833V5.83301C1.66708 5.17008 1.93065 4.53419 2.39941 4.06543C2.86822 3.59679 3.5041 3.33301 4.16699 3.33301H9.16699ZM17.5 1.66699C17.5419 1.66699 17.5828 1.6708 17.623 1.67676C17.637 1.67883 17.6512 1.67983 17.665 1.68262C17.6796 1.68553 17.6938 1.6897 17.708 1.69336C17.7184 1.69603 17.729 1.6981 17.7393 1.70117C17.7525 1.70514 17.7654 1.71025 17.7783 1.71484C17.8918 1.75498 17.9981 1.82035 18.0889 1.91113C18.1188 1.94103 18.1455 1.97286 18.1699 2.00586C18.1782 2.01712 18.1866 2.02835 18.1943 2.04004C18.2322 2.09711 18.2618 2.15785 18.2842 2.2207C18.2888 2.23367 18.2939 2.24651 18.2979 2.25977C18.3093 2.29789 18.3164 2.33686 18.3223 2.37598C18.3283 2.41653 18.333 2.45776 18.333 2.5V7.5C18.333 7.96024 17.9602 8.33301 17.5 8.33301C17.0398 8.33301 16.667 7.96024 16.667 7.5V4.51074L10.5889 10.5889C10.2634 10.9143 9.73656 10.9143 9.41113 10.5889C9.08572 10.2634 9.08573 9.73657 9.41113 9.41113L15.4893 3.33301H12.5C12.0398 3.33301 11.667 2.96024 11.667 2.5C11.667 2.03976 12.0398 1.66699 12.5 1.66699H17.5Z" fill="#23282B"/>
                        </svg>
                      </a>
                    : textToShow}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <h2 className="mt-4 text-xl font-semibold">Translations</h2>
        <div className="mt-4 text-md">
          <em>We are still working on adding translation links for different works.</em>
        </div>
      </div>
    </div>
  )

}