import SemanticMap from '@/components/charts/semantic-map'

export default async function Page() {

  return (
    <div id="scroll-container" className="my-4 mx-4 lg:my-auto lg:mx-0 lg:-ml-[20px] w-full max-w-7xl rounded-lg shadow-lg lg:h-[90vh] p-8 bg-repeat lg:bg-no-repeat lg:bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] overflow-y-auto outline-none">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-center text-3xl mb-4">Semantic Map</h1>
        </div>
        <SemanticMap />
      </div>
    </div>
  );
}
