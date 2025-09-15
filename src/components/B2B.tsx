"use client";

import Link from "next/link";
import { B2BSection } from '@/sanity/lib/homepageTypes'
import PortableTextRenderer from './PortableTextRenderer'

interface B2BProps {
  content?: B2BSection
}

export default function B2B({ content }: B2BProps) {
  return (
    <section className="bg-indigo-600 -mx-6 p-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {content?.title || 'Why Partner With Puerta Abierta?'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 text-left">
          {content?.challenges?.map((challenge, index) => (
            <div key={index} className="space-y-6">
              <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Challenge</h3>
                <div className="text-gray-700">
                  <PortableTextRenderer content={challenge.challenge} />
                </div>
              </div>
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Our Solution</h3>
                <div className="text-indigo-700">
                  <PortableTextRenderer content={challenge.solution} />
                </div>
              </div>
            </div>
          )) || (
            // Fallback content
            <>
              <div className="space-y-6">
                <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Challenge</h3>
                  <p className="text-gray-700">
                    Students lack access to practical financial literacy education that prepares them for real-world challenges.
                  </p>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-2">Our Solution</h3>
                  <p className="text-indigo-700">
                    We provide ready-to-use curriculum with measurable results, backed by Intuit&apos;s proven methodology.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Challenge</h3>
                  <p className="text-gray-700">
                    Institutions need credible partners they can trust to deliver quality financial education programs.
                  </p>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-2">Our Solution</h3>
                  <p className="text-indigo-700">
                    Our programs are backed by Intuit and trusted by UCI and NextUp, providing institutional credibility.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12">
          {content?.ctaButton && (
            <Link
              href={content.ctaButton.link || "/mentors"}
              className="bg-indigo-300 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-400 transition-colors duration-400 shadow-lg"
            >
              {content.ctaButton.text || "Schedule a Consultation"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
