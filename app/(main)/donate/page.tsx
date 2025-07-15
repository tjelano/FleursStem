import { Metadata } from "next";
import DonationForm from "@/components/DonationForm";

export const metadata: Metadata = {
  title: "Doneer - Fleur's Stem",
  description: "Steun Fleur's Stem met een donatie. Jouw bijdrage helpt ons om onze missie voort te zetten.",
};

export default function DonatePage() {
  return (
    <div className="my-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Doneer aan Fleur's Stem
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jouw donatie helpt ons om onze missie voort te zetten en meer mensen te bereiken. 
            Elke bijdrage, hoe klein ook, maakt een verschil.
          </p>
        </div>

        {/* Donation Form */}
        <DonationForm />
      </div>
    </div>
  );
} 