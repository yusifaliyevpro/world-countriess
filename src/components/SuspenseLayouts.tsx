export function CountriesSkeleton() {
  return (
    <div className="justify-content-center mx-4 flex flex-wrap items-center justify-center gap-x-10">
      {Array(42)
        .fill(42)
        .map((i) => (
          <div
            key={i}
            className="justify-content-center relative mt-10 inline-block w-[325px] select-none items-center justify-center rounded-xl bg-gray-200 text-center transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <div className="relative">
              <div className="h-[185px] w-full animate-pulse rounded-t-md bg-gray-400 object-cover" />
            </div>
            <p className="my-3 ml-8 text-left text-2xl font-bold text-black">
              <span className="w-fit animate-pulse rounded-md bg-gray-400 text-gray-400">AzerbaijanTurkey</span>
            </p>
            <p className="text-md my-3 ml-8 w-fit animate-pulse rounded-md bg-gray-400 text-left text-gray-400">
              <span className="font-bold">Capital: </span> <span>Canberra</span>
            </p>
            <p className="text-md my-3 ml-8 w-fit animate-pulse rounded-md bg-gray-400 text-left text-gray-400">
              <span className="font-bold">Region: </span> <span className="w-fit">Asia</span>
            </p>
            <p className="text-md my-3 ml-8 w-fit animate-pulse rounded-md bg-gray-400 text-left text-gray-400">
              <span className="font-bold">Population: </span> <span>2932932</span>
            </p>
          </div>
        ))}
    </div>
  );
}

export function CountrySkeleton() {
  return (
    <div className="relative mx-6 mt-20 flex select-none flex-col sm:mx-16">
      <div className="relative flex w-full flex-col-reverse justify-between sm:flex-row">
        <div className="items-left relative ml-3 flex flex-col text-left text-lg">
          <h1 className="mt-8 w-fit animate-pulse rounded-md bg-gray-400 text-3xl font-bold text-gray-400 sm:mt-0">Azerbaijan</h1>
          <div className="flex flex-col gap-x-20 sm:flex-row">
            <div className="flex flex-col gap-y-1 sm:gap-y-2">
              <p className="mt-12 w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Native Name: <span className="font-normal">Azərbaycan</span>
              </p>
              <p className="w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Region: <span className="font-normal">Asia</span>
              </p>
              <p className="w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Capital: <span className="font-normal">Baku</span>
              </p>
              <p className="w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Currencies:
                <span className="font-normal">Azerbaijani Manat</span>
              </p>
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
              <p className="mt-12 w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Population: <span className="font-normal">10928189</span>
              </p>
              <p className="w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Sub Region: <span className="font-normal">Western Asia</span>
              </p>
              <p className="mr-5 w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Top Level Domain: <span className="font-normal">.az</span>
              </p>
              <p className="w-fit animate-pulse rounded-md bg-gray-400 font-bold text-gray-400">
                Languages: <span className="font-normal">Azerbaijani, English</span>
              </p>
            </div>
          </div>
          <div className="relative mb-16 flex w-fit animate-pulse flex-col items-start rounded-md bg-gray-400 text-gray-400 sm:mb-auto sm:mr-6 sm:max-w-[700px] sm:flex-row sm:items-center">
            <p className="mr-2 text-wrap font-bold">Border Countries: </p>
            <div className="relative mt-6 flex flex-row flex-wrap gap-2 sm:mr-5 sm:mt-auto">
              {Array(5)
                .fill(5)
                .map((r, index) => (
                  <div
                    key={index}
                    className="text-centersm:flex-none w-fit flex-1 animate-pulse select-none text-nowrap rounded-md border-solid bg-gray-400 p-2 text-gray-400"
                  >
                    <p className="font-normal">Georgia</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="relative mx-5 flex max-h-[400px] bg-transparent drop-shadow-2xl sm:mx-0">
          <div className="h-[200px] w-[600px] animate-pulse select-none rounded-md bg-gray-400 object-cover text-gray-400 sm:h-[400px]" />
        </div>
      </div>
      <div className="w-fit animate-pulse rounded-md bg-gray-400 text-lg font-bold text-gray-400">Show More</div>
    </div>
  );
}
