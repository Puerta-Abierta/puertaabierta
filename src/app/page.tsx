import Image from "next/image";
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow flex items-center justify-center">
        <p>Financial Literacy</p>
      </main>
      <Footer />
    </div>
  );
}


