import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { OnboardingModal } from "@/components/ui/OnboardingModal";
import { AuthModal } from "@/components/ui/AuthModal";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-marker",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JUDGE ME ⚖ — Give us something. We'll judge it.",
  description:
    "The internet's ultimate AI-powered courtroom. Submit photos, bios, outfits, dating profiles, or questionable choices and receive dramatic, funny AI judgments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} ${permanentMarker.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white">
        <AuthProvider>
          <UserProvider>
            <OnboardingModal />
            <AuthModal />
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}



