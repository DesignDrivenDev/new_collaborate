import React from "react"

const NoDataComponent = ({ text }: { text?: string }) => {
  return (
    <h3 className="text-primary text-xl md:text-3xl">
      {text ?? "No Data Found!"}
    </h3>
  )
}

export default NoDataComponent
