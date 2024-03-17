import { partnersList } from "@/utils/common"
import dynamic from "next/dynamic"
import Image from "next/image"
const SectionTitleComponent = dynamic(() => import("./sectionTitle"), {
  ssr: false,
})

const PartnersComponent = () => {
  return (
    <div className="w-full h-fit flex justify-center items-center flex-col py-4 md:py-6 bg-white overflow-hidden">
      {/* <SectionTitleComponent title="Our Partners" /> */}
      <div className="flex overflow-hidden select-none py-10 logos relative">
        <div className="flex shrink-0 justify-between items-center whitespace-nowrap w-full partner_marquee_wrapper">
          {partnersList.map((el) => {
            return (
              <div
                key={el.title}
                className="grid place-items-center partner_img_wrapper bg-white"
              >
                <Image
                  key={el.title}
                  src={el.img}
                  alt={el.title}
                  height={60}
                  className="object-contain mx-10 inline-block"
                />
              </div>
            )
          })}
        </div>
        <div className="flex shrink-0 justify-between items-center whitespace-nowrap w-full partner_marquee_wrapper">
          {partnersList.map((el) => {
            return (
              <div
                key={el.title}
                className="grid place-items-center partner_img_wrapper bg-white"
              >
                <Image
                  key={el.title}
                  src={el.img}
                  alt={el.title}
                  height={60}
                  className="object-contain mx-10 inline-block"
                />
              </div>
            )
          })}
        </div>
      </div>
      {/* <div className="logos relative bg-white py-6 overflow-hidden whitespace-nowrap">
        <div className="logos-slide inline-block">
          {partnersList.map((el) => {
            return (
              <Image
                key={el.title}
                src={el.img}
                alt={el.title}
                height={60}
                className="object-contain mx-10 inline-block"
              />
            )
          })}
        </div>
        <div className="logos-slide inline-block">
          {partnersList.map((el) => {
            return (
              <Image
                key={el.title}
                src={el.img}
                alt={el.title}
                height={60}
                className="object-contain mx-10 inline-block"
              />
            )
          })}
        </div>
      </div> */}
    </div>
  )
}

export default PartnersComponent
