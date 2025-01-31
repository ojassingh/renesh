'use client'
import Hero from "@/components/hero";
import grain from "@/../public/grain.jpg";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Scene from "@/components/background";
import { motion } from "motion/react"

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <div
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url(${grain.src})`,
        }}
      ></div>
      <motion.div initial={{opacity: 0}} animate={{opacity: 100, transition: {duration: 4}}} className="fixed inset-0 -z-10 blur-sm">
        <Scene />
      </motion.div>
      <main className="relative z-10">
        <Hero />
      </main>
    </main>
  );
}
