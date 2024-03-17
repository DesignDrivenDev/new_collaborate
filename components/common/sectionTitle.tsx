import React from "react"

const SectionTitleComponent = ({
  title,
  desc,
  titleClass,
  descClass,
}: {
  title: string
  desc?: string
  titleClass?: string
  descClass?: string
}) => {
  return (
    <div className="w-full text-center">
      <h2
        className={`font-bold text-2xl md:leading-[38px] md:text-[34px] tracking-tight ${titleClass}`}
      >
        {title}
      </h2>
      {desc ? (
        <p
          className={`text-sm md:text-base py-2 md:py-4 md:max-w-3xl md:mx-auto ${descClass}`}
        >
          {desc}
        </p>
      ) : null}
    </div>
  )
}

export default SectionTitleComponent
