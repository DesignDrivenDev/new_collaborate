import Link from "next/link";
import React from "react";

type cta = {
  title: string;
  subtitle?: string;
  link?: string;
  linkName?: string;
};
const CTA = ({ title, subtitle, link, linkName }: cta) => {
  return (
    <div className="bg-primary py-12 text-white text-center">
      <div className="space-y-6 max-w-3xl mx-auto w-11/12">
        <h2 className="text-base md:text-lg">{title}</h2>
        <p>{subtitle}</p>
        <Link
          href={"/contact"}
          className="text-sm font-semibold leading-6 border border-white px-3 py-2 rounded transition-all duration-300 ease-in-out w-max"
        >
          {/* {linkName} */}
          Contact Us
          <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </div>
    </div>
  );
};

export default CTA;
