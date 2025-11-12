export default async function Page() {

  return (
    <div className="m-auto flex-1 mt-8 w-full h-[720px] max-h-[720px] pb-10 bg-no-repeat bg-contain bg-center bg-[url('/assets/main-paper-bg.png')]">
      <div className="w-[110vh] m-auto">
        <div className="grid grid-cols-2 gap-4 flex-1 text-left">
          <div className="text-xl cardo-regular">
            <h1 className="im-fell-dw-pica-regular text-4xl mb-4">Data Visualizations</h1>
            <p>On this page, you can find a few ways that we've visualized the data we have on Erasmus's letters and writings. There are surely many more interesting visualizations that can be done, so please get in touch if you'd like to see more or get a copy of the full dataset.</p>
          </div>
          <div className="mt-4 text-xl cardo-regular">
            <h2 className="text-3xl">Maps</h2>
            <ul className="mt-4">
              <li><a href="/data/maps/letters/" className="underline underline-offset-2 hover:no-underline">Letters To and From Erasmus</a></li>
              <li><a href="/data/maps/network/" className="underline underline-offset-2 hover:no-underline">Erasmus's Network</a></li>
              <li><a href="/data/maps/travel/" className="underline underline-offset-2 hover:no-underline">Erasmus's Travel</a></li>
            </ul>
            <h2 className="mt-4 text-3xl">Charts</h2>
            <ul className="mt-4">
              <li><a href="/data/charts/letters/" className="underline underline-offset-2 hover:no-underline">Letters Over Time</a></li>
              <li><a href="/data/charts/words/" className="underline underline-offset-2 hover:no-underline">Words Written Over Time</a></li>
            </ul>
          </div>
          <div className="mt-4 text-xl cardo-regular">
            <p>There are many more ways to visualize and interpret the letter and publication data. Send us a suggestion!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
