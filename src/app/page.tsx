import Hero from "@/components/hero";
import grain from "@/../public/grain.jpg";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl overflow-x-hidden sm:overflow-x-visible">
      <div
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url(${grain.src})`,
        }}
      ></div>
      {/* <Navbar /> */}
      <Hero />
      {/* <Footer /> */}
    </main>
  );
}
