'use client';

export default function WorkContainer({ work }) {

  return (
    <div className="grid grid-cols-2 gap-4 flex-1 text-left max-h-[700px] overflow-y-scroll text-[#3b2d2b] cardo-regular">
      <div className="p-4 pt-8">
        <div className="text-center">
          <h1 className="capitalize text-2xl font-semibold">{work.title.toLowerCase()}</h1>
          <hr className="m-auto my-4 w-1/3 border-[#3b2d2b]" />
          <h4 className="mt-1 text-md italic">{work.year}, {work.placename}</h4>
          <hr className="m-auto my-4 w-1/4 border-[#3b2d2b]" />
        </div>
        <div className="whitespace-pre-line leading-5 text-sm">
          A summary of what this text is about, when or why it was written.
          Explore this text: full text; search inside this text; browse by themes, keywords, and summaries
        </div>
        <hr className="m-auto my-4 w-1/3 border-[#3b2d2b]" />
        <div className="grid grid-cols-2 gap-4">
          A cool old book maybe, like an original copy some cool images linked here would be fun
        </div>
        <hr className="m-auto my-4 w-1/3 border-[#3b2d2b]" />
        <h2 className="text-xl font-semibold">Sources</h2>
        <div className="mt-4 text-xs">
          PDFs will be linked from here (Leiden, Froben, Brill, Amsterdam, online sources)
          As well as museum exhibits or other sources for this
        </div>
      </div>
      <div className="p-4 mt-4 mb-4 pl-8">
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