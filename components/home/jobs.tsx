import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import SwiperType from "swiper"
import bg from "@/public/svgs/rhombus.svg"
import { IContentHome } from "@/utils/types"
import home_hiring from "../../assets/home_hiring.webp"

const JobsComponent = ({ jobs }: { jobs: IContentHome[] }) => {
  const [swiper, setSwiper] = useState<SwiperType>()
  return (
    <div className="relative overflow-hidden z-0">
      <div className="absolute -right-[900px] -bottom-[300px] md:-bottom-[400px] -z-10">
        <Image src={bg} alt="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 max-w-full w-11/12 mx-auto py-8 md:py-16">
        <div className="hidden md:block col-span-1"></div>
        <div className="text-primary py-10 col-span-1 md:col-span-3">
          <div className=" font-bold">
            <h3 className="text-2xl lg:text-4xl">We Are</h3>
            <h2 className="text-4xl lg:text-7xl">Hiring</h2>
          </div>
          <p className="text-base mt-2">
            Join the team that delivers time and again!
          </p>

          <div className="mt-4 relative">
            <span className="absolute -bottom-1 left-0 bg-primary w-10 h-1"></span>
            <Link
              href={"/careers"}
              className={`text-sm md:text-xl text-primary/90 font-bold`}
            >
              View All Jobs
            </Link>
          </div>
        </div>
        <div className="h-80 w-full col-span-1 md:col-span-5 relative">
          <Image
            src={home_hiring}
            alt="Hiring"
            fill
            className="w-full h-full object-cover object-top rounded-3xl"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 max-w-full w-11/12 mx-auto pb-8 md:pb-16">
        <div className="col-span-1 md:col-span-4">
          <Swiper
            onSwiper={setSwiper}
            slidesPerView={2.5}
            spaceBetween={10}
            freeMode={true}
            // grabCursor
            // pagination={{
            //   clickable: true,
            // }}
            modules={[FreeMode]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              480: {
                slidesPerView: 1.5,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 15,
              },
            }}
          >
            {jobs.map((data) => (
              <SwiperSlide key={data.title}>
                <div className=" bg-primary text-white rounded-3xl h-auto max-h-40 flex items-center px-8 py-4 md:py-8">
                  <div>
                    <h2 className="text-base md:text-2xl pb-1.5 md:pb-2.5">
                      {data.title}
                    </h2>
                    <p className="text-xs md:text-base text-white/80">
                      Work location: {data.overview}
                    </p>
                    <div className={`relative py-1.5 md:py-3`}>
                      <span className="absolute bottom-[0.27rem] left-0 bg-secondary w-8 h-0.5"></span>
                      <Link href={`/careers/${data.slug}`}>
                        <p className="group mt-4 inline-flex items-center gap-1 text-sm md:text-sm font-bold hover:text-white/80  relative">
                          Apply Now
                          <span
                            aria-hidden="true"
                            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                          >
                            &rarr;
                          </span>
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-1 grid place-items-center">
          <div className="flex gap-x-8 pt-5">
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
    </div>
  )
}

export default JobsComponent
