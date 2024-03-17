import { ITestimonials } from "@/utils/types";
import React, { useRef, useState } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperType from "swiper";

import Image from "next/image";
const TestimonialsSlider = ({
  testimonials,
}: {
  testimonials: ITestimonials[];
}) => {
  const [swiper, setSwiper] = useState<SwiperType>();
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl w-11/12 mx-auto">
        <Swiper
          ref={swiperRef}
          onSlideChange={() => {}}
          onSwiper={(s) => {
            setSwiper(s);
          }}
          slidesPerView={3}
          spaceBetween={20}
          //   centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          // loop={true}
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
            840: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {testimonials.map((test) => (
            <SwiperSlide key={test.name}>
              <article className="grid place-items-end mt-4 mx-2 md:mx-0 min-h-[350px] border-2 border-primary rounded-xl">
                <div className={`rounded-lg transition-all p-4 sm:p-6`}>
                  <p className="text-lg/relaxed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                    </svg>
                    {test.review}
                  </p>
                  <div className="text-right pt-3">
                    <p className={`text-lg font-bold `}>{test.name}</p>
                    <p className="text-black/70 text-sm">{test.designation}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center items-center gap-x-8 pt-8">
          <button onClick={() => swiper?.slidePrev()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="md:w-9 md:h-10 h-7 w-7 rotate-180 fill-black hover:fill-primary transition-all duration-300 transform"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
            </svg>
          </button>
          <button onClick={() => swiper?.slideNext()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="md:w-9 md:h-10 h-7 w-7 fill-black hover:fill-primary transition-all duration-300 transform"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
