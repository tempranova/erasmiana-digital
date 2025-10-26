import TopNav from '@/components/nav/top-nav'

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
    <div className="min-h-screen bg-cover bg-right bg-[url('/assets/erasmus-bg.png')]">
      <TopNav />
      <div className="w-full m-auto max-w-7xl -mt-20 pt-28 h-screen p-8">
        <div className="text-black cardo-regular text-xl">
          <input type="text" className="p-4 text-center bg-white border border-black text-black w-full rounded-md" placeholder="Type (in natural language) whatever you'd like to learn from Erasmus's work." />
        </div>
      </div>
    </div>
  );
}
