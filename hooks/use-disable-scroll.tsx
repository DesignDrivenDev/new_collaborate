import { useEffect } from "react"

export const useDisableBodyScroll = (open: boolean) => {
  useEffect(() => {
    open && (document.body.style.overflow = "hidden")
    !open && (document.body.style.overflow = "")
  }, [open])
}
