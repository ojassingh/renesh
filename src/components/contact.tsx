import { FC } from "react";
import { EmailButton } from "./ui/email-button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "./ui/contact-form";

const Contact: FC = () => {
  return (
    <div id="contact" className="sm:pt-20 pt-10 px-4 sm:px-0">
      <p className="max-w-max rounded-lg border px-2 py-1 text-sm">CONTACT</p>
      <div className="mt-4 sm:flex justify-between rounded-lg bg-neutral-200/60 sm:p-8 p-4 shadow-md backdrop-blur-sm">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-medium">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-4 max-w-md text-neutral-500">
            Email us or complete the form to learn how we can help you with our
            services.
          </p>
          <EmailButton className="mt-2" />
          <Link
            href="https://www.linkedin.com/company/vsingh-associates"
            target="_blank"
            className="group underline"
          >
            <p className="flex items-center">
              Linkedin
              <ArrowUpRight className="mr-1 size-4 rotate-45 opacity-0 duration-300 group-hover:ml-1 group-hover:rotate-0 group-hover:opacity-100" />
            </p>
          </Link>
          <div className="sm:mt-10 mt-6 grid sm:flex max-w-lg gap-4">
            <div className="">
              <h3 className="text-gray-800">Client Support</h3>
              <p className="text-sm text-gray-500">
                For any inquiries or assistance, feel free to reach out to us.
              </p>
            </div>
            <div className="">
              <h3 className="text-gray-800">Feedback and Suggestions</h3>
              <p className="text-sm text-gray-500">
                We value your feedback! Share your thoughts and suggestions with
                us.
              </p>
            </div>
          </div>
        </div>
        <ContactForm className="sm:mt-0 mt-4" />
      </div>
    </div>
  );
};

export default Contact;
