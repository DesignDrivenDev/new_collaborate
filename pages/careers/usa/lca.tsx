import Accordion from "@/components/common/accordion";
import SectionTitleComponent from "@/components/common/sectionTitle";
import { lcaUSAJobsGql } from "@/graphql/jobs";
import { queryClient } from "@/utils/graphql-client";
import React, { useEffect, useState } from "react";

const LCA = () => {
  const [lca, setLca] = useState([]);
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const L: { jobLists: any } = await queryClient.request(lcaUSAJobsGql);

        if (L?.jobLists) {
          setLca(
            L.jobLists.map((el: any) => ({
              title: el?.title,
              lcaDetails: el?.lca?.raw?.children,
            }))
          );
        }
      } catch (error) {
        console.log(`Error in fetching content: ${error}`);
      }
    };
    fetchFunc();
  }, []);

  console.log(lca, "all lca");

  return (
    <div>
      <div className="h-full py-44 bg-primary text-white grid place-items-center text-center">
        <div>
          <h1 className="text-xl md:text-3xl lg:text-3xl font-bold text-white">
            Labor Condition Applications
          </h1>
          <p className="text-white pt-3 text-lg">
            Labor Condition Applications (LCAs) are displayed below in
            accordance with U.S. Department of Labor regulations.
          </p>
        </div>
      </div>
      <div className="max-w-5xl w-11/12 mx-auto py-12">
        <SectionTitleComponent title="LCAs" />
        <div>
          {lca?.map((el: any) => (
            <Accordion
              key={el?.title}
              title={el?.title}
              content={el?.lcaDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LCA;
