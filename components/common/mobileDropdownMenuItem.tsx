import { IServiceAndIndustryName } from "@/utils/types"
import { AnimatePresence, Cycle, motion } from "framer-motion"
import { useRouter } from "next/router"
import React from "react"
import ChevronDown from "../icons/chev_down"

const MobileDropdownMenuItem = ({
  data,
  title,
  isVisible,
  toggleOpen,
  isCurrentActive,
  setVisible,
}: {
  data: IServiceAndIndustryName[]
  title: string
  isVisible: boolean
  toggleOpen: Cycle
  isCurrentActive: (elem: string) => boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()
  return (
    <motion.li
      key={title}
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
      className={`${isCurrentActive(title) ? "active" : "inactive"}`}
      onTap={() => {
        setVisible((prev) => !prev)
      }}
    >
      <div className="p-2 w-11/12 mb-3 mx-auto flex justify-between items-center">
        <p className={`text-white text-2xl`} onClick={() => {}}>
          {title}
        </p>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          animate={isVisible ? "open" : "closed"}
        >
          <ChevronDown className="w-4 h-4 text-white" strokeWidth={3} />
        </motion.div>
      </div>
      <AnimatePresence key={title} initial={false}>
        {isVisible ? (
          <motion.ul
            key={title}
            variants={{
              open: {
                height: "auto",
                opacity: 1,
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.2,
                },
              },
              closed: {
                height: 0,
                opacity: 0,
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                },
              },
            }}
            initial="closed"
            exit={"closed"}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0,
            }}
            className="w-11/12 mx-auto"
          >
            {data.map((el) => {
              return (
                <motion.li
                  key={el.name}
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
                >
                  <p
                    className={`text-white text-lg font-thin px-2`}
                    onClick={() => {
                      router.push(el.href)
                      toggleOpen()
                    }}
                  >
                    - {el.name}
                  </p>
                </motion.li>
              )
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.li>
    // <AnimatePresence initial={false}>
    //   {isVisible ? (
    //     <motion.ul
    //       variants={{
    //         open: {
    //           height: "auto",
    //           opacity: 1,
    //           transition: {
    //             staggerChildren: 0.07,
    //             delayChildren: 0.2,
    //           },
    //         },
    //         closed: {
    //           height: 0,
    //           opacity: 0,
    //           transition: {
    //             staggerChildren: 0.05,
    //             staggerDirection: -1,
    //           },
    //         },
    //       }}
    //       initial="closed"
    //       exit={"closed"}
    //       transition={{
    //         type: "spring",
    //         duration: 0.4,
    //         bounce: 0,
    //       }}
    //       className="w-11/12 mx-auto"
    //     >
    //       {data.map((el) => {
    //         return (
    //           <motion.li
    //             key={el.name}
    //             variants={{
    //               open: {
    //                 y: 0,
    //                 opacity: 1,
    //                 transition: {
    //                   y: { stiffness: 1000, velocity: -100 },
    //                 },
    //               },
    //               closed: {
    //                 y: 50,
    //                 opacity: 0,
    //                 transition: {
    //                   y: { stiffness: 1000 },
    //                 },
    //               },
    //             }}
    //           >
    //             <p
    //               className={`text-white text-lg font-thin px-2`}
    //               onClick={() => {
    //                 router.push(el.href)
    //                 toggleOpen()
    //               }}
    //             >
    //               - {el.name}
    //             </p>
    //           </motion.li>
    //         )
    //       })}
    //     </motion.ul>
    //   ) : null}
    // </AnimatePresence>
  )
}

export default MobileDropdownMenuItem
