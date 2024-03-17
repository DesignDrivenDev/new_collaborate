import capgemini from "@/assets/partners/capgemini.png"
import ciber from "@/assets/partners/ciber.png"
import cognizant from "@/assets/partners/cognizant.png"
import experis from "@/assets/partners/experis.png"
import hexaware from "@/assets/partners/hexaware.png"
import insight_global from "@/assets/partners/insight_global.png"
import lt_infotech from "@/assets/partners/lt_infotech.png"
import mindtree from "@/assets/partners/mindtree.png"
import syntel from "@/assets/partners/syntel.png"
import tech_mahindra from "@/assets/partners/tech_mahindra.png"
import tek_systems from "@/assets/partners/tek_systems.png"
import virtusa from "@/assets/partners/virtusa.png"

export const footerQuickLinks = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Careers",
    href: "/careers",
  },

  {
    name: "Case Studies",
    href: "/case-studies",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
]

export const navMenuLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "" },
  { name: "Industries", href: "" },
  { name: "Contact", href: "/contact" },
  { name: "Blogs", href: "/blogs" },
  { name: "Case Studies", href: "/case-studies" },
]

export const partnersList = [
  {
    title: "Capgemini",
    img: capgemini,
  },
  {
    title: "Ciber",
    img: ciber,
  },
  {
    title: "Cognizant",
    img: cognizant,
  },
  {
    title: "Experis",
    img: experis,
  },
  {
    title: "Hexaware",
    img: hexaware,
  },
  {
    title: "Insight Global",
    img: insight_global,
  },
  {
    title: "L&T Infotech",
    img: lt_infotech,
  },
  {
    title: "Tech Mahindra",
    img: tech_mahindra,
  },
  // {
  //   title: "Mindtree",
  //   img: mindtree,
  // },
  // {
  //   title: "Syntel",
  //   img: syntel,
  // },
  // {
  //   title: "Tek Systems",
  //   img: tek_systems,
  // },
  // {
  //   title: "Virtusa",
  //   img: virtusa,
  // },
]

export const addresses = [
  {
    name: "United States",
    location: "415 Boston Tpke, Suite # 302 Shrewsbury, MA 01545",
    locationLink: "https://maps.app.goo.gl/MMhFvmPuwGCx3LRN8",
    phone: "+1 508 845 4440",
    mail: "info@collaboratesolutions.com",
  },
  {
    name: "India Corporate Office",
    location:
      "Plot Number: 20, A&A Lake front, 4thFloor, APIIC Software Layout, Vittal Rao Nagar, HITEC City, Hyderabad, 500081.",
    locationLink: "https://maps.app.goo.gl/MMhFvmPuwGCx3LRN8",
    phone: "040 - 27423134",
    mail: "info@collaboratesolutions.com",
  },
  {
    name: "India Development Center",
    location:
      "2-2-58/60, 201, 302 Prashanthi Arcade, Amberpet Main Road, Ramanthapur, Hyderabad, Telangana State - 500013",
    locationLink: "https://maps.app.goo.gl/MMhFvmPuwGCx3LRN8",
    phone: "040 - 27423134",
    mail: "info@collaboratesolutions.com",
  },
]

export const calculateReadingTime = (content: string): number => {
  if (!content) return 0 // Early return for null/undefined/empty strings

  const wordsPerMinute = 160
  let wordCount = 0
  let inWord = false

  for (const char of content) {
    if (char.trim()) {
      if (!inWord) {
        wordCount++
        inWord = true
      }
    } else {
      inWord = false
    }
  }

  return Math.ceil(wordCount / wordsPerMinute)
}
