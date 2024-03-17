import SEO from "@/components/common/seo";
import { usaJobsGql } from "@/graphql/jobs";
import { queryClient } from "@/utils/graphql-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IJobDet {
  title: string;
  slug: string;
  experience: string;
  salary: string;
  location: string;
  jobDetails: {
    raw: any;
  };
  lca: {
    raw: any;
  };
}

const Careers = () => {
  const [jobs, setJobs] = useState<IJobDet[]>([]);
  useEffect(() => {
    const getJobList = async () => {
      const { jobLists }: { jobLists: any } = await queryClient.request(
        usaJobsGql
      );
      setJobs(jobLists);
    };
    getJobList();
  }, []);
  return (
    <div className="min-h-screen">
      <SEO
        title="Collaborate Solution USA - Careers in Technology & IT in Massachusetts"
        description="Latest jobs in Technology & IT in Massachusetts"
        href="https://collaboratesolutions.com/careers/usa"
        imgSrc={"../assets/logo.png"}
      />
      <div className="h-full py-44 bg-primary text-white grid place-items-center text-center">
        <div>
          <h2 className="text-lg md:text-2xl">
            Careers at Collaborate Solutions at USA office
          </h2>
          <h1 className="text-2xl md:text-5xl font-bold">
            Know more, do more, be more.
          </h1>
        </div>
      </div>

      {/* <div className="py-12 max-w-5xl mx-auto w-11/12">
        <h2 className="text-center font-bold text-3xl pb-12">
          Why work with us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-primary">
          <div className="flex gap-4 justify-center items-start px-3 py-7 border border-primary rounded-md">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-primary"
                viewBox="0 0 512 512"
              >
                <path d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z" />
              </svg>
            </div>
            <div>
              <h2 className="font-medium text-lg md:text-2xl pb-3 ">
                Health Care
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, optio.
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center items-start px-3 py-7 border border-primary rounded-md">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-primary"
                viewBox="0 0 512 512"
              >
                <path d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z" />
              </svg>
            </div>
            <div>
              <h2 className="font-medium text-lg md:text-2xl pb-3">
                Paid Leave
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, optio.
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center items-start px-3 py-7 border border-primary rounded-md">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-primary"
                viewBox="0 0 512 512"
              >
                <path d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z" />
              </svg>
            </div>
            <div>
              <h2 className="font-medium text-lg md:text-2xl pb-3">
                Flexible Environment
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, optio.
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto py-12 w-11/12">
        <h2 className="font-bold text-3xl pb-6 text-center">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {jobs.length > 0 ? (
            jobs.map((job: IJobDet) => (
              <div key={job.title} className="">
                <Link
                  href={`/careers/usa/${job.slug}`}
                  as={`/careers/usa/${job.slug}`}
                >
                  <div className="text-white bg-primary py-8 rounded-lg h-full ">
                    <h2 className="bg-primary text-lg md:text-xl px-8 py-2">
                      {job.title}
                    </h2>
                    <div className="px-8 text-lg py-2 text-white">
                      <span className="block py-2 ">Salary: {job.salary}</span>
                      <span className="block ">
                        Experience: {job.experience}
                      </span>
                      {/* <h2 className="min-h-[60px]">{job.salary}</h2> */}
                    </div>
                    <p className="px-3 py-2 bg-gray-200 text-primary w-fit ml-auto rounded-l-md text-sm font-semibold">
                      View & Apply &rarr;
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <>
              <div>No Job Opening currently</div>
            </>
          )}
        </div>
        <div className="py-8 max-w-5xl w-11/12 mx-auto">
          <p className="text-lg">
            <span className="font-bold">* </span>We are an equal opportunity
            employers and will consider all applications without regard to race,
            genetic information, sex, age, color, religion, national origin,
            veteran status, disability or any other characteristic protected by
            law. To view the EEO. For information on H-1B nonimmigrants working
            at various US locations see{" "}
            <Link href={"/careers/usa/lca"} className="text-primary font-bold">
              Labor Condition Applications
            </Link>
            (“LCAs”) page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
