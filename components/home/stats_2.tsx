const stats = [
  { title: "Clients", stat: "40+" },
  { title: "Projects", stat: "130+" },
  { title: "Project Savings", stat: "$20M" },
  { title: "Years of Experience", stat: "20+" },
]

const StatsComponent = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 ">
        <div className="col-span-1 md:col-span-2 flex items-center ">
          <div className=" bg-black md:px-12 md:py-16 px-8 py-12 text-white md:max-w-lg ">
            <p className="text-base md:text-xl">
              {`We are a 360 degree technology solutions firm that's been catering to a
              wide variety of industries and have delivered complex technology
              solutions and helped businesses in driving technology
              transformation and build sustainable tech ecosystems.`}
            </p>
          </div>
        </div>
        <div className="py-6 col-span-1 md:col-span-4 grid place-items-center relative bg-[url('/svgs/stat.svg')] bg-no-repeat bg-contain bg-center">
          {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0">
            <Image src={bg} alt=""/>
          </div> */}
          {stats.map((stat, i) => (
            <div
              key={stat.title}
              className={`py-4 md:py-8 font-bold text-center  ${
                i === 1 || i === 2 ? "md:ml-52 ml-24" : ""
              }`}
            >
              <h2 className="text-3xl md:text-6xl">{stat.stat}</h2>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsComponent
