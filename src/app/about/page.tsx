import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Intellara",
  description: "This is About Page for Intellara",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Welcome to Intellara"
        description="Intellara helps you bring your project to life with the help of virtual assistants. We offer a platform of software tools, and NLP models  and dynamic chatbots to enhance your Project Management experience , revolutionizing efficiency,collaborations and user centric outcomes.  "
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
