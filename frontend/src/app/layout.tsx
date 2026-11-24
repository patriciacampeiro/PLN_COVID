import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PLN & Mineração de Texto | Análise da COVID-19 (2020–2023)",
  description: "Plataforma educacional institucional para a disciplina Mineração de Texto e Linguagem Natural em Engenharia de Software. Laboratório interativo e estudos de caso reais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-slate-900 dark:text-academic-slate-100 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
