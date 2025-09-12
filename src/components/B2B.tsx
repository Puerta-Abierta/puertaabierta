"use client";

import Link from "next/link";

export default function B2B() {
  return (
    <section className="bg-[#6366F1] -mx-6 p-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Why Partner With Puerta Abierta?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 text-left">
          {/* Problem 1 - Solution 1 */}
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Problem</h3>
              <p className="text-red-700">
                Students lack access to practical financial literacy education that prepares them for real-world challenges.
              </p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Solution</h3>
              <p className="text-green-700">
                We provide ready-to-use curriculum with measurable results, backed by Intuit&apos;s proven methodology.
              </p>
            </div>
          </div>

          {/* Problem 2 - Solution 2 */}
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Problem</h3>
              <p className="text-red-700">
                Institutions need credible partners they can trust to deliver quality financial education programs.
              </p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Solution</h3>
              <p className="text-green-700">
                Our programs are backed by Intuit and trusted by UCI and NextUp, providing institutional credibility.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
            <Link
                  href="/mentors"
                  className="bg-white text-[#6366F1] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors duration-200 shadow-lg">
           
                  Schedule a Consultation
            </Link>
          
        </div>
      </div>
    </section>
  );
}
