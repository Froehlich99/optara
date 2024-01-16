import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientApplication from "./ClientApplication";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CB Bank",
  description: "Website der CB Bank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body>
          <ClientApplication>
            <Navbar />
            <main className="relative overflow-hidden">{children}</main>
          </ClientApplication>
        </body>
      </html>
    </ClerkProvider>
  );
}
