import { db } from '@/lib/db/kysely'

import SearchContainer from '@/components/search/search-container'

export default async function Page() {

  return (
    <div className="m-auto flex-1 mt-8 w-full max-w-7xl p-8 rounded-md shadow-lg bg-no-repeat bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] max-h-[80vh] overflow-y-scroll">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular-italic text-2xl mb-4">Search</h1>
        </div>
        <SearchContainer
          placeholder="Type (in natural language) whatever you'd like to learn from Erasmus's letters."
        />
      </div>
    </div>
  );
}
