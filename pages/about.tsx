import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import our_mission from "@/assets/mission.png";
import our_vision from "@/assets/vision.png";
import our_values from "@/assets/values.png";
import { IContentHome } from "@/utils/types";
import { GetServerSideProps } from "next";
import { queryClient } from "@/utils/graphql-client";
import { industriesAboutGql } from "@/graphql/industries";
import Link from "next/link";
import CTA from "@/components/common/cta";
import person1 from "@/assets/leaders/person1.webp";
import person2 from "@/assets/leaders/person2.webp";
import person3 from "@/assets/leaders/person3.webp";
import SEO from "@/components/common/seo";

const SectionTitleComponent = dynamic(
  () => import("@/components/common/sectionTitle"),
  {
    ssr: false,
  }
);
const CardSliderComponent = dynamic(
  () => import("@/components/common/cardSlider"),
  {
    ssr: false,
  }
);
const PartnersComponent = dynamic(
  () => import("@/components/common/partners"),
  {
    ssr: false,
  }
);

const ourLeaders = [
  {
    name: "Tiru Chandrapu",
    position: "",
    image: person1,
    About: "",
  },
  {
    name: "Mallik Miryala",
    position: "",
    image: person2,
    About: "",
  },
  {
    name: "Kapil Kandoju",
    position: "",
    image: person3,
    About: "",
  },
];

const journey = [
  {
    year: "2008",
    text: "Company Establishment: Collaborate Solutions was founded in Shrewsbury, Massachusetts, with the goal of offering cutting-edge technological solutions to companies all over the world.",
  },
  {
    year: "2011",
    text: "Expansion into Hyderabad, India Recognising the expanding need for technological services worldwide, Collaborate Solutions moved its operations to Hyderabad, India, establishing a strong global presence.",
  },
  {
    year: "2013",
    text: "Introduction of Digital Enterprise Services - Collaborate Solutions launched its comprehensive suite of Digital Enterprise Services, aimed at providing seamless support to businesses across various industries.",
  },
  {
    year: "2015",
    text: "Strategic Partnerships - Collaborate Solutions has strategic alliances with prominent global technology businesses and system integrators to strengthen its capabilities and increase its reach.",
  },
  {
    year: "2018",
    text: "Expertise Expansion - Collaborate Solutions has developed its experience in crucial sectors such as mobility, cloud computing, big data, and analytics, allowing it to provide bespoke solutions to clients.",
  },
  {
    year: "2022",
    text: "Collaborate Solutions was recognized for its competence in providing excellent quality solutions and creating long-term partnerships with clients and partners.",
  },
  {
    year: "2022",
    text: "Continued Growth and Innovation - Collaborate Solutions continues to expand and develop, staying ahead of industry trends and improving its procedures to provide even more value to clients throughout the world.",
  },
];

const coreValues = [
  {
    title: "INNOVATION",
    description:
      "We believe in always pushing the frontiers of technical innovation, providing solutions that anticipate and fulfill our client's increasing demands.",
  },
  {
    title: "EXCELLENCE",
    description:
      "We are committed to delivering great quality in all we do, ensuring that our solutions create substantial value and a competitive advantage for our clients.",
  },
  {
    title: "COLLABORATION",
    description:
      "We understand the value in collaboration and partnership, therefore we work closely with our clients, team members, and industry stakeholders to reach common goals.",
  },
  {
    title: "EXPERTISE",
    description:
      "Our team is made up of seasoned individuals who are experts in their disciplines and visionaries in business transformation. We use our knowledge in mobility, cloud computing,AI, Machine Learning, big data, and analytics to create dynamic and effective solutions.",
  },
  {
    title: "INTEGRITY",
    description:
      "We maintain the greatest levels of integrity, honesty, and openness in all of our dealings, generating trust and developing long-term relationships with our clients and partners.",
  },
  {
    title: "CONTNOUS IMPROVEMENT",
    description:
      "We are devoted to continual learning and progress, keeping up with market trends.",
  },
];

type TAbout = {
  industries: IContentHome[];
};

export const getServerSideProps = (async () => {
  const i: { industries: any } = await queryClient.request(industriesAboutGql);

  if (i?.industries) {
    return {
      props: {
        industries: i.industries.map((el: any) => ({
          title: el.title,
          slug: el.slug,
          image: el.image.url,
          overview: el.overview,
        })),
      },
    };
  }
  return { props: { industries: [] } };
}) satisfies GetServerSideProps<TAbout>;

const About = (props: TAbout) => {
  const { industries } = props;
  return (
    <div className="pt-12">
      <SEO
        title="Digital Transformation Services in Massachusetts"
        description="We are a 360 degree technology solutions firm that's been catering to a wide variety of industries and have delivered complex technology solutions and helped businesses in driving technology transformation and build sustainable tech ecosystems."
        href="https://collaboratesolutions.com/about"
        imgSrc={"../assets/logo.png"}
      />
      <div className="bg-gradient-to-r from-black/90 via-primary to-primary">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto gap-8">
          <div className="grid place-items-center pt-16 sm:max-w-xl max-w-full mx-auto">
            <div className="space-y-2 md:space-y-4 text-base text-white w-11/12 mx-auto ">
              <p>
                {`Welcome to Collaborate, the epicenter of innovation and solutions. Here, we go beyond conventional limits to create the possibilities of the future now. Everyone on our team is motivated not just by experience but also by an unquenchable passion to solve problems and provide unique solutions that align with your goals.`}
              </p>
              <p>
                {`We are steadfast in our resolve to empower, elevate, and surpass expectations in a world where change is the only constant. Come along with us as we redefine the limits of what's feasible in the digital world.`}
              </p>
              <p>{`Together, let's pave the way for the future`}.</p>
              <p> {`With diligence and inventiveness,`}</p>
              <p>{`(CEO’s Name)`}</p>
              {`CEO, Collaborate Solutions`}
            </div>
          </div>
          <div className="grid place-items-end">
            <Image
              src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg"
              alt="CEO's note"
              height={400}
              width={400}
              className="object-cover object-top w-full max-h-[550px]"
            />
          </div>
        </div>
      </div>

      <div className="pt-12">
        <SectionTitleComponent title="About Us" />
      </div>
      <div className="w-10/12 mx-auto pt-4 grid place-items-center">
        <div className="text-left flex justify-center items-center flex-col">
          <p className="text-sm md:text-lg py-2 md:py-4 text-black/90 w-full md:w-full">
            {`In today's fast-paced digital realm, staying ahead isn't just a luxury—it's essential.
              Collaborate Solutions is at the forefront of technological innovation, providing
              your company with a distinct competitive advantage through innovative services.
              Our aim is uncomplicated: to offer smooth assistance by offering an extensive
              range of Digital Enterprise Services, guaranteeing that you're constantly one step
              ahead.
              `}
            <br />
            <br />
            {`Collaborate Solutions, a worldwide company based in Shrewsbury, Massachusetts with a global footprint that extends to Hyderabad, India is home to a group of seasoned individuals who are not just leaders in business transformation but also subject matter experts in respective domains. Our solutions are as dynamic as the digital environment itself, thanks to our experience in mobility, cloud computing, big data, and analytics.`}
            <br />
            <br />
            {`Collaborate Solutions, a worldwide company based in Hyderabad, India and with its
            headquarters in Shrewsbury, Massachusetts, is home to a group of seasoned
            individuals who are not just leaders in business transformation but also subject
            matter experts in respective domains. Our solutions are as dynamic as the digital
            environment itself, thanks to our experience in mobility, cloud computing, big
            data, and analytics.
            `}
            <br />
            <br />
            {`At the heart of Collaborate Solutions is cooperation. True innovation, in our opinion, results from collaborating with the greatest.`}
            <br />
            <br />
            {`We think collaborating with the most brilliant brains leads to great innovation. For this reason, we have developed  trategic alliances with top system integrators and worldwide technology businesses. Through these partnerships, we make sure that we provide more than simply answers; rather, we set your company up for success by providing it with  tate-of-the-art resources and insights.`}
          </p>
        </div>
      </div>
      <div className="my-12 md:my-16 w-10/12 mx-auto h-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        <div className="col-span-1 w-full h-auto flex flex-col justify-center items-center">
          <div className="w-12 h-12 md:w-20 md:h-20 relative">
            <Image
              src={our_mission}
              alt="Mission"
              fill
              placeholder="blur"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="pt-1.5 md:pt-3 text-center">
            <h2 className="font-extrabold text-lg md:text-2xl">
              OUR <span className="text-primary">MISSION</span>
            </h2>
            <p className="text-xs md:text-base pt-1.5 md:pt-4 font-medium text-primary/80">
              {`At Collaborate Solutions, our goal is to empower organisation with
              innovative technological solutions that enable them to stay ahead
              of the curve in the quickly changing digital world.`}
            </p>
          </div>
        </div>
        <div className="col-span-1 w-full h-auto flex flex-col justify-center items-center">
          <div className="w-12 h-12 md:w-20 md:h-20 relative">
            <Image
              src={our_vision}
              alt="Vision"
              fill
              placeholder="blur"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="pt-1.5 md:pt-3 text-center">
            <h2 className="font-extrabold text-lg md:text-2xl">
              OUR <span className="text-primary">VISION</span>
            </h2>
            <p className="text-xs md:text-base pt-1.5 md:pt-4 font-medium text-primary/80">
              {`Our aim is to be the premier supplier of revolutionary technology solutions, known
                for our creative approach, unwavering dedication to client success, and ability to
                anticipate and surpass organizations' changing demands in the digital era`}
            </p>
          </div>
        </div>
        <div className="col-span-1 w-full h-auto flex flex-col justify-center items-center">
          <div className="w-12 h-12 md:w-20 md:h-20 relative">
            <Image
              src={our_values}
              alt="Values"
              fill
              placeholder="blur"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="pt-1.5 md:pt-3 text-center">
            <h2 className="font-extrabold text-lg md:text-2xl">
              OUR <span className="text-primary">VALUES</span>
            </h2>
            <p className="text-xs md:text-base pt-1.5 md:pt-4 font-medium text-primary/80">
              {`Our innovation drives us to meet evolving client needs while maintaining great
              quality in all undertakings. We offer meaningful solutions with a decisive
              advantage by collaborating, demonstrating knowledge, maintaining integrity, and
              continuously improving.
              `}
            </p>
          </div>
        </div>
      </div>
      {/* Industries */}
      <CardSliderComponent
        slugPath="/industries"
        title={`Industries`}
        desc={`Check out how Collaborate Solutions have delivered transformational solutions across a wide array of Industries.`}
        data={industries}
      />
      {/* core values section */}
      <section className="py-12 bg-primary/5">
        <SectionTitleComponent
          title="Our Core Values"
          desc="At Collaborate Solutions, our principles and beliefs serve as the foundation of our identity and drive our activities every day."
        />
        <div className="max-w-7xl w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {coreValues.map((value, index) => (
            <div className="p-6 bg-gray-50 rounded-lg" key={index}>
              <h3 className="text-balance md:text-lg font-bold">
                {value.title}
              </h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Service overview */}
      <section className="bg-gradient-to-r from-primary via-black/60 to-primary">
        <div className=" text-white text-center py-12 max-w-3xl mx-auto w-11/12">
          <h2 className="text-xl pb-6">
            Collaborate Solutions provides a comprehensive array of services
            aimed at empowering organizations in the digital era.
          </h2>
          <Link
            href={`/services`}
            className="group flex items-center justify-center space-x-2 text-white w-fit mx-auto"
          >
            <p className="inline-flex items-center gap-1 text-base transition-all font-semibold text-white group-hover:text-white/80 relative underline">
              Know more about services
            </p>
            <span
              aria-hidden="true"
              className="block transition-all group-hover:text-white/80 group-hover:translate-x-1 rtl:rotate-180"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* Journey */}
      <div className="max-w-7xl w-11/12 mx-auto grid md:grid-cols-6 grid-cols-1 gap-8 py-8 md:py-16">
        <div className="col-span-1 md:col-span-2  h-fit md:!sticky md:top-36">
          <SectionTitleComponent
            title="Our Journey"
            desc="Collaborate Solutions was founded in 2010 with a mission to transform the
                  technology solutions business. Over the years, we've reached some notable
                  milestones:
                  "
            titleClass="!text-left"
            descClass="!text-left"
          />
        </div>

        <div className="col-span-1 md:col-span-4 border-l-2 sm:border-l-0 border-primary/70  md:pl-0 relative md:block hidden">
          {journey.map((data, i) => (
            <div
              key={i}
              className={`w-full justify- items-center max-w-lg md:max-w-3xl mx-auto ${
                i % 2 !== 0 ? "md:justify-end" : "md:justify-start"
              } flex pb-3 md:pb-12 flex-wrap`}
            >
              <div className="max-w-xs text-left md:text-center relative pl-4 ">
                <div>
                  <p className="font-medium text-3xl md:text-5xl ">
                    {data.year}
                  </p>
                  <div className="hidden md:flex bg-black w-0.5 h-16 self-center absolute left-1/2 -translate-x-1/2"></div>
                  <p className="pt-2 md:pt-16 text-primary font-semibold">
                    {data.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* mobile view timeline */}
        <ul role="list" className="m-8 max-w-screen-md md:hidden block">
          {journey.map((data, i) => (
            <div key={i}>
              <li className="group relative flex flex-col pb-8 pl-7 last:pb-0 ">
                <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-primary group-first:top-0"></div>
                <div className="absolute left-0 top-0 h-2 w-2 rounded-full border border-primary bg-primary"></div>
                <h3 className="text-2xl/6 font-semibold pb-2">{data.year}</h3>

                <p className="mb-3 text-primary font-">{data.text}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
      {/* Teams */}
      <div className="bg-gray-100">
        <div className="max-w-7xl w-11/12 mx-auto py-8 md:py-16">
          <SectionTitleComponent
            title="Our Leaders"
            desc="A highly driven technical team spread across the globe led by our
              Industry Experts."
            titleClass="!text-center"
            descClass="!text-center"
          />
          {/* <div>
            <h2
              className={`font-bold text-2xl md:leading-[38px] md:text-[34px] tracking-tight`}
            >
              Our Leaders
            </h2>

            <p className={`text-sm md:text-base py-2 md:py-4 md:max-w-3xl `}>
              A highly driven technical team spread across the globe led by our
              Industry Experts.
            </p>
          </div> */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 pt-12">
            {ourLeaders.map((leader) => (
              <div className="h- rounded-lg" key={leader?.name}>
                <Image
                  src={leader.image}
                  alt=""
                  className="rounded-xl shadow-sm"
                />
                <p className="text-lg font-semibold pt-2">{leader.name}</p>
                <p className="text-sm text-gray-500">{leader.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden w-full">
        <PartnersComponent />
      </div>

      <CTA
        title="Are you ready to boost your business with the Collaborate solutions? Contact Collaborate Solutions now to take the first step toward digital transformation."
        link="/contact"
        linkName="Contact Us"
      />
    </div>
  );
};

export default About;
