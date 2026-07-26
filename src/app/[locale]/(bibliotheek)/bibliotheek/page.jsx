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
        </div>
        <img className="fixed -z-0 right-0 mt-30" src="/assets/bibliotheek/figure.png" />
        <img className="fixed -z-0 mt-30" src="/assets/bibliotheek/erasmus-head.png" />
      </div>
    </div>
  );
}
