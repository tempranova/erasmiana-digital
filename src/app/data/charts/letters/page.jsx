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
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="w-full m-auto max-w-7xl pb-16">
        <div className="max-w-7xl bg-white/90 relative p-8">
          <div className="text-xl cardo-regular">
            <h1 className="im-fell-dw-pica-regular text-4xl mb-4">Letter Chart</h1>
          </div>
          <LetterChart letters={letterResults} />
        </div>
      </div>
    </div>
  );
}
