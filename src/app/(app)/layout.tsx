import type { Metadata } from "next";
import { Ubuntu, Lato } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllCourses } from '@/sanity/lib/courseHelpers';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "900"], // normal + bold
  variable: "--font-sans",
  display: "swap",
});

const second = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"], // normal + bold
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Puerta Abierta",
  description: "Financial Literacy for young adults",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch courses for the navigation dropdown
  const courses = await getAllCourses();

  return (
    <html lang="en">
      <head><meta name="apple-mobile-web-app-title" content="Puerta Abierta" /></head>
      <body
        className={`${lato.variable} ${second.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header courses={courses} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
