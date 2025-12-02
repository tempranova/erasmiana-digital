import AIContainer from '@/components/ai/ai-container'
import { getDictionary } from '@/lib/intl/dictionaries'

export default async function Page({ params }) {

  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="m-auto flex-1 flex">
      <div className="m-4 lg:m-auto w-full lg:w-2/3 h-full pb-16 lg:pb-0 lg:w-[950px] lg:h-[700px] bg-no-repeat bg-cover lg:bg-contain bg-center lg:bg-[url('/assets/main-paper-bg.png')] bg-[url('/assets/mobile-parchment-bg.png')] ">
        <div className="w-full m-auto">
          <AIContainer dict={dict} />
        </div>
      </div>
    </div>
  );
}
