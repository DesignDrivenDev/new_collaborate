import { IServiceAndIndustryName } from "@/utils/types";
import { useRouter } from "next/router";
import ChevronDown from "../icons/chev_down";
import { motion } from "framer-motion";

const DropdownMenuItem = ({
  data,
  title,
  isVisible,
  setVisible,
}: {
  data: IServiceAndIndustryName[];
  title: string;
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <p
      className={`text-white hover:text-white/70 cursor-pointer relative flex gap-2 py-2 justify-center items-center`}
      onMouseEnter={(e) => setVisible(true)}
      onMouseLeave={(e) => setVisible(false)}
    >
      <>
        {title}
        <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
      </>
      <motion.span
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.4,
            },
          },
          closed: {
            clipPath: "inset(0% 0% 100% 0%)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.2,
            },
          },
        }}
        style={{
          pointerEvents: isVisible ? "auto" : "none",
          clipPath: "inset(0% 0% 100% 0%)",
        }}
        animate={isVisible ? "open" : "closed"}
        className="min-w-44 h-auto rounded-md shadow-lg border px-4 py-3 bg-white absolute left-0 top-10 flex flex-col transition-all"
      >
        {data.map((el, idx) => {
          return (
            <span
              key={el.name}
              className={`text-black hover:text-primary py-2 ${
                idx === data.length - 1 ? "border-none" : "border-b"
              } border-gray-200 hover:border-primary/30 transition-all`}
              onClick={(e) => {
                router.push(el.href);
                setVisible(false);
              }}
            >
              {el.name}
            </span>
          );
        })}
      </motion.span>
    </p>
  );
};

export default DropdownMenuItem;
