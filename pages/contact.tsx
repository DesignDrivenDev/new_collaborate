import { useState } from "react";
import { toast } from "react-hot-toast";
import Select from "react-select";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { mutationClient, queryClient } from "@/utils/graphql-client";
import { servicesNameGql } from "@/graphql/services";
const PhoneInput = dynamic(() => import("react-phone-input-2"), {});
import "react-phone-input-2/lib/style.css";
import { addresses } from "@/utils/common";
import { addInquiryGql } from "@/graphql/inquiry";
import { CountryData } from "react-phone-input-2";
import SEO from "@/components/common/seo";

type TContact = {
  services: { title: string; slug: string }[];
};

export const getServerSideProps = (async () => {
  const s: { services: { title: string; slug: string }[] } =
    await queryClient.request(servicesNameGql);

  if (s?.services) {
    return {
      props: {
        services: [...s.services, { title: "Other", slug: "other" }],
      },
    };
  }
  return { props: { services: [] } };
}) satisfies GetServerSideProps<TContact>;

const Contact = (props: TContact) => {
  const { services } = props;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    services: { label: string; value: string }[];
    other: string;
    location: string;
    company: string;
    name: string;
    email: string;
    phone: string;
  }>({
    services: [],
    other: "",
    location: "",
    company: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !formData.email ||
      !formData.name ||
      !formData.phone ||
      !formData.services.length ||
      !formData.location ||
      !formData.company
    ) {
      toast.error("Please provide all the details!");

      setLoading(false);
      return;
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        formData.email.toString()
      )
    ) {
      toast.error("Please provide a valid email id.");
      setLoading(false);
      return;
    }

    await mutationClient.request(addInquiryGql, {
      name: `${formData.name}`,
      email: `${formData.email}`,
      mobileNumber: `${formData.phone}`,
      companyName: `${formData.company}`,
      location: `${formData.location}`,
      services: {
        // connect: formData?.services.map((el) => ({ slug: el?.value })),
        connect: formData.services
          .filter((item) => item?.value !== "other")
          .map((el) => ({ slug: el?.value })),
      },
      other: `${formData?.other}`,
    });

    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        services: formData.services
          .filter((item) => item?.label !== "Other")
          .map((el) => el?.label),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success == "false") {
          throw data.error;
        }
        toast.success(
          "Your enquiry has been submitted successfully. We'll get back to you at our earliest.",
          { duration: 3000 }
        );
        setLoading(false);
      })
      .then(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          services: [],
          other: "",
          location: "",
          company: "",
        });
      })
      .catch((e) => {
        setLoading(false);
        toast.error("Something went wrong. Please try again, or email us.");
      });
    // setFormData({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   services: [],
    //   other: "",
    //   location: "",
    //   company: "",
    // });
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      // background: "#fff",
      borderColor: "#9dabcf",
      minHeight: "42px",
      boxShadow: state.isFocused ? null : null,
    }),
  };

  return (
    <div className="bg-gray-100">
      <SEO
        title="Contact - Collaborate Solutions"
        description="Get in touch with us for Technology Solutions & Digital Transformation Services"
        href="https://collaboratesolutions.com/contact"
        imgSrc={"../assets/logo.png"}
      />
      <div className="py-52 bg-primary">
        <div className="max-w-7xl mx-auto w-11/12">
          <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-white">
            Contact Us
          </h1>
          <p className="text-white pt-3 text-lg">
            {`Thank you for visiting our website. We appreciate your interest and
            look forward to hearing from you.`}
          </p>
        </div>
      </div>
      <div className="relative z-0 pb-10 md:pb-20">
        <div className="mx-auto grid w-11/12 max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 -mt-32">
          <div className="w-full bg-white p-8 rounded-lg shadow-lg">
            <div className="">
              <form name="Contact Form" className=" grid grid-cols-1 gap-y-8 ">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="services"
                    className="block text-sm font-medium text-gray-700"
                  >
                    How can we help you?*
                  </label>
                  <div className="mt-1">
                    <Select<{ label: string; value: string }, true>
                      onChange={(e: any) => {
                        setFormData((prev) => ({
                          ...prev,
                          services: e.map((el: any) => ({
                            label: el.label,
                            value: el.value,
                          })),
                        }));
                      }}
                      name="services"
                      value={formData.services}
                      isMulti
                      getOptionValue={(e: any) => e.value}
                      getOptionLabel={(e: any) => e.label}
                      options={services.map((el) => ({
                        label: el.title,
                        value: el.slug,
                      }))}
                      styles={customStyles}
                    />
                  </div>

                  <div>
                    {formData.services.some(
                      (item) => item.label === "Other"
                    ) && (
                      <>
                        <label
                          htmlFor="Other"
                          className="block text-sm font-medium text-gray-700 mt-3"
                        >
                          Other Requirement
                        </label>
                        <textarea
                          value={formData.other}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              other: e.target.value,
                            }))
                          }
                          rows={3}
                          className="mt-1 sm:text-md block  w-full rounded border border-primary/40 p-2 outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-sm"
                          placeholder="Let us know. how we can help?"
                        ></textarea>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location*
                  </label>
                  <div className="mt-1">
                    <input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      type="text"
                      name="location"
                      id="location"
                      className="sm:text-md block h-10 w-full rounded border border-primary/40 px-2 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name*
                  </label>
                  <div className="mt-1">
                    <input
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="organization"
                      className="sm:text-md block h-10 w-full rounded border border-primary/40 px-2 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name*
                  </label>
                  <div className="mt-1">
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="sm:text-md block h-10 w-full rounded border border-primary/40 px-2 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email*
                  </label>
                  <div className="mt-1">
                    <input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="sm:text-md block h-10 w-full rounded border border-primary/40 px-2 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                  </div>
                  <div className="mt-1">
                    <PhoneInput
                      inputProps={{
                        name: "phone",
                      }}
                      country={"in"}
                      preferredCountries={["us", "ca", "sg", "ae", "in"]}
                      inputClass="!w-full !border-none !outline-none px-2 !h-10"
                      searchClass="!bg-primary"
                      buttonClass="!bg-transparent !outline-none !border-none"
                      containerClass="block w-full !border-1 sm:text-md block w-full rounded border border-primary/40 outline-none focus:border-primary focus:ring-primary"
                      value={formData.phone}
                      onChange={(value, data, event, formattedValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          phone: `+${
                            (data as CountryData).dialCode
                          } ${value.slice(
                            (data as CountryData).dialCode.length
                          )}`,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="text-right sm:col-span-2">
                  {/* <MainButton
                    name={loading ? "Submitting..." : "Submit"}
                    OnClick={(e: any) => {
                      e.preventDefault();
                      if (!loading) {
                        handleSubmit();
                      }
                    }}
                  /> */}
                  {/* <Button
                    onClick={(e) => {
                      e.preventDefault()
                      handleSubmit()
                    }}
                    variant={"outline"}
                    className="px-7 text-base hover:bg-primary hover:text-white transition-colors transform duration-500"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button> */}
                  <button
                    type="button"
                    className="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white disabled:bg-primary/60"
                    disabled={
                      loading ||
                      formData.services.length < 1 ||
                      formData.name === "" ||
                      formData.email === "" ||
                      formData.phone === "" ||
                      formData.company === "" ||
                      formData.location === ""
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mx-auto w-11/12  grid place-items-center">
            <div>
              <div className="">
                <div className="flex flex-wrap flex-row gap-8 justify-center items-center">
                  {addresses.map((address) => (
                    <div
                      key={address.name}
                      className="w-full bg-secondary p-8 rounded-lg space-y-2"
                    >
                      <h2 className="text-xl font-extrabold">{address.name}</h2>
                      <div className="flex gap-2 justify-start items-start hover:text-primary">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                        </span>
                        <p>{address.location}</p>
                      </div>
                      <div className="flex gap-2 justify-start items-start hover:text-primary">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                            />
                          </svg>
                        </span>
                        <a href={`tel:${address?.phone}`} target="_blank">
                          {address.phone}
                        </a>
                      </div>
                      <div className="flex gap-2 justify-start items-start hover:text-primary">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                          </svg>
                        </span>
                        <a href={`mailto:${address?.mail}`} target="_blank">
                          {address.mail}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
