"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function DonationForm() {
  const [amount, setAmount] = useState(10);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!amount || isNaN(Number(amount)) || Number(amount) < 1) {
      setError("Voer een geldig bedrag in (minimaal €1)");
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          setError("Er is iets misgegaan. Probeer het later opnieuw.");
        }
      } catch (err) {
        setError("Er is iets misgegaan. Probeer het later opnieuw.");
      }
    });
  }

  return (
    <form
      onSubmit={handleDonate}
      className="flex flex-col items-center gap-4 mt-12 max-w-md mx-auto bg-card p-6 rounded-2xl border border-accent"
    >
      <label htmlFor="donation-amount" className="font-medium text-accent">
        Kies een bedrag om te doneren
      </label>
      <div className="flex items-center gap-2">
        <input
          id="donation-amount"
          type="number"
          min={1}
          step={1}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="w-24 px-3 py-2 rounded-md border border-accent bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <span className="text-lg text-accent font-bold">€</span>
      </div>
      <Button
        type="submit"
        variant="default"
        className="bg-accent text-accent-foreground border border-accent hover:bg-accent/80 font-medium w-full"
        disabled={loading}
      >
        {loading ? "Even geduld..." : "Doneer →"}
      </Button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
} 