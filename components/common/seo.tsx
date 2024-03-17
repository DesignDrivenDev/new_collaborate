import Head from "next/head";
import { StaticImageData } from "next/image";
import React from "react";

interface ISEO {
  title: string;
  description: string;
  href: string;
  imgSrc?: any;
}

const SEO = ({ title, description, href, imgSrc }: ISEO) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={href} />
        <meta
          name="keywords"
          content="collaborate , cloud, SAP, databricks, microsoft technologies, ML,AI"
        />
        {/* OG Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:url" content={href} />
        <meta property="og:image" content={imgSrc && imgSrc} />
        <meta property="og:type" content="business" />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:url" content={href} />
        <meta property="twitter:image" content={imgSrc} />
      </Head>
    </>
  );
};

export default SEO;
