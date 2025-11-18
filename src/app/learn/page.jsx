export default async function Page() {

  return (
    <div className="m-auto flex-1 flex">
      <div className="m-auto w-full md:w-2/3 h-full pb-16 lg:pb-0 lg:w-[950px] lg:h-[700px] bg-no-repeat bg-cover lg:bg-contain bg-center lg:bg-[url('/assets/main-paper-bg.png')] bg-[url('/assets/mobile-parchment-bg.png')] ">
        <div className="w-full m-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 text-left">
            <div className="p-8">
              <h2 className="text-xl font-semibold">Learn</h2>
            </div>
            <div className="p-4 mt-4 mb-4 pl-8 lg:max-h-[700px] lg:overflow-y-scroll">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
