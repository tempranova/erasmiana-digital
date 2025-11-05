import { db } from '@/lib/db/kysely'

import SearchContainer from '@/components/search/search-container'

export default async function Page() {

  const sampleSearches = [
    "The role weather played in Erasmus's life",
    "Jokes with friends",
    "Erasmus's advice for living well",
    "Complaints",
    "Sickness & health",
    "Erasmus's favorite classical writers",
    "Writing to kings and popes",
    "Erasmus and sexuality",
    "A typical day in Erasmus's life"
  ]

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="w-full m-auto max-w-7xl pb-16">
        <div className="max-w-7xl bg-white/90 relative p-8">
          <div className="text-xl cardo-regular">
            <h1 className="im-fell-dw-pica-regular text-4xl mb-4">General Search</h1>
            <p>This site employs semantic searching in addition to traditional text-match searching. You can select a few filters and options below, but just type whatever you're interested in, and results will be given from across Erasmus's corpus and letters.</p>
          </div>
          <SearchContainer
            placeholder="Type (in natural language) whatever you'd like to learn from Erasmus's letters."
          />
        </div>
      </div>
    </div>
  );
}
