import dynamic from "next/dynamic"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subTitle?: string
  imgSrc?: string
  roundedBottom?: boolean
  showShare?: boolean
  shareUrl?: string
}

const Share = dynamic(() => import("@/components/common/share"), {})

const SolidColorTextHeader = ({
  title,
  subTitle,
  imgSrc,
  roundedBottom = false,
  showShare = false,
  shareUrl,
}: Props) => {
  return (
    <div
      className={`w-full ${
        imgSrc ? "h-[38vh] md:h-[52vh]" : "h-[34vh] md:h-[40vh]"
      } relative bg-primary bg-no-repeat bg-center bg-cover ${
        roundedBottom ? "rounded-b-[4rem]" : ""
      }`}
      style={{ backgroundImage: imgSrc ? `url(${imgSrc})` : "none" }}
    >
      <div className="w-full h-full max-w-7xl mx-auto flex justify-center items-start flex-col px-4 md:px-0 z-20">
        <h1
          className={`text-3xl md:text-4xl max-w-4xl text-white font-bold pt-[5%] z-20`}
        >
          {title}
        </h1>
        {subTitle ? (
          <p className="text-base md:text-lg text-white/60 font-thin mt-2 z-20">
            {subTitle}
          </p>
        ) : null}
        {showShare && shareUrl ? (
          <div className="z-20 text-white flex flex-col w-full justify-center items-start">
            <br />
            <Share shareURL={shareUrl} />
          </div>
        ) : null}
      </div>
      {imgSrc ? (
        <div className="bg-black bg-opacity-40 backdrop-blur-sm z-0 absolute top-0 left-0 w-full h-full" />
      ) : null}
    </div>
  )
}

export default SolidColorTextHeader
