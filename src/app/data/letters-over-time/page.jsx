import { db } from '@/lib/db/kysely'

import LetterChart from '@/components/charts/letter-chart'

export default async function Page() {

  const letterResults = await db
    .selectFrom('Letter')
    .select((eb) => [
      'id',
      'title',
      'alt_title',
      'author', 'recipient',
      'year', 'month', 'day',
    ])
    .execute()

  return (
    <div id="scroll-container" className="my-auto -ml-[20px] w-full max-w-7xl rounded-lg shadow-lg mt-auto h-[90vh] p-8 bg-no-repeat bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] overflow-y-auto outline-none">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-center text-3xl mb-4">Letters Over Time</h1>
        </div>
        <LetterChart letters={letterResults} />
      </div>
    </div>
  );
}
