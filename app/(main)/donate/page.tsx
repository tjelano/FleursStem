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
            Jouw donatie helpt mij om mijn missie voort te zetten en meer mensen te bereiken.<br /><br />
            Donaties worden vrijblijvend gegeven, zonder tegenprestatie, en stellen mij in staat mijn werk onafhankelijk voort te zetten. Ze dragen direct bij aan de dekking van reiskosten, aanschaf van materiaal en de investering in diepgravend onderzoek. Op deze manier steun je niet alleen mijn inzet, maar ook de verhalen en waarheden die verteld móéten worden.<br /><br />
            En soms… is het ook gewoon een kopje koffie na een lange zitting.
            Donaties via Tikkie zijn vrijwillig en zonder tegenprestatie. Misbruik (zoals pesterijen of laster via betaalverzoeken) wordt niet getolereerd en kan juridische gevolgen hebben.
          </p>
        </div>

        {/* Donation Form */}
        <DonationForm />
      </div>
    </div>
  );
} 