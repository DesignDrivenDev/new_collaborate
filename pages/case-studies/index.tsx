import Link from "next/link"
import { queryClient } from "@/utils/graphql-client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import dynamic from "next/dynamic"
import { ICaseStudyCard, ICategory } from "@/utils/types"
import {
  caseStudiesByCategoryGql,
  caseStudiesFullGql,
  caseStudyCategoriesGql,
} from "@/graphql/case-studies"
import { GetServerSideProps } from "next"
import Image from "next/image"
import { useIntersectionObserver } from "usehooks-ts"
import { useRouter } from "next/router"
import NoDataComponent from "@/components/common/nodata"

const SolidColorTextHeader = dynamic(
  () => import("@/components/common/solidColorTextHeader"),
  { ssr: false }
)

type TCaseStudies = {
  caseStudyCategories: ICategory[]
}

export const getServerSideProps = (async () => {
  const c: { caseStudyCategories: ICategory[] } = await queryClient.request(
    caseStudyCategoriesGql
  )

  if (c?.caseStudyCategories) {
    return {
      props: {
        caseStudyCategories: [
          { category: "All", slug: "all" },
          ...c.caseStudyCategories,
        ],
      },
    }
  }
  return { props: { caseStudyCategories: [] } }
}) satisfies GetServerSideProps<TCaseStudies>

const CaseStudyCard = (data: ICaseStudyCard) => {
  return (
    <Link prefetch={false} href={`/case-studies/${data.slug}`} passHref>
      <div className="w-full col-span-1 h-auto flex flex-col justify-between items-start transition-all group hover:cursor-pointer">
        <figure className="w-full h-[24vh] md:h-[35vh] relative overflow-hidden rounded-xl border border-gray-300">
          <Image
            src={data.mainImage.url}
            alt={data.title}
            fill
            className="object-cover rounded-xl group-hover:scale-[1.1] transition-all"
          />
        </figure>
        <div className="bg-white py-4">
          {data.caseStudyCategories.map((el) => {
            return (
              <span
                className="bg-gray-300 rounded-full text-xs font-light text-black px-2 py-1"
                key={el.slug}
              >
                {el.category}
              </span>
            )
          })}
          <p className="text-lg md:text-xl mt-2 group-hover:text-primary transition-all">
            {data.title}
          </p>
        </div>
      </div>
    </Link>
  )
}

const PER_PAGE = 2

const CaseStudies = (props: TCaseStudies) => {
  const { caseStudyCategories } = props
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")

  const [loading, setLoading] = useState(true)
  const [caseStudies, setCaseStudies] = useState<ICaseStudyCard[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)

  const { isIntersecting, ref: bottomRef } = useIntersectionObserver({})

  useEffect(() => {
    const fetchFunc = async () => {
      setLoading(true)
      if ((category ?? "all") === "all") {
        const { caseStudiesConnection } = await queryClient.request<{
          caseStudiesConnection: {
            pageInfo: { hasNextPage: boolean }
            edges: { node: ICaseStudyCard }[]
          }
        }>(caseStudiesFullGql, {
          first: PER_PAGE,
          skip: currentPage * PER_PAGE,
        })

        if (caseStudiesConnection) {
          setHasNextPage(caseStudiesConnection.pageInfo.hasNextPage)
          if (currentPage === 0) {
            setCaseStudies(caseStudiesConnection.edges.map((el) => el.node))
          } else {
            setCaseStudies((prev) => [
              ...prev,
              ...caseStudiesConnection.edges.map((el) => el.node),
            ])
          }
        }
      } else if (category !== null && category !== "all") {
        const { caseStudiesConnection } = await queryClient.request<{
          caseStudiesConnection: {
            pageInfo: { hasNextPage: boolean }
            edges: { node: ICaseStudyCard }[]
          }
        }>(caseStudiesByCategoryGql, {
          first: PER_PAGE,
          skip: currentPage * PER_PAGE,
          slug: category,
        })

        if (caseStudiesConnection) {
          setHasNextPage(caseStudiesConnection.pageInfo.hasNextPage)
          if (currentPage === 0) {
            setCaseStudies(caseStudiesConnection.edges.map((el) => el.node))
          } else {
            setCaseStudies((prev) => [
              ...prev,
              ...caseStudiesConnection.edges.map((el) => el.node),
            ])
          }
        }
      }
      setLoading(false)
    }
    fetchFunc()
  }, [currentPage, category])

  useEffect(() => {
    if (isIntersecting && hasNextPage && !loading) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [hasNextPage, isIntersecting, loading])

  return (
    <div className="h-auto w-full bg-white">
      <SolidColorTextHeader
        title="Case Studies"
        subTitle="Explore how our solutions have propelled businesses forward."
      />
      <div className="h-auto sticky md:py-12 py-5 top-0 z-[45] bg-white px-4 md:px-0">
        <div className="max-w-7xl mx-auto flex flex-wrap md:space-x-6 gap-4 md:gap-0">
          {caseStudyCategories.map((cat: ICategory) => {
            return (
              <div key={cat.category}>
                <p
                  className={`w-max rounded-md text-sm md:text-lg px-4 py-2 border border-primary hover:bg-primary hover:text-white transition-all ${
                    cat.slug === (category ?? "all")
                      ? "bg-primary text-white"
                      : "bg-transparent text-black"
                  }`}
                  onClick={() => {
                    setCurrentPage(0)
                    router.push("/case-studies", {
                      query: { category: `${cat.slug}` },
                    })
                  }}
                >
                  {cat.category}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="h-auto max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {caseStudies.map((el) => {
          return <CaseStudyCard key={el.title} {...el} />
        })}
        {caseStudies.length === 0 ? <NoDataComponent /> : null}
      </div>
      <br />
      <br />
      {!loading ? <div className="h-0" ref={bottomRef} /> : null}
    </div>
  )
}

export default CaseStudies
