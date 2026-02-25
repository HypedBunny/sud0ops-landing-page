import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Clients } from "@/components/sections/Clients";
import { Approach } from "@/components/sections/Approach";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />
      <About />
      <Capabilities />
      <Clients />
      <Approach />
    </div>
  );
}
