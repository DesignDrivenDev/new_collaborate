import { TypeAnimation } from "react-type-animation"

const HeroComponent = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden p-8 md:p-12">
      <div className="z-30 flex justify-start items-center max-w-7xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-white md:whitespace-pre-wrap leading-[3rem] md:leading-[4.2rem] w-full">
          {"Technology Solutions \nthat "}
          <TypeAnimation
            sequence={[
              " Drive Growth...",
              1000,
              " Deliver Impact...",
              1000,
              " Drive Transformation...",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="bg-white bg-opacity-70 backdrop-blur-lg text-primary p-2 rounded-md"
          />
        </h1>
      </div>
      <div className="absolute min-h-full w-screen bg-black bg-opacity-30 z-20" />
      <video
        playsInline={true}
        autoPlay={true}
        muted={true}
        loop={true}
        className="absolute z-10 w-screen min-w-full min-h-full max-w-none object-cover object-center"
      >
        <source src="/home_bg_vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default HeroComponent
