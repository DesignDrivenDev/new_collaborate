import React, { ReactElement, useEffect } from "react";
import AOS from "aos";
import { ICountriesName, IServiceAndIndustryName } from "@/utils/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos/dist/aos.css";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const MainNavbar = dynamic(() => import("../navigation/navbar"), {
  ssr: false,
});
const MainFooter = dynamic(() => import("../navigation/footer"), {
  ssr: false,
});

const sourceSans = localFont({
  src: [
    {
      path: "../../public/fonts/SourceSansPro-Bold.ttf",
      // path: "../../public/fonts/Gotham-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SourceSansPro-Regular.ttf",
      // path: "../../public/fonts/GothamMedium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SourceSansPro-SemiBold.ttf",
      // path: "../../public/fonts/GothamMedium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SourceSansPro-Regular.ttf",
      // path: "../../public/fonts/Gotham-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-sans-pro",
});

const MainLayout = ({
  services,
  industries,
  countries,
  children,
}: {
  services: IServiceAndIndustryName[];
  industries: IServiceAndIndustryName[];
  countries: ICountriesName[];
  children: ReactElement;
}) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <main
      className={`w-full flex min-h-screen flex-col ${sourceSans.variable} font-sansPro`}
    >
      <MainNavbar
        services={services}
        industries={industries}
        countries={countries}
      />
      {/* The below condition is used because toaster component overflows the main screen and we need to set overflow hidden but in about page we are using sticky heading for our journey and our team which needs overflow unset */}
      <article
        className={`flex-grow ${
          router.pathname === "/about" ||
          router.pathname === "/case-studies" ||
          router.pathname.includes("industries")
            ? ""
            : ""
          // overflow-hidden
        }`}
      >
        {children}
      </article>
      <MainFooter services={services} industries={industries} />
    </main>
  );
};

export default MainLayout;
