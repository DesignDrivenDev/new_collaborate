import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ICategory } from "@/utils/types"

interface Icard {
  title: string
  slug: string
  category: any[]
  image: string
  alt: string
  link: string
  index: number
  readingTime?: number
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const Card = ({
  title,
  slug,
  category,
  image,
  alt,
  link,
  index,
  readingTime,
}: Icard) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,

        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="overflow-hidden rounded-lg shadow transition hover:shadow-lg min-h-[400px] bg-white"
    >
      <Link href={`/${link}/${slug}`}>
        <div className="h-[60%] w-full relative">
          <Image
            alt={alt}
            src={image}
            fill
            //   width={600}
            //   height={400}
            className="h-56 w-full object-cover"
            // placeholder="blur"
            // blurDataURL={study?.mainImage.url}
          />
        </div>
      </Link>
      <div className="p-4 sm:p-6">
        {category && (
          <span className="block text-xs text-gray-500 pb-3">
            {category.map((cat: any) => (
              <Link
                key={cat.category}
                href={`/${link}?category=${cat.slug}`}
                className="mr-2 bg-gray-200 px-1 py-0.5 rounded"
              >
                {cat.category}
              </Link>
            ))}
          </span>
        )}
        {readingTime && (
          <p className="text-sm pb-2">{readingTime} min reading</p>
        )}
        <Link href={`/${link}/${slug}`}>
          <h3 className="mt-0.5 text-lg">
            <span className="text_bg">{title}</span>
          </h3>
        </Link>
      </div>
    </motion.div>
  )
}

export default Card
