'use client';
import Link from 'next/link';

export default function SectionContainer({ section, prevSection, nextSection, numberOfPages }) {

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
        <div className="grid grid-cols-2 gap-4">
          {section.pages.map((page, index) => {
            const url = `https://d1cmk1mkpb53mi.cloudfront.net/works/${section.work.title.toLowerCase().replace(/ /g, '_')}/page-${String(page).padStart(numberOfPages.toString().length, '0')}.jpg`
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
        <h2 className="text-xl font-semibold">Sources</h2>
        <div className="mt-4 text-xs">
          PDFs will be linked from here (Leiden, Froben, Brill, Amsterdam, online sources)
          As well as museum exhibits or other sources for this
        </div>
        <h2 className="text-xl font-semibold">Sources</h2>
        <div className="mt-4 text-xs">
          PDFs will be linked from here (Leiden, Froben, Brill, Amsterdam, online sources)
          As well as museum exhibits or other sources for this
        </div>
        <h2 className="text-xl font-semibold">Commentary</h2>
        <details className="mt-2">
          <summary className="cursor-pointer hover:underline underline-offset-2 italic">AI Summary</summary>
          <p className="mt-2"></p>
        </details>
        <h2 className="mt-4 text-xl font-semibold">Translations</h2>
        <div className="mt-4 text-md">
          Various translations in various languages linked; those available on the site internal links
        </div>
      </div>
    </div>
  )

}