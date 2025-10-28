import AIContainer from '@/components/ai/ai-container'

export default async function Page() {

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="max-w-7xl bg-white/90 relative p-8">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-4xl mb-4">Debate with ErasmusAI</h1>
          <p>For Erasmus, the ability to discuss things respectfully yet thoroughly was a very worthwhile activity. A good mind should never be afraid of a good debate. Here, pick a topic or create one to start a discussion with our Erasmus AI.</p>
        </div>

        <div className="w-full m-auto max-w-7xl pb-16">
          <div className="grid grid-cols-1 gap-8">
            <AIContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
