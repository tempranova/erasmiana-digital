import AIContainer from '@/components/ai/ai-container'

import { systemPrompt } from '@/lib/utils/ai';

export default async function Page() {

  return (
    <div className="m-auto flex-1 flex">
      <div className="m-auto w-full md:w-2/3 h-full pb-16 lg:pb-0 lg:w-[950px] lg:h-[700px] bg-no-repeat bg-cover lg:bg-contain bg-center lg:bg-[url('/assets/main-paper-bg.png')] bg-[url('/assets/mobile-parchment-bg.png')] ">
        <div className="w-full m-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 text-left">
            <div className="p-8">
              <AIContainer />
            </div>
            <div className="p-4 mt-4 mb-4 pl-8 lg:max-h-[700px] lg:overflow-y-scroll cardo-regular">
              <h2 className="text-xl font-semibold">Associated Sources</h2>
              <p className="mt-2">As you start chatting, the ErasmusAI bot will try to find some passages by Erasmus that might relate in some way to your conversation. Check them out for more about what Erasmus himself might have thought!</p>
              <div className="mt-2 border rounded-md">
                <div className="italic p-2.5">Start chatting to see sources.</div>
              </div>
              <hr className="m-auto my-4 w-1/3 border-[#3b2d2b]" />
              <details className="mt-2 pb-8">
                <summary className="cursor-pointer hover:underline underline-offset-2 italic">How ErasmusAI Works</summary>
                <div className="mt-2">
                  <p>This "ErasmusAI" is an experiment in creating a tool to help chatters think more critically about their opinions. Just what might be considered an "Erasmian method" isn't entirely defined, but here is the system prompt:</p>
                  <div className="code text-[10px] whitespace-pre-line">
                    {systemPrompt}
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
