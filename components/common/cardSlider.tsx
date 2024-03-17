import React, { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import SwiperType from "swiper";
import dynamic from "next/dynamic";
import { IContentHome } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

const SectionTitleComponent = dynamic(() => import("./sectionTitle"), {
  ssr: false,
});

interface CardSliderProps {
  title: string;
  desc: string;
  data: IContentHome[];
  slugPath: string;
}

const CardSliderComponent = ({
  title,
  desc,
  data,
  slugPath,
}: CardSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType>();
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="bg-primary py-6 md:py-8 relative bg-[url('/svgs/bg.svg')] bg-no-repeat bg-contain bg-right">
      <div className="max-w-7xl w-10/12 md:w-full mx-auto">
        <SectionTitleComponent
          title={title}
          desc={desc}
          titleClass="text-white"
          descClass="text-white/70"
        />
        <br />
        <Swiper
          ref={swiperRef}
          onSlideChange={() => {}}
          onSwiper={(s) => {
            setSwiper(s);
          }}
          slidesPerView={3}
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
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
          {data.map((d, i) => (
            <SwiperSlide key={d.title}>
              <article className="grid place-items-end mt-4 mx-2 md:mx-0 min-h-40">
                <div className={`rounded-lg group transition-all bg-white`}>
                  <div className="w-full min-h-[270px] relative">
                    <Image
                      alt={d.title}
                      src={d.image}
                      fill
                      className={`object-cover object-center rounded h-full w-full`}
                    />
                  </div>
                  <Link href={`/${slugPath}/${d.slug}`}>
                    <div className="p-4 sm:p-6">
                      <h3 className={`text-lg font-bold line-clamp-2`}>
                        {d.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm/relaxed">
                        {d.overview}
                      </p>

                      <p className="group mt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:text-primary  relative">
                        <span className="absolute -bottom-1 left-0 bg-black group-hover:bg-primary w-8 h-1 rounded-full" />{" "}
                        Read more
                        <span
                          aria-hidden="true"
                          className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                        >
                          &rarr;
                        </span>
                      </p>
                    </div>
                  </Link>
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
              className="md:w-12 md:h-12 h-7 w-7 rotate-180  fill-white transition-all duration-300 transform"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
            </svg>
          </button>
          <button onClick={() => swiper?.slideNext()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="md:w-12 md:h-12 h-7 w-7 fill-white transition-all duration-300 transform"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSliderComponent;
