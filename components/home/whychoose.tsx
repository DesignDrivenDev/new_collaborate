import React from "react";
import SectionTitleComponent from "../common/sectionTitle";
import Image from "next/image";

const Whychoose = () => {
  return (
    <div className="bg-gray-100/80">
      <div className="max-w-5xl w-11/12 mx-auto text-center py-12">
        <h2 className="pb-4 text-2xl md:text-3xl font-bold">
          Why Choose Collaborate
        </h2>
        <p className="font-semibold text-sm md:text-lg text-black/60">
          “Choose Collaborate Solutions for more than just technology; choose a
          reliable partner committed to your success. We combine creativity and
          intelligence to create unique solutions that move your business ahead.
          Experience the Collaborate difference now.”
        </p>
      </div>
      {/* <div className="max-w-7xl w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 py-12 gap-8">
        <div>
          <Image src={"/assets/mission.png"} width={600} height={400} alt="" />
        </div>
        <div className="grid place-items-center">
          <div>
            <h2 className="pb-4 text-2xl md:text-3xl font-bold">
              Why Choose Collaborate
            </h2>
            <p className="font-semibold text-sm md:text-lg text-black/60">
              “Choose Collaborate Solutions for more than just technology;
              choose a reliable partner committed to your success. We combine
              creativity and intelligence to create unique solutions that move
              your business ahead. Experience the Collaborate difference now.”
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Whychoose;
