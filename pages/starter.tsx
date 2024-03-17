import { Inter } from "next/font/google"
import Image from "next/image"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

const StarterCode = () => {
  return (
    <div className="w-full grid place-items-center h-screen">
      <div className="max-w-7xl flex justify-center items-center"></div>
    </div>
  )
}

export default StarterCode
