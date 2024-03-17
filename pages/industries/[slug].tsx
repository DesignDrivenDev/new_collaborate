import { GetStaticPaths } from "next"
import { queryClient } from "@/utils/graphql-client"
import { serviceDetailsGql, servicesNameGql } from "@/graphql/services"
import { ICaseStudiesRelated, IIndustry } from "@/utils/types"
import Image from "next/image"
import dynamic from "next/dynamic"
import { relatedCaseStudiesGql } from "@/graphql/case-studies"
import bg from "@/public/svgs/rhombus.svg"
import { industriesNameGql, industryDetailsGql } from "@/graphql/industries"
import TableOfContents from "@/components/tableofcontents/TableOfContents"
import { RichText } from "@graphcms/rich-text-react-renderer"
import SolidColorTextHeader from "@/components/common/solidColorTextHeader"

const SectionTitleComponent = dynamic(
  () => import("../../components/common/sectionTitle"),
  {
    ssr: false,
  }
)

const IndustryDetailsPage = ({
  data,
  caseStudies,
}: {
  data?: IIndustry
  caseStudies: ICaseStudiesRelated[]
}) => {
  const Industry = data
  if (!Industry) {
    return <>Loading...</>
  }

  return (
    <div>
      <div>
        <SolidColorTextHeader title={data?.title} imgSrc={data?.image?.url} />
        {/* <div
          className={`relative isolate overflow-hidden h-[40vh] md:h-[70vh] grid place-items-center bg-primary`}
        >
          <Image
            src={Industry?.image?.url ?? ""}
            alt={Industry?.title ?? ""}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 -z-10 h-full w-full"
          />
        </div> */}
        <div className="relative">
          <div className="opacity-80 absolute -left-[1400px] -bottom-[200px] -z-10">
            <Image src={bg} alt="" />
          </div>

          <div className="max-w-7xl mx-auto w-11/12 py-12">
            {/* <SectionTitleComponent
              title={Industry?.title}
              titleClass="!text-left !text-primary !text-3xl"
            /> */}
            <br />
            <div className="flex gap-10">
              <div className="hidden lg:block w-1/5 sticky top-24 self-start z-10">
                <TableOfContents />
              </div>
              <div className="w-full lg:w-4/5 flex flex-col gap-4 h-full relative partitionline">
                <h3
                  id="Overview"
                  className="text-black font-semibold text-2xl scroll-mt-32"
                >
                  {"Overview"}
                </h3>
                <p className="prose prose-teal space-y-3 w-full">
                  {Industry?.overview.toString()}
                </p>
                <br />
                <h3
                  id="Industry Growth and Future"
                  className="text-black font-semibold text-2xl scroll-mt-32"
                >
                  {"Industry Growth and Future"}
                </h3>
                <p className="prose prose-teal space-y-3 w-full">
                  <RichText
                    content={Industry?.growthAndFuture?.raw?.children}
                  />
                </p>
                <br />
                <h3
                  id="Industry Challenges"
                  className="text-black font-semibold text-2xl scroll-mt-32"
                >
                  {"Industry Challenges"}
                </h3>
                <p className="prose prose-teal space-y-3 w-full">
                  <RichText content={Industry?.challenges?.raw?.children} />
                </p>
                <br />
                <h3
                  id="How Collaborate Solutions Can Help?"
                  className="text-black font-semibold text-2xl scroll-mt-32"
                >
                  {"How Collaborate Solutions Can Help?"}
                </h3>
                <p className="prose prose-teal space-y-3 w-full">
                  <RichText
                    content={
                      Industry?.howCollaborateSolutionsCanHelp?.raw?.children
                    }
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndustryDetailsPage

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await queryClient.request<{ industries: any }>(
      industriesNameGql
    )

    return {
      paths: res?.industries?.map((service: any) => ({
        params: { slug: service.slug },
      })),
      fallback: "blocking",
    }
  } catch (error) {
    console.log(error)
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}

export async function getStaticProps({ params }: { params: any }) {
  try {
    const s = await queryClient.request<{ industries: IIndustry[] }>(
      industryDetailsGql,
      {
        slug: params.slug,
      }
    )

    const c = await queryClient.request<{ caseStudies: ICaseStudiesRelated[] }>(
      relatedCaseStudiesGql
    )

    if (s.industries.length === 0) {
      return {
        props: { data: undefined, caseStudies: c.caseStudies ?? [] },
        notFound: true,
      }
    }

    return {
      props: { data: s.industries[0], caseStudies: c.caseStudies ?? [] },
      revalidate: 10,
    }
  } catch (error) {
    console.log(error)
    return {
      props: { data: undefined, caseStudies: [] },
      notFound: true,
    }
  }
}
