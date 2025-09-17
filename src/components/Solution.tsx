"use client";

import { SolutionSection } from '@/sanity/lib/homepageTypes'
import PortableTextRenderer from './PortableTextRenderer'

interface SolutionProps {
  content?: SolutionSection
}

export default function Solution({ content }: SolutionProps) {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 px-2">
          {content?.title || 'We combine Intuit\'s trusted curriculum with mentorship that develops real-world skills in money management, career growth, and wellness.'}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 md:mt-20">
          {content?.features?.map((feature, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-50 rounded-xl p-6 sm:p-8">
              <div className="text-4xl mb-4">{feature.icon || '📘'}</div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <div className="text-gray-600 text-tiny">
                <PortableTextRenderer content={feature.description} />
              </div>
            </div>
          )) || (
            // Fallback content - properly centered
            <div className="md:col-span-3 flex flex-col items-center justify-center">
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl">
                <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 sm:p-8">
                  <div className="text-4xl mb-4">📘</div>
                  <h3 className="text-lg font-bold mb-3">Financial Literacy</h3>
                  <p className="text-gray-600 text-tiny text-center">
                    Powered by Intuit&apos;s proven curriculum for real-world money management skills
                  </p>
                </div>

                <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 sm:p-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-bold mb-3">Holistic Mentorship</h3>
                  <p className="text-gray-600 text-tiny text-center">
                    Career guidance and personal growth support for comprehensive development
                  </p>
                </div>

                <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 sm:p-8">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-lg font-bold mb-3">Enterprise Partnerships</h3>
                  <p className="text-gray-600 text-tiny text-center">
                    Working with schools, centers, and organizations to reach students where they are
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}