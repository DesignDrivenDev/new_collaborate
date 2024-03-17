import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { IServiceAndIndustryName } from "@/utils/types";
import { queryClient } from "@/utils/graphql-client";
import { servicesNameGql } from "@/graphql/services";
import { industriesNameGql } from "@/graphql/industries";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { countriesNameGql } from "@/graphql/career-country";

const MainLayout = dynamic(() => import("@/components/common/layout"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const [services, setServices] = useState<IServiceAndIndustryName[]>([]);
  const [industries, setIndustries] = useState<IServiceAndIndustryName[]>([]);
  const [countries, setCountries] = useState<IServiceAndIndustryName[]>([]);

  useEffect(() => {
    const fetchFunc = async () => {
      const s: { services: { title: string; slug: string }[] } =
        await queryClient.request(servicesNameGql);

      if (s?.services) {
        setServices(
          s.services.map((el) => ({
            name: el.title,
            href: `/services/${el.slug}`,
          }))
        );
      }

      const i: { industries: { title: string; slug: string }[] } =
        await queryClient.request(industriesNameGql);

      if (i?.industries) {
        setIndustries(
          i.industries.map((el) => ({
            name: el.title,
            href: `/industries/${el.slug}`,
          }))
        );
      }

      // country name for careers
      const c: { careerCountries: { title: string; slug: string }[] } =
        await queryClient.request(countriesNameGql);

      if (c?.careerCountries) {
        setCountries(
          c.careerCountries.map((el) => ({
            name: el.title,
            href: `/careers/${el.slug}`,
          }))
        );
      }
    };
    fetchFunc();
  }, []);

  return (
    <MainLayout
      services={services}
      industries={industries}
      countries={countries}
    >
      <>
        <Head>
          <title>
            {
              "Best Technology Consulting & Technology Solutions Firm in Massachusetts."
            }
          </title>
          <meta
            name="description"
            content={
              "Collaborate Solutions is at the forefront of technological innovation and offers a wide range of Digital Enterprise Services that include Databricks, SAP, Microsoft Technologies, Service Now, ML & AI, Cybersecurity and Cloud Services."
            }
          />
          <meta
            name="keywords"
            content="collaborate , cloud, SAP, databricks, microsoft technologies, ML,AI"
          />
          {/* OG Tags */}
          <meta
            property="og:title"
            content={
              "Best Technology Consulting & Technology Solutions Firm in Massachusetts"
            }
          />
          <meta
            property="og:url"
            content={`https://collaboratesolutions.com/`}
          />
          <meta property="og:image" content="image" />
          <meta property="og:type" content="business" />
          <meta
            property="og:description"
            content={
              "Collaborate Solutions is at the forefront of technological innovation and offers a wide range of Digital Enterprise Services that include Databricks, SAP, Microsoft Technologies, Service Now, ML & AI, Cybersecurity and Cloud Services."
            }
          />
          <meta name="twitter:card" content="summary" />
          <meta
            property="twitter:title"
            content={
              "Best Technology Consulting & Technology Solutions Firm in Massachusetts"
            }
          />
          <meta
            property="twitter:description"
            content={
              "Collaborate Solutions is at the forefront of technological innovation and offers a wide range of Digital Enterprise Services that include Databricks, SAP, Microsoft Technologies, Service Now, ML & AI, Cybersecurity and Cloud Services."
            }
          />
          <meta
            property="twitter:url"
            content={`https://collaboratesolutions.com/`}
          />
          <meta property="twitter:image" content="image" />
        </Head>
        <Toaster />
        <NextNProgress />
        <Component {...pageProps} />
      </>
    </MainLayout>
  );
}
