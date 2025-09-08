import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Partners from "@/components/Partners"
import Problem from "@/components/Problem"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-6">
      <Header/>
       <section className="relative overflow-hidden bg-white">
        <div className="mx-auto px-10 py-15">
          <div className="grid items-start gap-5 md:grid-cols-2">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tighter">
                Financial Literacy Mentorship
                <br />
                for the Next Generation
              </h1>

              <p className="mt-2 text-sm sm:text-sm text-gray-600 font-sans">
                80% of young adults lack financial skills. 
                We close the gap with Intuit-powered curriculum and holistic mentorship.
              </p>

              <div className="mt-5 flex gap-4 mt-6">
                <Link
                  href="/book-intro"
                  className="px-6 py-3 rounded-full bg-indigo-300 hover:bg-indigo-400 md:dark:hover:bg-indigo-400 transition-colors duration-400 font-bold"
                >
                  Book a Free Intro
                </Link>
                <Link
                  href="/courses"
                  className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Explore Curriculum
                </Link>
              </div>
            </div>

            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[400px] self-start">
              <Image
                src="/chatsketch.png"
                alt="Students learning finance together"
                fill
                style={{ objectFit: "cover", transform: "scale(1.15)" }}
                priority
              />
            </div>
          </div>
        </div>
    </section>
    
    <Problem />
    <Partners />
    <Footer />
    </div>
  );
}


