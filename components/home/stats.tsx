import Link from "next/link"

const stats = [
  { title: "Clients", stat: "40+" },
  { title: "Projects", stat: "130+" },
  { title: "Project Savings", stat: "$20M" },
  { title: "Years of Experience", stat: "20+" },
]

const STATS_HEAD = "Over 30 Years of Delivering \nTechnology Transformation"
const STATS_DESC =
  "We are a 360 degree technology solutions firm that's been catering to a wide variety of industries and have delivered complex technology solutions and helped businesses in driving technology transformation and build sustainable tech ecosystems."

const StatsComponent = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-1 md:grid-cols-6 relative hidden">
        <div className="w-full col-span-5 arrowHead bg-primary p-12">
          <div className="w-10/12 bg-primary md:py-40">
            <h3 className="text-white text-2xl md:text-6xl w-full whitespace-pre-line">
              {STATS_HEAD}
            </h3>
            <p className="text-base md:text-lg text-white/60 max-w-[70%] mt-8">
              {STATS_DESC}
            </p>
            <Link
              href={`/about`}
              className="group flex items-center justify-start mt-4 space-x-2 text-white w-max"
            >
              <p className="inline-flex items-center gap-1 text-base transition-all font-semibold text-white group-hover:text-white/80 relative">
                Get to know us better
              </p>
              <span
                aria-hidden="true"
                className="block transition-all group-hover:text-white/80 group-hover:translate-x-1 rtl:rotate-180"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 place-items-center absolute lg:right-[-8%] xl:right-[2%] w-[50vh] top-[10%] bottom-[10%]">
          {stats.map((el) => {
            return (
              <div
                key={el.title}
                className={`py-4 md:py-8 font-bold text-center`}
              >
                <h2 className="text-2xl lg:text-6xl text-black">{el.stat}</h2>
                <p className="text-gray-600 mt-2">{el.title}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col w-full bg-primary my-6 lg:hidden">
        <div className="w-full h-auto bg-white px-4 pt-2 pb-6">
          <h3 className="text-black text-2xl md:text-6xl w-full whitespace-pre-line">
            {STATS_HEAD}
          </h3>
          <p className="text-base md:text-lg text-black/60 mt-3">
            {STATS_DESC}
          </p>
        </div>
        <div className="grid grid-cols-2 w-full h-auto px-4 py-6 gap-y-6">
          {stats.map((el) => {
            return (
              <div key={el.title} className={`font-bold text-center`}>
                <h2 className="text-3xl text-white">{el.stat}</h2>
                <p className="text-white/50 mt-1 font-light">{el.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StatsComponent
