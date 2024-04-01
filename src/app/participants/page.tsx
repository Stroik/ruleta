import { EditTable } from "@/components/EditTable";
import type { Metadata } from "next";
import { getData } from "../page";

export const metadata: Metadata = {
  title: "Speaker selector - Participantes",
  description:
    "Hecho por Augusto Marinaro para las daily meetings de AI Services",
};

export default async function Participants() {
  const participants = await getData();

  return (
    <section>
      <h1>Participants</h1>
      <EditTable key={participants} participants={participants} />
    </section>
  );
}
