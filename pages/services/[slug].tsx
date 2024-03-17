import { GetStaticPaths } from "next"
import { queryClient } from "@/utils/graphql-client"
import { serviceDetailsGql, servicesNameGql } from "@/graphql/services"
import { ICaseStudiesRelated, IService } from "@/utils/types"
import Image from "next/image"
import dynamic from "next/dynamic"
import { relatedCaseStudiesGql } from "@/graphql/case-studies"
import Link from "next/link"
import SolidColorTextHeader from "@/components/common/solidColorTextHeader"

const SectionTitleComponent = dynamic(
  () => import("../../components/common/sectionTitle"),
  {
    ssr: false,
  }
)

const ServiceDetailsPage = ({
  data,
  caseStudies,
}: {
  data?: IService
  caseStudies: ICaseStudiesRelated[]
}) => {
  const service = data
  if (!service) {
    return <>Loading...</>
  }

  return (
    <div className="">
      <SolidColorTextHeader title={data?.title} imgSrc={data?.image?.url} />
      {/* <div>
        <div
          className={`relative isolate overflow-hidden h-[40vh] md:h-[70vh] grid place-items-center`}
        >
          <Image
            src={service?.image?.url ?? ""}
            alt={service?.title ?? ""}
            fill
            objectFit="cover"
            className="absolute inset-0 -z-10 h-full w-full"
          />
        </div>
      </div> */}

      <div className="pt-12">
        <div className="max-w-4xl w-11/12 mx-auto text-center">
          <SectionTitleComponent title={service.title} />
          <p className="pt-4 md:pt-8 text-lg">{service?.overview}</p>
        </div>

        <div className="max-w-full w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 py-12 gap-12">
            <div className="grid place-items-center bg-secondary p-8 service-right">
              <Image
                src={service?.needImage.url}
                alt=""
                width={600}
                height={400}
                className="rounded-xl object-cover"
              />
            </div>
            <div className="grid place-items-center">
              <div>
                <SectionTitleComponent
                  title={`Why is ${service?.title} needed?`}
                />
                <p className="text-lg pt-4">{service?.whyWeNeed}</p>
              </div>
            </div>
          </div>
          {/* help */}
          <div className="grid grid-cols-1 md:grid-cols-2 py-12 gap-12">
            <div className="grid place-items-center order-2 md:order-none">
              <div>
                <SectionTitleComponent title="How we can help?" />
                <p className="text-lg pt-4">{service.howWeCanHelp}</p>
              </div>
            </div>
            <div className="grid place-items-center service-left p-8 order-1 md:order-none">
              <Image
                src={service?.howCanWeHelpImage.url}
                alt=""
                width={600}
                height={400}
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 py-12 gap-12">
            <div className="grid place-items-center p-8 service-right">
              <Image
                src={service?.outcomeImage.url}
                alt=""
                width={600}
                height={400}
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="grid place-items-center">
              <div>
                <SectionTitleComponent title="What to Expect" />
                <p className="text-lg pt-4">{service?.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 pb-12">
        <div className="text-center">
          <SectionTitleComponent title="Case Studies" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 max-w-7xl mx-auto">
          {caseStudies.map((caseStudy: ICaseStudiesRelated, index: number) => (
            <div className="w-full col-span-1" key={caseStudy?.title}>
              <div className="md:h-[28vh] w-full relative">
                <Image
                  src={caseStudy.mainImage.url}
                  alt={caseStudy?.title}
                  fill
                  className="object-cover object-center rounded-md"
                />
              </div>
              <Link href={`/case-studies/${caseStudy?.slug}`}>
                <p className="text-xl text-primary py-2 line-clamp-2">
                  {caseStudy?.title}
                </p>
              </Link>
              <p className=" line-clamp-2 text-gray-500">
                {caseStudy.overview}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailsPage

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await queryClient.request<{ services: any }>(servicesNameGql)

    return {
      paths: res?.services?.map((service: any) => ({
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
    const s = await queryClient.request<{ services: IService[] }>(
      serviceDetailsGql,
      {
        slug: params.slug,
      }
    )

    const c = await queryClient.request<{ caseStudies: ICaseStudiesRelated[] }>(
      relatedCaseStudiesGql
    )

    if (s.services.length === 0) {
      return {
        props: { data: undefined, caseStudies: c.caseStudies ?? [] },
        notFound: true,
      }
    }

    return {
      props: { data: s.services[0], caseStudies: c.caseStudies ?? [] },
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
