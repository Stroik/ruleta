import { EditTable } from "@/components/EditTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaker selector - Participantes",
  description:
    "Hecho por Augusto Marinaro para las daily meetings de AI Services",
};

async function getData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/participants`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export default async function Participants() {
  const participants = await getData();

  return (
    <section>
      <h1>Participants</h1>
      <EditTable key={participants} participants={participants} />
    </section>
  );
}
