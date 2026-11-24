import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CovidContextSection } from "@/components/home/CovidContextSection";
import { QuickDemoSection } from "@/components/home/QuickDemoSection";
import { ModulesOverviewSection } from "@/components/home/ModulesOverviewSection";
import { PedagogySection } from "@/components/home/PedagogySection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <CovidContextSection />
      <QuickDemoSection />
      <ModulesOverviewSection />
      <PedagogySection />
    </div>
  );
}
