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
            Jouw donatie helpt mij mijn missie voort te zetten en meer mensen te bereiken.<br /><br />
            Donaties zijn volledig vrijblijvend en zonder tegenprestatie. Ze maken het mogelijk om mijn werk onafhankelijk voort te zetten en dragen direct bij aan de dekking van reiskosten, de aanschaf van materialen en investeringen in diepgravend onderzoek.<br /><br />
            Met jouw steun maak je niet alleen mijn inzet mogelijk, maar help je ook om verhalen en waarheden te belichten die gehoord móéten worden.
            En soms… is het gewoon een broodnodig kopje koffie na een lange zittingsdag.
            Donaties via Tikkie zijn vrijwillig en zonder enige verplichting. Misbruik, zoals pesterijen of laster via betaalverzoeken, wordt niet getolereerd en kan juridische gevolgen hebben.
          </p>
        </div>

        {/* Donation Form */}
        <DonationForm />
      </div>
    </div>
  );
} 