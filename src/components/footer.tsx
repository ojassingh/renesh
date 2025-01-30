import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="w-full py-8 px-4 sm:px-0">
      <hr />
      <div className="flex justify-between pt-6">
        <p className="text-sm text-gray-500">
          © 2025 Vandana Singh and Associates. All rights reserved.
        </p>
        <Link
          href="https://www.linkedin.com/company/vsingh-associates"
          target="_blank"
          className="opacity-70"
        >
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
