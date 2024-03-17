import TestimonialsSlider from "@/components/common/testimonialsSlider";
import Whychoose from "@/components/home/whychoose";
import { blogsHomeGql } from "@/graphql/blogs";
import { caseStudiesHomeGql } from "@/graphql/case-studies";
import { jobsHomeGql } from "@/graphql/jobs";
import { servicesHomeGql } from "@/graphql/services";
import { testimonialsGql } from "@/graphql/testimonials";
import { queryClient } from "@/utils/graphql-client";
import { IContentHome, ITestimonials } from "@/utils/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TestimonialsSliderComponent = dynamic(
  () => import("@/components/common/testimonialsSlider"),
  {
    ssr: false,
  }
);
const HeroComponent = dynamic(() => import("@/components/home/hero"), {
  ssr: false,
});
const StatsComponent = dynamic(() => import("@/components/home/stats"), {
  ssr: false,
});
const PartnersComponent = dynamic(
  () => import("@/components/common/partners"),
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
const CaseStudiesComponent = dynamic(
  () => import("@/components/home/caseStudies"),
  {
    ssr: false,
  }
);
const BlogsComponent = dynamic(() => import("@/components/home/blogs"), {
  ssr: false,
});
const JobsComponent = dynamic(() => import("@/components/home/jobs"), {
  ssr: false,
});

const Home = () => {
  const [services, setServices] = useState<IContentHome[]>([]);
  const [blogs, setBlogs] = useState<IContentHome[]>([]);
  const [caseStudies, setCaseStudies] = useState<IContentHome[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonials[]>([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const s: { services: any } = await queryClient.request(servicesHomeGql);

        if (s?.services) {
          setServices(
            s.services.map((el: any) => ({
              title: el?.title,
              slug: el?.slug,
              image: el?.overviewImage?.url,
              overview: el?.overview,
            }))
          );
        }

        const c: { caseStudies: any } = await queryClient.request(
          caseStudiesHomeGql
        );

        if (c?.caseStudies) {
          setCaseStudies(
            c.caseStudies.map((el: any) => ({
              title: el?.title,
              slug: el?.slug,
              image: el?.mainImage?.url,
              overview: el?.overview,
            }))
          );
        }

        const b: { blogs: any } = await queryClient.request(blogsHomeGql);

        if (b?.blogs) {
          setBlogs(
            b.blogs.map((el: any) => ({
              title: el?.title,
              slug: el?.slug,
              image: el?.image?.url,
              overview: el?.shortDescription,
            }))
          );
        }

        const T: { testmonials: any } = await queryClient.request(
          testimonialsGql
        );

        if (T?.testmonials) {
          setTestimonials(
            T.testmonials.map((el: any) => ({
              name: el?.name,
              designation: el?.designation,
              profile: el?.profile?.url,
              review: el?.review,
            }))
          );
        }

        const j: { jobLists: any } = await queryClient.request(jobsHomeGql);

        if (j?.jobLists) {
          setJobs(
            j.jobLists.map((el: any) => ({
              title: el.title,
              slug: el.slug,
              image: "",
              overview: el.location,
            }))
          );
        }
      } catch (error) {
        console.log(`Error in fetching content: ${error}`);
      }
    };
    fetchFunc();
  }, []);

  return (
    <section className="w-full">
      <HeroComponent />
      <StatsComponent />
      <PartnersComponent />
      <CardSliderComponent
        slugPath="/services"
        title={`Our Services`}
        desc={`Solutions that go beyond mere execution and focuses on sustainability and outcome. Our team of dedicated seasoned professionals ensure that the services we provide are tailored to your organization, are relevant and are in line with the ever changing technology landscape.`}
        data={services}
      />
      <Whychoose />
      {testimonials.length > 0 ? (
        <TestimonialsSliderComponent testimonials={testimonials} />
      ) : null}
      {caseStudies.length > 0 ? (
        <CaseStudiesComponent caseStudies={caseStudies} />
      ) : null}
      {blogs.length > 0 ? <BlogsComponent blogs={blogs} /> : null}
      <JobsComponent jobs={jobs} />
    </section>
  );
};

export default Home;
