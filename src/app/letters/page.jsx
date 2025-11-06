import { db } from '@/lib/db/kysely'

import LetterIndex from '@/components/letter/letter-index';

export default async function Page() {

  const allLetters = await db.selectFrom('Letter')
      .select((eb) => [
        'id', 'title', 'alt_title', 'reference', 'date_text', 'place_text', 'volume', 'related_to',
      ])
      .execute()

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="max-w-7xl bg-white/90 relative p-8">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-4xl mb-4">The Letters of Erasmus</h1>
          <p>Erasmus wrote and published thousands of letters during his lifetime. They touch on many subjects, from his struggles with money to jokes with friends; also included are exchanges with future kings, discussions of travel, and trading of praise and questions.</p>
        </div>

        <div className="w-full m-auto max-w-7xl pb-16">
          <div className="grid grid-cols-1 gap-8">
            <div className="mt-4">
              <LetterIndex allLetters={allLetters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
