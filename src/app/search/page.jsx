import SearchContainer from '@/components/search/search-container'

export default function Page() {

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
    <div className="min-h-screen bg-cover bg-right bg-[url('/assets/erasmus-bg.jpg')]">
      <div className="w-full m-auto max-w-7xl pb-16">
        <div className="grid grid-cols-1 gap-8">
          <SearchContainer
            placeholder="Type (in natural language) whatever you'd like to learn from Erasmus's letters."
          />
        </div>
      </div>
    </div>
  );
}
