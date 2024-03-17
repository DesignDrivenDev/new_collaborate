import { queryClient, mutationClient } from "@/utils/graphql-client";
import { gql } from "graphql-request";
import { notFound } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
// import { IJobDet } from "../page"
import { RichText } from "@graphcms/rich-text-react-renderer";
// import { Textarea } from "@/app/components/ui/textarea"
// import { Button } from "@/app/components/ui/button"
import { toast } from "react-hot-toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
import Share from "@/components/common/share";
import { GetStaticPaths } from "next";
import { jobsHomeGql } from "@/graphql/jobs";
import SEO from "@/components/common/seo";

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

const jobQuery = gql`
  query MyQuery($slug: String) {
    jobLists(where: { slug: $slug }) {
      title
      slug
      experience
      salary
      location
      jobDetails {
        raw
      }
      lca {
        raw
      }
    }
  }
`;

interface formData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  file: null | File;
}

const jobMutation = gql`
  mutation (
    $jobTitle: String
    $fullName: String
    $email: String
    $phone: String
    $description: String
    $cvId: ID
  ) {
    createJobApplication(
      data: {
        jobTitle: $jobTitle
        fullName: $fullName
        email: $email
        phone: $phone
        description: $description
        cv: { connect: { id: $cvId } }
      }
    ) {
      id
      fullName
      email
      phone
      cv {
        url
      }
    }
  }
`;

const JobDetails = ({ data }: { data?: IJobDet }) => {
  //   const { slug } = params
  //   const [data, setData] = useState<IJobDet>()

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useRef<HTMLFormElement | null>(null);

  const fileTypes = [
    ".msword",
    ".pdf",
    ".rtf",
    ".vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const [contactFormData, setContactFormData] = useState<formData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    file: null,
  });

  //   useEffect(() => {
  //     async function getJobDetails(slug: string) {
  //       const { jobLists }: { jobLists: IJobDet[] } = await queryClient.request(
  //         jobQuery,
  //         {
  //           slug,
  //         }
  //       )

  //       if (!jobLists) {
  //         return notFound()
  //       }
  //       setData(jobLists[0])
  //     }
  //     getJobDetails(slug)
  //   }, [])

  async function handleSubmit() {
    setLoading(true);
    if (typeof form !== null) {
      if (
        !contactFormData.email ||
        !contactFormData.fullName ||
        !contactFormData.message ||
        !contactFormData.phone ||
        !contactFormData.file
      ) {
        setLoading(false);
        toast.error("Please provide all the details!");
        return;
      }

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          contactFormData.email.toString()
        )
      ) {
        setLoading(false);
        toast.error("Please provide a valid email id.");
        return;
      }
      // Type Check
      const fileType =
        contactFormData.file.type === "audio/x-wav"
          ? ".wav"
          : `.${contactFormData.file.type.replace(/(.*)\//g, "")}`;
      if (!fileTypes.includes(fileType)) {
        setLoading(false);
        toast.error(
          `Invalid File Type. Please attach a .pdf, .doc or a .rtf file.`
        );
        return;
      }
      if (contactFormData?.file?.size > 5000000) {
        setLoading(false);
        toast.error(`File should be less than than 5MB`);
        return;
      }

      // Uploading the CV to HyGraph assets.

      const form = new FormData();

      form.set("fileUpload", contactFormData.file);

      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_HYGRAPH_URL}/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
            },
            body: form,
          }
        );

        const res = await req.json();

        // Adding a new job application, referencing the ID.
        const { createJobApplication }: { createJobApplication: any } =
          await mutationClient.request(jobMutation, {
            jobTitle: `${data?.title}`,
            fullName: `${contactFormData.fullName}`,
            email: `${contactFormData.email}`,
            phone: `${contactFormData.phone}`,
            description: `${contactFormData.message}`,
            cvId: `${res.id}`,
          });

        // Passing the data, including the CV URL given by hygraph, to our email API.
        fetch("/api/jobApp", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data?.title,
            email: contactFormData.email,
            name: contactFormData.fullName,
            phone: contactFormData.phone,
            desc: contactFormData.message,
            cvUrl: createJobApplication?.cv?.url,
          }),
        });

        setLoading(false);
        toast.success(
          "Your application has been received. We will get back to you as soon as we can.",
          { duration: 5000 }
        );

        setContactFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          file: null,
        });

        setOpenModal(false);
      } catch (err) {
        setLoading(false);
        console.log(err, "error");
        toast.error("Something went wrong. Please try again later.");
      }
    }
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <SEO
        title={data?.title}
        description="Latest jobs in Technology & IT in Massachusetts"
        href="https://collaboratesolutions.com/careers"
        imgSrc={"../assets/logo.png"}
      />
      <div className="pt-40 pb-16 bg-primary text-white">
        <div className=" max-w-5xl mx-auto w-11/12">
          <div className="flex flex-col md:flex-row gap-7 justify-between items-start">
            <div>
              <h1 className="text-3xl pb-5">{data?.title}</h1>
              <div>
                <p>{data?.location}</p>
                <p>{data?.salary}</p>
                <p>{data?.experience}</p>
              </div>
            </div>
            <div>
              <div className="flex  justify-center pt-6">
                <Share
                  shareURL={`http://localhost:3000/careers/${data?.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-11/12 py-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <div className="bg-primary p-4 rounded-lg divide-y-2 text-white mt-12 h-fit md:!sticky md:top-24">
            <div className="p-4">
              <div className="text-xl py-4 flex justify-start items-center gap-2">
                <svg
                  width="24"
                  height="26"
                  viewBox="0 0 28 30"
                  className="fill-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.9746 0.0644531C9.69923 0.404297 6.82814 2.41992 5.31056 5.42578C5.05861 5.92969 4.66017 7.08398 4.54298 7.67578C4.10939 9.80859 4.39064 11.9883 5.334 13.9102C5.47462 14.1973 7.33205 17.1504 9.459 20.4727C12.3301 24.9551 13.3789 26.5488 13.5254 26.6426C13.7949 26.8242 14.2051 26.8242 14.4746 26.6426C14.6152 26.5488 15.6817 24.9375 18.5235 20.5078C20.6445 17.2031 22.5078 14.2383 22.666 13.916C23.7676 11.6719 23.961 9.07031 23.1934 6.7207C22.7012 5.21484 21.9336 3.96094 20.8203 2.84766C18.7402 0.767578 15.8985 -0.240234 12.9746 0.0644531ZM15.084 5.4082C16.6602 5.84766 17.8848 7.0957 18.2832 8.67188C18.3301 8.85352 18.3652 9.28711 18.3652 9.66797C18.3652 10.3887 18.2949 10.7695 18.0547 11.3379C17.5098 12.6211 16.3555 13.6055 14.9961 13.9512C14.5801 14.0566 13.4199 14.0566 13.0039 13.9512C11.6445 13.6055 10.4902 12.6211 9.94533 11.3379C9.70509 10.7695 9.63478 10.3887 9.63478 9.66797C9.63478 8.94727 9.70509 8.56641 9.94533 7.99805C10.4902 6.70898 11.7324 5.6543 13.0039 5.39648C13.1797 5.36133 13.3789 5.32031 13.4434 5.30859C13.6602 5.25586 14.7852 5.32617 15.084 5.4082Z" />
                  <path d="M6.28907 20.4199C2.02344 21.6094 0.066409 23.6602 1.09766 25.8574C1.28516 26.2676 1.82422 26.877 2.33985 27.2754C4.04492 28.582 7.26172 29.5254 11.2754 29.8945C12.3477 29.9941 15.6523 29.9941 16.7246 29.8945C20.7383 29.5254 23.9551 28.582 25.6602 27.2754C26.1758 26.877 26.7148 26.2676 26.9023 25.8574C27.9395 23.6426 25.9004 21.5449 21.5938 20.3906C21.0195 20.2383 20.8848 20.2207 20.8262 20.2852C20.7852 20.3262 19.8008 21.8613 18.6289 23.7012C17.457 25.541 16.3965 27.1699 16.2734 27.334C15.1367 28.8047 12.8047 28.7988 11.709 27.3223C11.5918 27.1699 10.5137 25.5059 9.3125 23.625C8.11719 21.75 7.10352 20.2148 7.0625 20.2207C7.02735 20.2207 6.67578 20.3145 6.28907 20.4199Z" />
                </svg>

                <span className="text-lg md:text-xl">Location:</span>
              </div>
              <h2 className="text-sm">{data?.location}</h2>
            </div>
            <div className="p-4">
              <div className="text-xl py-4 flex justify-start items-center gap-2">
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                >
                  <path
                    fillRule="evenodd"
                    clip-rule="evenodd"
                    d="M20.3878 19.0136C21.1328 17.4423 22.5859 16.6773 24.2344 16.4628C27.2712 16.0679 29.5074 19.2001 28.9742 21.9785C28.5941 23.9595 26.8929 25.33 24.9434 25.5694C21.4128 26.003 18.9199 22.11 20.3878 19.0136ZM22.3907 19.9526C22.7709 19.1466 23.5124 18.7543 24.3536 18.6443C25.9033 18.4417 27.0443 20.0482 26.7723 21.4732C26.5783 22.4892 25.7102 23.1921 24.7154 23.3149C22.9138 23.5373 21.6417 21.5407 22.3907 19.9526Z"
                  />
                  <path
                    fillRule="evenodd"
                    clip-rule="evenodd"
                    d="M10.8925 0.966813V6.05861C10.8925 6.17574 10.8984 6.30249 10.9044 6.43423C10.9304 6.99739 10.9605 7.65162 10.5565 8.03455C10.1786 8.39266 9.52597 8.35826 8.97323 8.32913C8.83078 8.32163 8.69497 8.31447 8.5722 8.31447H3.60931V21.6563V24.8789C3.60931 24.9361 3.60838 24.9946 3.60743 25.054C3.60051 25.4877 3.59291 25.9646 3.94376 26.2699C4.22138 26.5114 4.60875 26.502 4.96513 26.4934H4.96516C5.03015 26.4918 5.09411 26.4902 5.15618 26.4902H7.92767H19.0781C19.0781 26.2662 19.0907 26.0281 19.1037 25.7851C19.1329 25.2367 19.1635 24.6632 19.0527 24.1699C18.9582 23.7493 18.8077 23.3623 18.6582 22.978C18.4102 22.3405 18.1652 21.7106 18.184 20.9473C18.2716 17.3999 21.7927 13.951 25.4589 14.8242V4.834V2.44923C25.4589 2.41726 25.4591 2.3851 25.4593 2.35282C25.4613 1.96299 25.4635 1.55564 25.1668 1.25894C24.8701 0.962246 24.4628 0.964405 24.0729 0.966471C24.0406 0.966642 24.0085 0.966813 23.9765 0.966813H21.3984H10.8925ZM4.18939 6.57423H9.15228V1.54689L7.66986 2.90041L5.34979 5.22072L4.18939 6.57423ZM7.92774 10.2257C7.1496 10.4709 7.17673 11.6134 7.92774 11.8688C8.54985 12.0803 9.39685 12.0216 10.1693 11.9681C10.4957 11.9455 10.8087 11.9238 11.0859 11.9238H18.0468H20.3027C20.3556 11.9238 20.4094 11.9248 20.4636 11.9258L20.4637 11.9258C20.7858 11.9317 21.1224 11.9378 21.3916 11.7399C21.9832 11.305 21.7293 10.3106 21.0117 10.1974C20.3693 10.096 19.6688 10.1264 18.9857 10.1561H18.9856C18.6664 10.1699 18.3509 10.1836 18.0468 10.1836H12.1171H9.28119C9.1643 10.1836 9.0389 10.177 8.91007 10.1702H8.91006C8.57609 10.1527 8.21909 10.1339 7.92774 10.2257ZM7.99213 13.8289C7.19439 14.0385 7.1146 15.2349 7.92774 15.4911C8.46944 15.6619 9.18243 15.6142 9.83937 15.5702L9.83939 15.5702C10.1207 15.5514 10.3918 15.5332 10.6347 15.5332H16.5644C16.7687 15.5332 17.0256 15.5535 17.3053 15.5756C18.0833 15.6371 19.0375 15.7125 19.5265 15.4037C20.2253 14.9622 19.9094 13.9265 19.1425 13.8068C18.6222 13.7255 18.0578 13.749 17.5066 13.7719C17.2523 13.7825 17.0008 13.793 16.7578 13.793H11.9238C11.5518 13.793 11.1447 13.7672 10.7253 13.7406C9.78992 13.6814 8.79382 13.6183 7.99213 13.8289ZM7.86328 19.0948C6.98233 18.7564 7.32052 17.5865 8.12103 17.4325C8.76516 17.3086 9.48512 17.3419 10.1814 17.374C10.4904 17.3883 10.7948 17.4024 11.0859 17.4024C11.5425 17.4024 12.0079 17.3875 12.4761 17.3726C13.4581 17.3414 14.4524 17.3097 15.4042 17.4136C16.2128 17.5018 16.7134 18.6054 15.8544 19.0487C15.4664 19.249 14.8533 19.206 14.3232 19.1688C14.1305 19.1553 13.9488 19.1426 13.7929 19.1426H9.6679C9.51644 19.1426 9.34467 19.1543 9.16496 19.1666C8.7165 19.1972 8.21855 19.2312 7.86328 19.0948Z"
                  />
                  <path d="M20.8186 26.168C20.8186 27.7245 20.7155 29.3206 20.8244 30.873C20.8693 31.5142 21.2094 32.0335 21.9143 31.9617C22.5708 31.895 23.2799 31.0987 23.7834 30.707C23.9708 30.5612 24.2407 30.275 24.4924 30.266C24.7646 30.2563 25.0674 30.5882 25.2658 30.7441C25.7573 31.1303 26.4317 31.8724 27.0705 31.9565C27.6157 32.0283 28.0848 31.6806 28.1543 31.1309C28.3569 29.5296 28.1662 27.783 28.1662 26.168C26.2574 26.9905 24.7454 27.7031 22.6233 27.0222C21.9804 26.816 21.4402 26.4032 20.8186 26.168Z" />
                </svg>

                <span className="text-lg md:text-xl">Experience:</span>
              </div>
              <h2 className="text-sm">{data?.experience}</h2>
            </div>
          </div>

          <div className="mt-12">
            <div className="">
              <h2 className="font-bold text-lg md:text-xl !text-primary">
                Job Responsibilities
              </h2>
              {data?.jobDetails && (
                <div className="prose prose-slate pt-4 text-lg space-y-3">
                  <RichText content={data?.jobDetails?.raw?.children} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await queryClient.request<{ jobLists: any }>(jobsHomeGql);

    return {
      paths: res?.jobLists?.map((blog: any) => ({
        params: { slug: blog.slug },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export async function getStaticProps({ params }: { params: any }) {
  try {
    const s = await queryClient.request<{ jobLists: IJobDet[] }>(jobQuery, {
      slug: params.slug,
    });

    // const c = await queryClient.request<{ caseStudies: ICaseStudiesRelated[] }>(
    //   relatedCaseStudiesGql
    // )

    if (s.jobLists.length === 0) {
      return {
        props: { data: undefined },
        notFound: true,
      };
    }

    return {
      props: { data: s.jobLists[0] },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: undefined },
      notFound: true,
    };
  }
}

export default JobDetails;
