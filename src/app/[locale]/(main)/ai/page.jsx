import Chatbot from '@/components/ai/experimental/chatbot';

export default async function Page() {

  return (
    <div className="bg-white p-8">
      <h2 className="text-3xl">Experimental AI</h2>
      <hr className="mt-3 mb-3" />
      <Chatbot />
    </div>
  );
}
