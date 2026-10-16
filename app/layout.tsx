import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RotaSegura · Plataforma de Gestão Logística",
  description:
    "Sistema corporativo de gestão de rotas, frotas e operações logísticas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}