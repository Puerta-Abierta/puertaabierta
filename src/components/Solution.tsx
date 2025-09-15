"use client";

import { SolutionSection } from '@/sanity/lib/homepageTypes'
import PortableTextRenderer from './PortableTextRenderer'

interface SolutionProps {
  content?: SolutionSection
}

export default function Solution({ content }: SolutionProps) {
  return (
    <section className="bg-white p-30">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {content?.title || 'We combine Intuit\'s trusted curriculum with mentorship that develops real-world skills in money management, career growth, and wellness.'}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {content?.features?.map((feature, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-50 rounded-xl p-8">
              <div className="text-4xl mb-4">{feature.icon || '📘'}</div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <div className="text-gray-600 text-tiny">
                <PortableTextRenderer content={feature.description} />
              </div>
            </div>
          )) || (
            // Fallback content
            <>
              <div className="flex flex-col items-center bg-gray-50 rounded-xl p-8">
                <div className="text-4xl mb-4">📘</div>
                <h3 className="text-lg font-bold mb-3">Financial Literacy</h3>
                <p className="text-gray-600 text-tiny">
                  Powered by Intuit&apos;s proven curriculum for real-world money management skills
                </p>
              </div>

              <div className="flex flex-col items-center bg-gray-50 rounded-xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold mb-3">Holistic Mentorship</h3>
                <p className="text-gray-600 text-tiny">
                  Career guidance and personal growth support for comprehensive development
                </p>
              </div>

              <div className="flex flex-col items-center bg-gray-50 rounded-xl p-8">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-bold mb-3">Enterprise Partnerships</h3>
                <p className="text-gray-600 text-tiny">
                  Working with schools, centers, and organizations to reach students where they are
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}