import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/lenisProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
  title: "Unreplaceable.ai",
  description:
    "Discover your career's future in the age of artificial intelligence. We analyze risks and reveal the skills you need to become irreplaceable.",
};

export default function RootLayout({
    children,
}) {
    return (
        <LenisProvider>
            
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                {children}
            </body>
        </html>
    </LenisProvider>
    );
}
