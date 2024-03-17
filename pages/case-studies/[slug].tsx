import Image from "next/image"
import dynamic from "next/dynamic"
import { RichText } from "@graphcms/rich-text-react-renderer"
import { GetStaticPaths } from "next"
import { queryClient } from "@/utils/graphql-client"
import { caseStudiesNameGql, caseStudyDetailsGql } from "@/graphql/case-studies"
import { ICaseStudyCard } from "@/utils/types"

const SectionTitleComponent = dynamic(
  () => import("@/components/common/sectionTitle"),
  {}
)
const SolidColorTextHeader = dynamic(
  () => import("@/components/common/solidColorTextHeader"),
  { ssr: false }
)
const Share = dynamic(() => import("@/components/common/share"), {})

const CaseStudyDetails = ({ data }: { data: ICaseStudyCard }) => {
  //   const { slug } = params
  //   const data: IcaseStudy = await getCaseStudyDetails(slug)
  //   if (!data) {
  //     return notFound()
  //   }
  //   const relatedCasestudy = await getRelatedCaseStudy(slug)

  return (
    <>
      <div className="">
        <SolidColorTextHeader
          title={data?.title}
          imgSrc={data?.mainImage?.url}
          shareUrl={`https://collaboratesolutions.com/case-studies/${data.slug}`}
          showShare={true}
        />
        {/* <div className="relative h-[90vh]">
          <Image
            src={data?.mainImage?.url}
            alt={data?.title}
            layout="fill"
            className="object-cover brightness-[0.38] contrast-[0.8]"
          />
          <div className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 max-w-4xl text-white font-extrabold">
            <h1 className="text-3xl md:text-5xl font-bold ">{data?.title}</h1>

            <div className="pt-5 md:pt-12">
              <Share
                shareURL={`https://collaboratesolutions.com/case-studies/${data.slug}`}
              />
            </div>
          </div>
        </div> */}
        <div className="max-w-5xl w-11/12 mx-auto py-8">
          <div>
            <SectionTitleComponent
              title="Overview"
              titleClass="!text-left text-primary"
            />
            <p className="mt-2 text-base md:text-lg">{data.overview}</p>
          </div>

          {/* about project */}
          {/* <div className="pt-8">
            <SectionTitleComponent
              title="About"
              titleClass="!text-left text-primary"
            />
          </div> */}
          <div className="prose prose-teal space-y-3 w-full mt-4">
            <RichText
              content={data?.caseStudyDetails?.raw?.children}
              renderers={{
                h3: ({ children }) => (
                  <h3 className="text-primary font-bold text-2xl md:leading-[38px] md:text-[34px] tracking-tight">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-primary font-semibold text-lg md:text-2xl tracking-tight underline underline-offset-4">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-base md:text-lg">{children}</p>
                ),
                li: ({ children }) => (
                  <li className="list-disc list-inside text-sm md:text-base">
                    {children}
                  </li>
                ),
              }}
            />
          </div>
        </div>
      </div>
      {/* {relatedCasestudy.length > 0 && (
        <section className="py-16">
          <Heading
            title="Related Case-Studies"
            textAlign="center"
            textSize="4xl"
          />
          <div className="flex justify-center items-center gap-8 flex-wrap  pt-10">
            {relatedCasestudy.map((study: IcaseStudy, index: number) => (
              <div className="max-w-sm" key={study?.title}>
                <Card
                  index={index}
                  image={study?.mainImage?.url}
                  alt={study?.title}
                  category={study?.caseStudyCategories}
                  link="case-studies"
                  slug={study?.slug}
                  title={study?.title}
                />
              </div>
            ))}
          </div>
        </section>
      )} */}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await queryClient.request<{ caseStudies: any }>(
      caseStudiesNameGql
    )

    return {
      paths: res?.caseStudies?.map((caseStudy: any) => ({
        params: { slug: caseStudy.slug },
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
    const s = await queryClient.request<{ caseStudies: ICaseStudyCard[] }>(
      caseStudyDetailsGql,
      {
        slug: params.slug,
      }
    )

    // const c = await queryClient.request<{ caseStudies: ICaseStudiesRelated[] }>(
    //   relatedCaseStudiesGql
    // )

    if (s.caseStudies.length === 0) {
      return {
        props: { data: undefined },
        notFound: true,
      }
    }

    return {
      props: { data: s.caseStudies[0] },
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

export default CaseStudyDetails
