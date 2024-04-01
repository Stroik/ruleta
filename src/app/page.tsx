import { unstable_noStore as noStore } from "next/cache";
import { Roulette } from "@/components/Roulette";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaker selector - Home",
  description:
    "Hecho por Augusto Marinaro para las daily meetings de AI Services",
};

export async function getData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participants`, {
    cache: "no-store"
  });
  const data = await response.json();
  return data;
}

export default async function Home() {
  noStore();
  const participants = await getData();

  return (
    <section>
      <Roulette participants={participants} />
    </section>
  );
}
