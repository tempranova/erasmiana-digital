import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'

import TopNav from '@/components/nav/top-nav'
import SearchContainer from '@/components/search/search-container'
import LetterIndex from '@/components/letters/letter-index';

export default async function Page() {

  const allLetters = await db.selectFrom('Work')
      .where('type', '=', 'letter')
      .select((eb) => [
        'Work.id', 'Work.title', 'Work.alt_title',
        jsonObjectFrom(
          eb.selectFrom('Metadata')
            .select(['id', 'reference', 'date_text', 'placename', 'volume', 'related_to'])
            .whereRef('Metadata.workId', '=', 'Work.id')
        ).as('metadata')
      ])
      .execute()

  return (
    <div>
      <div className="fixed inset-0 -z-10 bg-right bg-cover bg-no-repeat bg-[url('/assets/erasmus-bg.png')]" />
      <TopNav />
      <div className="m-auto max-w-7xl -mt-[50px]">
        <div className="w-2/3 ml-auto bg-gray-200 p-4">
          <p>Erasmus wrote and published thousands of letters during his lifetime. They touch on many subjects, from his struggles with money to jokes with friends; also included are exchanges with future kings, discussions of travel, and trading of praise and questions.</p>
          <p className="mt-4">Search these letters using natural language to find more related to any subject you might be interested in.</p>
        </div>
      </div>
      <div className="w-full m-auto max-w-7xl pb-16">
        <div className="grid grid-cols-2 gap-8">
          <SearchContainer
            searchTitle="Search Erasmus's Letters:"
            placeholder="Type (in natural language) whatever you'd like to learn from Erasmus's letters."
          />
          <div className="mt-9">
            <LetterIndex allLetters={allLetters} />
          </div>
        </div>
      </div>
    </div>
  );
}
