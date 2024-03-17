import React, { useState } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import SwiperType from "swiper"
import dynamic from "next/dynamic"
import slntbg from "@/public/svgs/slantIcon.svg"
import bg from "@/public/svgs/rhombus.svg"
import { IContentHome } from "@/utils/types"

const SectionTitleComponent = dynamic(() => import("../common/sectionTitle"), {
  ssr: false,
})

const BlogsComponent = ({ blogs }: { blogs: IContentHome[] }) => {
  const [swiper, setSwiper] = useState<SwiperType>()

  return (
    <div className="relative">
      <div className="absolute -left-[1500px] -bottom-[400px] -z-10">
        <Image src={bg} alt="" />
      </div>
      <div className="absolute bg-secondary right-0 top-0 h-full w-full md:w-[60%] -z-20"></div>
      <div className="absolute right-4 bottom-8">
        <Image src={slntbg} alt="" className="w-40 h-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 py-8 md:py-16 gap-12 md:gap-0">
        <div
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          className="grid place-items-center h-fit my-auto w-11/12 mx-auto bg-primary text-white rounded-3xl py-5 md:py-20"
        >
          <div className="max-w-2xl mx-auto p-5">
            <SectionTitleComponent
              title={"Blogs & Resources"}
              desc={
                "Knowledge and Technology Insights that brings to you the best practices and resources that really Matter."
              }
              titleClass="!text-left"
              descClass="!text-left !text-white/70"
            />
            <div className="mt-4 relative">
              <span className="absolute -bottom-1 left-0 bg-white/80 w-10 h-1"></span>
              <Link
                href={"/blogs"}
                className={`text-sm md:text-lg text-white/80 font-bold`}
              >
                View All Blogs
              </Link>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-easing="ease-in-sine"
          className="w-11/12 mx-auto md:w-full"
        >
          <Swiper
            onSwiper={setSwiper}
            slidesPerView={1}
            spaceBetween={0}
            // modules={[Navigation]}
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
            {blogs.map((blog: IContentHome, i: number) => (
              <SwiperSlide key={i}>
                <div
                  key={i}
                  className={`grid place-items-center h-full mx-auto text-black`}
                >
                  <div>
                    <div
                      //   data-aos="fade-left"
                      //   data-aos-easing="ease-in-sine"
                      className="w-full md:w-full h-[28vh] md:h-[36vh] relative"
                    >
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="rounded-l-[3rem] md:rounded-l-[3rem] object-cover w-full h-full"
                      />
                    </div>
                    {/* <img
                      src={blog?.image.url}
                      width={300}
                      height={400}
                      alt=""
                      className=" h-80 w-full object-cover rounded-l-[3rem]"
                    /> */}
                    <div className="py-5">
                      <h2 className="text-xl md:text-2xl font-bold">
                        {blog?.title}
                      </h2>
                      {/* <p className="py-2.5 md:py-5 opacity-75">
                        {blog?.shortDescription}
                      </p> */}

                      {/* <div className="font-bold text-xl hover:text-primary pt-5">
                        <Link href={`/blogs/${blog.slug}`}>Read more</Link>
                      </div> */}
                      <div className={`relative py-1.5 md:py-3`}>
                        <span className="absolute bottom-[0.25rem] left-0 bg-primary w-8 h-0.5"></span>
                        <Link href={`/blogs/${blog.slug}`}>
                          <p className="group mt-4 inline-flex items-center gap-1 text-base md:text-lg font-bold hover:text-primary/80  relative">
                            Read More
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex gap-x-8 pt-5">
            <button onClick={() => swiper?.slidePrev()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="md:w-12 md:h-12 h-8 w-8 rotate-180  hover:fill-primary transition-all duration-300 transform"
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

export default BlogsComponent
