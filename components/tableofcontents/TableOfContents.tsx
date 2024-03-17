import { useHeadingsData } from "./useheadingdata.hook"
import { useIntersectionObserver } from "./useIntersectionObserver"
import { useState } from "react"

const Headings = (data: any) => (
  <ul className="pr-8 space-y-4 w-full">
    {data.headings.map((heading: any) => (
      <li className={`w-full`} key={heading.id}>
        <a
          className={`hover:bg-primary duration-300 transition-colors text-base text-black hover:text-white rounded-md p-2 capitalize block w-full relative ${
            heading.id === data.activeId
              ? "bg-primary toc-active text-white"
              : ""
          }`}
          href={`#${heading.id}`}
        >
          {heading.title.toLowerCase().trim()}
        </a>
      </li>
    ))}
  </ul>
)

const TableOfContents = () => {
  const [activeId, setActiveId] = useState()
  const { nestedHeadings } = useHeadingsData()
  useIntersectionObserver(setActiveId)
  return (
    <nav
      className="overflow-auto w-full text-white rounded-md"
      aria-label="Terms & Conditions - Table of Contents"
    >
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  )
}

export default TableOfContents
