export default async function Page() {

  return (
    <div className="m-auto flex-1 flex mt-8">
      <div className="w-[950px] h-[700px] bg-no-repeat bg-contain bg-center bg-[url('/assets/main-paper-bg.png')]">
        <div className="w-full m-auto">
          <div className="grid grid-cols-2 gap-4 flex-1 text-left cardo-regular">
            <div className="p-8">
              <h2 className="text-xl font-semibold">About</h2>
            </div>
            <div className="p-4 mt-4 mb-4 pl-8 max-h-[700px] overflow-y-scroll">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
