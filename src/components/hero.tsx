import React from "react";
import BlurFade from "./ui/blur-fade";

export default function Hero() {
  return (
    <div className="grid h-screen place-content-center items-center pt-14 sm:pt-10">
      <h1 className="font-heading text-center flex gap-2 text-6xl tracking-tight italic">
        <BlurFade>rene&apos;s</BlurFade> <BlurFade delay={0.1}>studio</BlurFade>
      </h1>
      <BlurFade delay={0.15}>
        <p className="mt-4 text-sm text-gray-500 uppercase text-center">
          Pixels, Passion, and Possibilities / Year 2025
        </p>
      </BlurFade>{" "}
    </div>
  );
}
