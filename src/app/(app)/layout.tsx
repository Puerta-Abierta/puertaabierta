import type { Metadata } from "next";
import { Ubuntu, Lato } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactLeadProvider from "@/components/ContactLeadProvider";
import { getAllCourses } from '@/sanity/lib/courseHelpers';
import { GoogleAnalytics } from "@next/third-parties/google";
import ToastProvider from "@/components/ToastProvider";
import { Course } from '@/sanity/lib/courseTypes';

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#4f46e5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Puerta Abierta",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch courses for the navigation dropdown
  // Wrap in try-catch to handle missing Sanity environment variables
  let courses: Course[] = [];
  try {
    courses = await getAllCourses();
  } catch (error) {
    console.warn('Failed to fetch courses from Sanity:', error);
    // Continue with empty courses array
  }

  return (
    <html lang="en">
      <head><meta name="apple-mobile-web-app-title" content="Puerta Abierta" /></head>
      <body
        className={`${lato.variable} ${second.variable} antialiased`}
      >
        <ToastProvider />
        <ContactLeadProvider>
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Header courses={courses} />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ContactLeadProvider>
        <GoogleAnalytics gaId="G-FB0GQ302GJ" />
      </body>
    </html>
  );
}
