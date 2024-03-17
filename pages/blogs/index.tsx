import Link from "next/link"
import { queryClient } from "@/utils/graphql-client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import dynamic from "next/dynamic"
import { IBlogCard, ICaseStudyCard, ICategory } from "@/utils/types"
import { GetServerSideProps } from "next"
import Image from "next/image"
import { useIntersectionObserver } from "usehooks-ts"
import { useRouter } from "next/router"
import {
  blogCategoriesGql,
  blogsFullGql,
  blogsByCategoryGql,
} from "@/graphql/blogs"
import NoDataComponent from "@/components/common/nodata"

const SolidColorTextHeader = dynamic(
  () => import("@/components/common/solidColorTextHeader"),
  { ssr: false }
)

type TBlogs = {
  blogCategories: ICategory[]
}

export const getServerSideProps = (async () => {
  const c: { blogCategories: ICategory[] } = await queryClient.request(
    blogCategoriesGql
  )

  console.log(c)

  if (c?.blogCategories) {
    return {
      props: {
        blogCategories: [{ category: "All", slug: "all" }, ...c.blogCategories],
      },
    }
  }
  return { props: { blogCategories: [] } }
}) satisfies GetServerSideProps<TBlogs>

const BlogCard = (data: IBlogCard) => {
  return (
    <Link prefetch={false} href={`/case-studies/${data.slug}`} passHref>
      <div className="w-full col-span-1 h-auto flex flex-col justify-between items-start transition-all group hover:cursor-pointer">
        <figure className="w-full h-[24vh] md:h-[35vh] relative overflow-hidden rounded-xl border border-gray-300">
          <Image
            src={data.image.url}
            alt={data.title}
            fill
            className="object-cover rounded-xl group-hover:scale-[1.1] transition-all"
          />
        </figure>
        <div className="bg-white py-4">
          {data.blogCategories.map((el) => {
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

const Blogs = (props: TBlogs) => {
  const { blogCategories } = props
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")

  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<IBlogCard[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)

  const { isIntersecting, ref: bottomRef } = useIntersectionObserver({})

  useEffect(() => {
    const fetchFunc = async () => {
      setLoading(true)
      if ((category ?? "all") === "all") {
        const { blogsConnection } = await queryClient.request<{
          blogsConnection: {
            pageInfo: { hasNextPage: boolean }
            edges: { node: IBlogCard }[]
          }
        }>(blogsFullGql, {
          first: PER_PAGE,
          skip: currentPage * PER_PAGE,
        })

        if (blogsConnection) {
          setHasNextPage(blogsConnection.pageInfo.hasNextPage)
          if (currentPage === 0) {
            setBlogs(blogsConnection.edges.map((el) => el.node))
          } else {
            setBlogs((prev) => [
              ...prev,
              ...blogsConnection.edges.map((el) => el.node),
            ])
          }
        }
      } else if (category !== null && category !== "all") {
        const { blogsConnection } = await queryClient.request<{
          blogsConnection: {
            pageInfo: { hasNextPage: boolean }
            edges: { node: IBlogCard }[]
          }
        }>(blogsByCategoryGql, {
          first: PER_PAGE,
          skip: currentPage * PER_PAGE,
          slug: category,
        })

        if (blogsConnection) {
          setHasNextPage(blogsConnection.pageInfo.hasNextPage)
          if (currentPage === 0) {
            setBlogs(blogsConnection.edges.map((el) => el.node))
          } else {
            setBlogs((prev) => [
              ...prev,
              ...blogsConnection.edges.map((el) => el.node),
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
        title="Blogs"
        subTitle="Read expert opinions on the evolving landscape of tech and business solutions."
      />
      <div className="h-auto sticky md:py-12 py-5 top-0 z-[45] bg-white px-4 md:px-0">
        <div className="max-w-7xl mx-auto flex flex-wrap md:space-x-6 gap-4 md:gap-0">
          {blogCategories.map((cat: ICategory) => {
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
        {blogs.map((el) => {
          return <BlogCard key={el.title} {...el} />
        })}
        {blogs.length === 0 ? <NoDataComponent /> : null}
      </div>
      <br />
      <br />
      {!loading ? <div className="h-0" ref={bottomRef} /> : null}
    </div>
  )
}

export default Blogs
