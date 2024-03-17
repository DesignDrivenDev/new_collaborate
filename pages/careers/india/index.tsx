import SEO from "@/components/common/seo";
import { indiaJobsGql } from "@/graphql/jobs";
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
        indiaJobsGql
      );
      setJobs(jobLists);
    };
    getJobList();
  }, []);
  return (
    <>
      <SEO
        title="Collaborate Solution India - Careers in Technology & IT in Massachusetts"
        description="Latest jobs in Technology & IT in Massachusetts"
        href="https://collaboratesolutions.com/careers/india"
        imgSrc={"../assets/logo.png"}
      />
      <div className="min-h-screen">
        <div className="h-full py-52 bg-primary text-white grid place-items-center text-center">
          <div>
            <h2 className="text-lg md:text-2xl">
              Careers at Collaborate Solutions at India Office
            </h2>
            <h1 className="text-2xl md:text-5xl font-bold">
              Know more, do more, be more.
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 w-11/12">
          <h2 className="font-bold text-3xl pb-6 text-center">
            Open Positions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {jobs.length > 0 ? (
              jobs.map((job: IJobDet) => (
                <div key={job.title} className="">
                  <Link
                    href={`/careers/india/${job.slug}`}
                    as={`/careers/india/${job.slug}`}
                  >
                    <div className="text-white bg-primary py-8 rounded-lg h-full ">
                      <h2 className="bg-primary text-lg md:text-xl px-8 py-2">
                        {job.title}
                      </h2>
                      <div className="px-8 text-lg py-2 text-white">
                        <span className="block py-2 ">
                          Salary: {job.salary}
                        </span>
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
        </div>
      </div>
    </>
  );
};

export default Careers;
