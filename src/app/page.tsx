import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Featured } from "@/components/home/Featured";
import { EmilySection } from "@/components/home/EmilySection";
import { Process } from "@/components/home/Process";
import { Suburbs } from "@/components/home/Suburbs";
import { Testimonials } from "@/components/home/Testimonials";
import { TeamStrip } from "@/components/home/TeamStrip";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Featured />
      <EmilySection />
      <Process />
      <Suburbs />
      <Testimonials />
      <TeamStrip />
      <CTA />
    </>
  );
}
