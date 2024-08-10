"use client"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SectionTitle from "../Common/SectionTitle"; // Adjust the path as per your directory structure

const index = () => {
  const router = useRouter();

  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {/* Assuming checkIcon is defined elsewhere */}
        {/* {checkIcon} */}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-6">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="We Respect Your Privacy!"
                paragraph="Explore our platform tailored for smart automation and project solutions. We specialize in creative design and virtual reality experiences, offering immersive storytelling and interactive art installations that respect your privacy and uphold stringent data protection measures. With a steadfast commitment to creativity and innovation, we foster an environment where teams can thrive, leveraging secure technologies to drive impactful transformations."
                mb="44px"
              >
                 </SectionTitle>
                 <div
                className="mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Task Automation" />
                    <List text="Premimum Quality" />
                    <List text="Timely Updates" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Security & Compliance" />
                    <List text="Data Analytics & Insights" />
                    <List text="Efficiency Enhancement" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;