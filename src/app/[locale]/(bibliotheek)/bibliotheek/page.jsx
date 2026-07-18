import BibliotheekAIContainer from '@/components/ai/bibliotheek/ai-container'
import { getDictionary } from '@/lib/intl/dictionaries'

export default async function Page({ params }) {

  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="m-auto flex-1 flex flex-col">
      <div className="relative bg-[url('/assets/bibliotheek/erasmus-chat-bg.png')] bg-repeat bg-[length:400px_400px] w-full min-h-screen">
        <img className="fixed -z-0" src="/assets/bibliotheek/erasmus-head.png" />
        <BibliotheekAIContainer />
      </div>
    </div>
  );
}
