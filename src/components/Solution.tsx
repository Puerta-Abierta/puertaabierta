"use client";

export default function Solution() {
  return (
    <section className="bg-white p-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          We combine <span className="text-[#6366F1]">Intuit&apos;s trusted curriculum</span> with mentorship that develops real-world skills in money management, career growth, and wellness.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
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
        </div>
      </div>
    </section>
  );
}