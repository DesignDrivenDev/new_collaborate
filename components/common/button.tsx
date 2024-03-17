import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

enum ButtonType {
  outline = "outline",
  readMore = "readMore",
  primary = "primary",
}

enum ButtonSize {
  small = "small",
  regular = "regular",
  large = "large",
}

const ButtonComponent = (props: ButtonProps) => {
  return (
    <button
      className="select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="submit"
      {...props}
    >
      {props.children}
    </button>
  )
}

export default ButtonComponent
