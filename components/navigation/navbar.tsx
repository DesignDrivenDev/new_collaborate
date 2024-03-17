import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ICountriesName, IServiceAndIndustryName } from "@/utils/types";

import logo from "../../assets/logo.png";
import { navMenuLinks } from "@/utils/common";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useCycle,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { MenuToggle } from "../common/menuToggle";
import { useDisableBodyScroll } from "@/hooks/use-disable-scroll";
import MobileDropdownMenuItem from "../common/mobileDropdownMenuItem";

const DropdownMenuItem = dynamic(
  () => import("@/components/common/drodownMenuItem"),
  { ssr: false }
);

const MainNavbar = ({
  services,
  industries,
  countries,
}: {
  services: IServiceAndIndustryName[];
  industries: IServiceAndIndustryName[];
  countries: ICountriesName[];
}) => {
  const router = useRouter();
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isServicesVisibleMobile, setIsServicesVisibleMobile] = useState(false);
  const [isIndustryVisible, setIsIndustryVisible] = useState(false);
  const [isIndustryVisibleMobile, setIsIndustryVisibleMobile] = useState(false);

  const [isCareersVisible, setIsCareersVisible] = useState(false);
  const [isCareersVisibleMobile, setIsCareersVisibleMobile] = useState(false);

  const [navHidden, setNavHidden] = useState(false);
  const [navTransparent, setNavTransparent] = useState(true);
  const { scrollY } = useScroll();

  const [isOpen, toggleOpen] = useCycle(false, true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > (previous ?? 0) && latest > 80) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }

    if (latest > 80) {
      setNavTransparent(false);
    } else {
      setNavTransparent(true);
    }
  });

  useDisableBodyScroll(isOpen);

  const isCurrentActive = (name: string): boolean => {
    switch (router.pathname) {
      case "/":
        return name === "Home";
      case "/about":
        return name === "About";
      case "/contact":
        return name === "Contact";
      case "/blogs":
        return name === "Blogs";
      case "/blogs/[slug]":
        return name === "Blogs";
      case "/case-studies":
        return name === "Case Studies";
      case "/case-studies/[slug]":
        return name === "Case Studies";

      default:
        return false;
    }
  };

  return (
    <motion.nav
      variants={{
        visible: {
          y: 0,
        },
        hidden: {
          y: "-100%",
        },
      }}
      animate={navHidden ? "hidden" : "visibel"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`py-3 md:py-4 fixed w-screen z-[55] left-0 right-0 mx-auto px-2 xl:px-0 ${
        navTransparent &&
        router.pathname !== "/about" &&
        router.pathname !== "/industry-option-2"
          ? "bg-transparent"
          : "bg-primary shadow-sm"
      }`}
    >
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <div className="flex items-center w-max">
          <Link
            className="block text-2xl lg:text-4xl font-bold whitespace-nowrap"
            href="/"
          >
            <span className="sr-only">Home</span>
            <div className="flex justify-start items-center relative w-40 h-14 md:w-44 md:h-20">
              <Image
                src={logo}
                alt="collaborate solutions"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="lg:flex lg:items-center lg:gap-8 hidden">
          {navMenuLinks.map((el, idx) => {
            if (el.href === "") {
              return (
                <DropdownMenuItem
                  key={el.name}
                  data={el.name === "Services" ? services : industries}
                  // data={
                  //   el.name === "Services"
                  //     ? services
                  //     : el.name === "Careers"
                  //     ? countries
                  //     : industries
                  // }
                  title={el.name}
                  isVisible={
                    el.name === "Services"
                      ? isServicesVisible
                      : isIndustryVisible
                  }
                  setVisible={
                    el.name === "Services"
                      ? setIsServicesVisible
                      : setIsIndustryVisible
                  }
                />
              );
            }
            return (
              <Link key={el.name} href={el.href}>
                <p className={`text-white hover:text-white/70`}>{el.name}</p>
              </Link>
            );
          })}
          <div>
            <DropdownMenuItem
              data={countries}
              title="Careers"
              key={"careers"}
              isVisible={isCareersVisible}
              setVisible={setIsCareersVisible}
            />
          </div>
        </div>

        {/* Toggle */}
        <motion.div
          className="absolute right-5 lg:hidden z-[110]"
          animate={isOpen ? "open" : "closed"}
        >
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.div>

        {/* Mobile Menu Overlay */}
        <motion.div
          variants={{
            open: {
              width: "100vh",
              height: "100vh",
              clipPath: "inset(0% 0% 0% 0%)",
            },
            closed: {
              // width: 0,
              // height: 0,
              clipPath: "inset(0% 0% 0% 100%)",
            },
          }}
          className="absolute top-0 left-0 w-screen h-screen bg-primary z-[100] flex flex-col justify-between items-start"
          animate={isOpen ? "open" : "closed"}
          initial={"closed"}
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            clipPath: "inset(0% 0% 0% 100%)",
          }}
        >
          <div className="h-full w-screen mt-16 flex flex-col justify-between items-start">
            <p className="text-xs text-white/40 p-2 w-11/12 mx-auto font-light">
              NAVIGATION
            </p>
            <div className="flex flex-col w-full">
              <motion.ul
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
                animate={isOpen ? "open" : "closed"}
                className="w-full h-[80vh] overflow-y-scroll mobile_nav_overlay"
              >
                {navMenuLinks.map((i, idx) => {
                  if (i.href === "") {
                    return (
                      <MobileDropdownMenuItem
                        key={i.name}
                        data={i.name === "Services" ? services : industries}
                        isCurrentActive={isCurrentActive}
                        isVisible={
                          i.name === "Services"
                            ? isServicesVisibleMobile
                            : i.name === "Industries"
                            ? isIndustryVisibleMobile
                            : false
                        }
                        setVisible={
                          i.name === "Services"
                            ? setIsServicesVisibleMobile
                            : setIsIndustryVisibleMobile
                        }
                        title={i.name}
                        toggleOpen={toggleOpen}
                      />
                    );
                  }
                  return (
                    <motion.li
                      key={i.name}
                      variants={{
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { stiffness: 1000, velocity: -100 },
                          },
                        },
                        closed: {
                          y: 50,
                          opacity: 0,
                          transition: {
                            y: { stiffness: 1000 },
                          },
                        },
                      }}
                      className={`${
                        isCurrentActive(i.name) ? "active" : "inactive"
                      }`}
                    >
                      <div className="p-2 w-11/12 my-3 mx-auto hover:cursor-pointer">
                        <p
                          className={`text-white text-2xl`}
                          onClick={() => {
                            router.push(i.href);
                            toggleOpen();
                          }}
                        >
                          {i.name}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
                <div>
                  <MobileDropdownMenuItem
                    toggleOpen={toggleOpen}
                    isCurrentActive={isCurrentActive}
                    data={countries}
                    title="Careers"
                    key={"careers"}
                    isVisible={isCareersVisibleMobile}
                    setVisible={setIsCareersVisibleMobile}
                  />
                </div>
              </motion.ul>
            </div>
            <div className="h-full w-screen flex flex-col items-center justify-center">
              <p className="py-4 text-white/50 text-sm font-light">
                Copyright © 2017 Collaborate Solutions Inc.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default MainNavbar;
