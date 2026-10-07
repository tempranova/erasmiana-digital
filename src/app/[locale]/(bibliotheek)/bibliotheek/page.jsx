import BibliotheekAIContainer from '@/components/ai/bibliotheek/ai-container'
import { getDictionary } from '@/lib/intl/dictionaries'

export default async function Page({ params }) {

  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="m-auto flex-1 flex flex-col">
      <div className="relative bg-[url('/assets/bibliotheek/landing-bg.png')] bg-cover w-full h-screen overflow-hidden">
        <div className="absolute w-full h-full justify-center text-center mt-20">
          <div className="text-[#192a57] text-6xl font-extrabold uppercase tracking-wide">Chat Met <br />Erasmus</div>
          <div className="text-[#00b1fe] text-5xl font-bold uppercase tracking-wide mt-16">Chat With <br />Erasmus</div>
          <div>
            <a href="/nl/bibliotheek/ai">
              <div className="bg-[#192a57] w-50 px-6 py-4 text-white font-semibold uppercase inline-block shadow-[0_25px_25px_rgba(0,0,0,0.25)] mt-40">
                <div className="flex w-full justify-center">
                  Nederlands
                </div>
              </div>
            </a>
          </div>
          <div>
            <a href="/en/bibliotheek/ai">
              <div className="bg-[#192a57] w-50 px-6 py-4 text-white font-semibold uppercase inline-block shadow-[0_25px_25px_rgba(0,0,0,0.25)] mt-6">
                <div className="flex w-full justify-center">
                  English
                </div>
              </div>
            </a>
          </div>
          <div className="mx-auto mt-10 max-w-sm rounded-xl bg-white/80 px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.12)] backdrop-blur-sm">
            <div className="flex items-start justify-center gap-2">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#00b1fe]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              </svg>
              <div className="text-left text-[#192a57]">
                <p className="text-xs font-semibold leading-snug">
                  Let op: dit is AI en het kan fouten bevatten<br />
                  Gebruik geen persoonsgegevens
                </p>
                <p className="mt-1 text-xs italic leading-snug text-[#192a57]/70">
                  Please note: this is AI and it could include mistakes<br />
                  Don&apos;t use personal data
                </p>
              </div>
            </div>
          </div>
        </div>
        <img className="fixed -z-0 right-0 mt-30" src="/assets/bibliotheek/figure.png" />
        <img className="fixed -z-0 mt-30" src="/assets/bibliotheek/erasmus-head.png" />
      </div>
    </div>
  );
}
