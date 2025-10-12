import Chatbot from '@/components/ai/experimental/chatbot';

export default async function Page() {

  return (
    <div>
      <h2 className="font-semibold text-3xl">Experimental AI</h2>
      <hr className="mt-3 mb-3" />
      <Chatbot />
    </div>
  );
}
