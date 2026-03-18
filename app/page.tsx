import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Services from "@/components/Service";
import Testimonials from "@/components/Testinomial";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Services/>
    <Process/>
    <About/>
    <Testimonials/>
    <Footer/>
    </>
  );
}