import React, { useRef, useState } from "react"

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import SwiperType from "swiper"
import dynamic from "next/dynamic"

import Link from "next/link"
import Image from "next/image"
import slantbg from "@/public/svgs/slantShape.svg"
import { IContentHome } from "@/utils/types"

const SectionTitleComponent = dynamic(() => import("../common/sectionTitle"), {
  ssr: false,
})

const CaseStudiesComponent = ({
  caseStudies,
}: {
  caseStudies: IContentHome[]
}) => {
  const [swiper, setSwiper] = useState<SwiperType>()
  const swiperRef = useRef<SwiperRef>(null)

  return (
    <div className="py-6 md:py-8 mx-auto relative">
      <div className="absolute top-4 left-12">
        <Image src={slantbg} alt="" className="h-40 w-40" />
      </div>
      <div className="max-w-7xl w-10/12 md:w-full mx-auto">
        <SectionTitleComponent
          title="Case Studies"
          desc="Outcomes that deliver long term value! Check out the impact our services have delivered for our clients."
          descClass="text-black/70"
        />
      </div>
      <br />
      <div className="md:py-8">
        <Swiper
          ref={swiperRef}
          onSwiper={setSwiper}
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
        >
          {caseStudies.map((ind, i) => (
            <SwiperSlide key={i} className="">
              <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-12 md:gap-0 px-5 md:px-0">
                <div
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  className="grid place-items-cente max-w-lg mx-auto"
                >
                  <div className="flex flex-col justify-center">
                    <div>
                      <h2 className={`text-lg md:text-3xl font-bold`}>
                        {ind?.title}
                      </h2>

                      <div className="py-3 md:py-6">
                        <p className="text-sm md:text-lg line-clamp-3">
                          {ind?.overview}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/case-studies/${ind?.slug}`}
                      className="text-sm font-semibold leading-6 text-primary border border-primary px-3 py-2 rounded transition-all duration-300 ease-in-out w-max"
                    >
                      Read More <span aria-hidden="true">→</span>
                    </Link>
                    {/* <Link href={`/case-studies/${ind?.slug}`}>
                      <span
                        className={`font-bold text-2xl hover:text-primary ${HeadFont.className}`}
                      >
                        Read our success story
                      </span>
                    </Link> */}
                  </div>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                  className="w-full md:w-[80%] h-[30vh] md:h-[46vh] relative"
                >
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    className="rounded-[3rem] md:rounded-l-[3rem] object-cover w-full h-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex gap-4 justify-center items-center md:pt-16 py-5">
          <button onClick={() => swiper?.slidePrev()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="md:w-12 md:h-12 h-8 w-8 rotate-180 hover:fill-primary transition-all duration-300 transform"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
            </svg>
          </button>
          <button onClick={() => swiper?.slideNext()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="md:w-12 md:h-12 h-8 w-8 hover:fill-primary transition-all duration-300 transform"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaseStudiesComponent
