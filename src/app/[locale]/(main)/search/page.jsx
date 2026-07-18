import { db } from '@/lib/db/kysely'

import SearchContainer from '@/components/search/search-container'

export default async function Page() {

  const workOptions = await db.selectFrom('Work')
    .select(['id as value', 'title as label'])
    .execute();

  return (
    <div id="scroll-container" className="my-4 mx-4 lg:my-auto lg:mx-0 lg:-ml-[20px] w-full max-w-7xl rounded-lg shadow-lg lg:h-[90vh] p-8 bg-repeat lg:bg-no-repeat lg:bg-cover bg-center bg-[url('/assets/bg-parchment.jpg')] overflow-y-auto outline-none">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-center text-3xl mb-4">Search</h1>
        </div>
        <SearchContainer
          workOptions={workOptions}
          placeholder="Type (in natural language) whatever you'd like to learn from Erasmus's letters."
        />
      </div>
    </div>
  );
}
