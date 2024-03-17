import Image from "next/image"
import dynamic from "next/dynamic"
import { RichText } from "@graphcms/rich-text-react-renderer"
import { GetStaticPaths } from "next"
import { queryClient } from "@/utils/graphql-client"
import { blogDetailsGql, blogsNameGql } from "@/graphql/blogs"
import { calculateReadingTime } from "@/utils/common"

const SectionTitleComponent = dynamic(
  () => import("@/components/common/sectionTitle"),
  {}
)
const Share = dynamic(() => import("@/components/common/share"), {})

interface IBlog {
  title: string
  slug: string
  shortDescription: string
  image: {
    url: string
  }
  blurHash: string
  blogCategories: IBlogCat[]
  content: {
    raw: any
    text: string
  }
}

interface IBlogCat {
  category: string
  slug: string
}

const BlogDetails = ({ data }: { data: IBlog }) => {
  const blog = data
  //   const { slug } = params
  //   const data: IcaseStudy = await getBlogDetails(slug)
  //   if (!data) {
  //     return notFound()
  //   }
  //   const relatedCasestudy = await getRelatedCaseStudy(slug)

  return (
    <>
      <div className="bg-primary py-36 text-white">
        <div className="max-w-4xl mx-auto w-11/12">
          <div className="flex justify-between">
            <p className="font-bold pb-2 text-gray-400">
              {calculateReadingTime(blog?.content?.text)} min reading
            </p>
            <div className="text-gray-400">
              <Share
                shareURL={`https://collaboratesolutions.com/blogs/${blog.slug}`}
              />
            </div>
          </div>
          <h2 className="font-bold text-xl md:text-5xl">{blog?.title}</h2>
        </div>
      </div>
      <div className="max-w-6xl w-11/12 mx-auto -mt-20 pb-6 md:pb-12">
        <div className="">
          <Image
            src={blog?.image?.url}
            alt={blog?.title}
            width={1400}
            height={600}
            priority
            className="aspect-video object-cover object-center rounded-md"
          />
        </div>
        <div className="max-w-4xl mx-auto pt-6 md:pt-12">
          <h2 className="font-semibold pb-4">{blog?.shortDescription}</h2>
          <div className="prose prose-teal space-y-3 w-full">
            <RichText content={blog?.content?.raw?.children} />
          </div>
        </div>
        {/* {relatedBlogs.length > 0 && (
          <section className="py-8 md:py-16">
            <Heading title="Related Blogs" textAlign="center" textSize="4xl" />
            <div className="flex justify-center items-center gap-8 flex-wrap  pt-10">
              {relatedBlogs.map((blog: IBlog, index: number) => (
                <div className="max-w-sm" key={blog?.title}>
                  <Card
                    index={index}
                    image={blog?.image?.url}
                    alt={blog?.title}
                    category={blog.blogCategories}
                    link="case-studies"
                    slug={blog.slug}
                    title={blog.title}
                  />
                </div>
              ))}
            </div>
          </section>
        )} */}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await queryClient.request<{ blogs: any }>(blogsNameGql)

    return {
      paths: res?.blogs?.map((blog: any) => ({
        params: { slug: blog.slug },
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
    const s = await queryClient.request<{ blogs: IBlog[] }>(blogDetailsGql, {
      slug: params.slug,
    })

    // const c = await queryClient.request<{ caseStudies: ICaseStudiesRelated[] }>(
    //   relatedCaseStudiesGql
    // )

    if (s.blogs.length === 0) {
      return {
        props: { data: undefined },
        notFound: true,
      }
    }

    return {
      props: { data: s.blogs[0] },
      revalidate: 10,
    }
  } catch (error) {
    console.log(error)
    return {
      props: { data: undefined },
      notFound: true,
    }
  }
}

export default BlogDetails
