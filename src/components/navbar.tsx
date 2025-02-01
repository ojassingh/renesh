import { FC } from "react";
// import BlurFade from "./ui/blur-fade";
import Link from "next/link";
import ComesInGoesOutUnderline from "./ui/underline";
import { ArrowDown } from "lucide-react";
import HamburgerMenu from "./ui/hamburger-menu";
import logo from "@/../public/icon.png";
import Image from "next/image";
import BlurFade from "./ui/blur-fade";

export const navLinks = [
  {
    label: "about",
    href: "/#about",
  },
  {
    label: "projects",
    href: "/#projects",
  },
  {
    label: "contact",
    href: "/#contact",
  },
];

const Navbar: FC = () => {
  return (
      <div className="fixed top-2 left-1/2 z-30 flex w-full -translate-x-1/2 transform items-center justify-between px-10 py-4">
        <Image src={logo} alt="logo" className="h-10 w-10 invert" />
        <div className=" hidden items-center gap-4 text-black sm:flex ">
          {navLinks.map(({ label, href }, index) => (
            <BlurFade key={index} delay={0.15 + index * 0.05}>
              <Link
                key={index}
                href={href}
                className="group uppercase flex max-w-max items-center text-sm "
              >
                <ComesInGoesOutUnderline
                  label={label}
                  className="hidden sm:block"
                />
                <span className="block sm:hidden">{label}</span>
              </Link>
            </BlurFade>
          ))}
        </div>
        <HamburgerMenu />
      </div>
  );
};

export default Navbar;
