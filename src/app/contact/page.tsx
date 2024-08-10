import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Intellara",
  description: "This is Contact Page for Intellara",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us!"
        description="Need assistance or have questions? Reach out via the form below or contact us directly via email or phone.We're here to help!"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
