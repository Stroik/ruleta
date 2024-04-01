import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaker selector",
  description:
    "Hecho por Augusto Marinaro para las daily meetings de AI Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <header>
          <div className="logo">
            <h1>
              <Link href="/">Speaker selector</Link>
            </h1>
          </div>
          <nav>
            <Link href="/participants">Participantes</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <small>Made with ❤️</small>
        </footer>
      </body>
    </html>
  );
}
