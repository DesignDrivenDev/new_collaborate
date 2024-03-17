import Image from "next/image"
import Link from "next/link"

interface ITabItemProps {
  text: string
}
const TabComponent = ({ text }: ITabItemProps) => {
  return (
    <div className="col-span-1 text-center cursor-pointer group py-2 hover_underline">
      <p className="w-max mx-auto text-base lg:text-lg transition-all duration-400 relative group-hover:text-primary group-hover:scale-[1.05] lg:group-hover:scale-[1.1]">
        {text}
      </p>
    </div>
  )
}

const IndustryOptionTwo = () => {
  const industry = "Banking & Finance"
  return (
    <div className="pt-24 md:pt-36 flex flex-col justify-center items-center">
      {/* Hero Section (Text and image) */}
      <div
        id={`hero-${industry}`}
        className="w-full bg-white flex justify-center items-center"
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 place-items-center gap-4 lg:gap-0 transition-all duration-500">
          <div className="col-span-1 lg:col-span-8 w-11/12 lg:w-full">
            <h1 className="text-4xl lg:text-7xl !leading-[1.1] tracking-wide">
              {"Driving tech-enabled efficiencies for public sector"}
            </h1>
            <p className="text-base lg:text-xl !leading-[1.4] tracking-wide max-w-lg font-light mt-2 lg:mt-4">
              {
                "Improve governance, case management, and citizen services through flexible, cloud-first solutions customised to serve unique public sector needs."
              }
            </p>
          </div>
          <div className="col-span-1 lg:col-span-4 w-full h-[40vh] lg:h-[60vh] relative">
            <Image
              src={
                "https://www.codec.ie/hubfs/Codec%202022/AdobeStock_262172683_Preview_public-sector.jpg"
              }
              alt={industry}
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* Tabs */}
      <br />
      <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 py-2 mt-0 mb-4 lg:mt-8 lg:mb-8">
        <TabComponent text="Overview" />
        <TabComponent text="Solution" />
        <TabComponent text="Resources" />
        <TabComponent text="Contact" />
      </div>
      {/* Overview & Challenges */}
      <div
        id={`overview-${industry}`}
        className="w-full bg-white flex justify-center items-center mt-4 lg:mt-8 relative"
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 transition-all duration-500 lg:mb-32 lg:mt-16">
          <div className="col-span-1 lg:col-span-8 w-11/12 lg:w-full mx-auto relative">
            <h2 className="text-3xl lg:text-5xl !leading-[1.1] tracking-wide max-w-xl">
              {"An industry in need of tailored cloud-first solutions"}
            </h2>
            <p className="text-base lg:text-xl !leading-[1.4] tracking-wide max-w-xl font-light mt-2 lg:mt-4 lg:ml-auto lg:mr-[15%]">
              {
                "Improve governance, case management, and citizen services through flexible, cloud-first solutions customised to serve unique public sector needs."
              }
            </p>
            <Link
              href={`/about`}
              className="group flex items-center justify-start mt-4 space-x-2 text-black max-w-xl lg:ml-auto lg:mr-[15%]"
            >
              <p className="inline-flex items-center gap-1 text-base transition-all font-semibold text-black group-hover:text-black/80 relative">
                Get to know us better
              </p>
              <span
                aria-hidden="true"
                className="block transition-all group-hover:text-black/80 group-hover:translate-x-1 rtl:rotate-180"
              >
                &rarr;
              </span>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-4 mx-auto w-full lg:mt-[8rem] grey-patch-industry">
            <h4 className="text-xl lg:text-3xl relative px-[4%]">
              Challenges we faced in {industry} industry:
            </h4>
            <ul className="pl-[8%] pt-[2%] lg:pl-[10%] lg:pt-[8%] flex flex-col space-y-3">
              <li className="listItemLine relative w-max text-base lg:text-lg font-light">
                Faster, more efficient case management
              </li>
              <li className="listItemLine relative w-max text-base lg:text-lg font-light">
                Improved regulatory and other legal compliance
              </li>
              <li className="listItemLine relative w-max text-base lg:text-lg font-light">
                Centralised data management and reporting
              </li>
              <li className="listItemLine relative w-max text-base lg:text-lg font-light">
                Streamlined citizen services
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Solution */}
      <div
        id={`solutions-${industry}`}
        className="w-full bg-white flex flex-col justify-center items-center mt-6"
      >
        {/* <div className="w-11/12 lg:w-full max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-5xl !leading-[1.1] tracking-wide text-center">
            {"How Collaborate Solutions Can Help ?"}
          </h2>
        </div> */}
      </div>
      {/* Resources (Other Industry Pages) */}
      {/* Contact Us */}
    </div>
  )
}

export default IndustryOptionTwo
