import type { Metadata } from "next";
import { Playfair_Display, Courier_Prime, Permanent_Marker, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import { OnboardingModal } from "@/components/ui/OnboardingModal";
import { AuthModal } from "@/components/ui/AuthModal";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  variable: "--font-typewriter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-stamp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JUDGE ME AI ⚖ — Court of Public Opinion",
  description:
    "The internet's ultimate AI-powered courtroom. Submit exhibits, bios, outfits, or questionable choices to face the supreme AI Bench.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="crimson"
      className={`${playfairDisplay.variable} ${courierPrime.variable} ${jetbrainsMono.variable} ${permanentMarker.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col selection:bg-red-600 selection:text-white">
        <ThemeProvider>
          <SoundProvider>
            <AuthProvider>
              <UserProvider>
                <OnboardingModal />
                <AuthModal />
                <Navbar />
                <div className="flex-1">{children}</div>
                <Footer />
              </UserProvider>
            </AuthProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
