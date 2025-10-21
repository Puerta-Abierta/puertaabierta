import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Puerta Abierta",
  description: "Learn how Puerta Abierta protects your privacy and handles your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <div className="text-gray-600 space-y-1">
              <p><strong>Effective Date:</strong> 10/19/2025</p>
              <p><strong>Last Updated:</strong> 10/20/2025</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              Puerta Abierta (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information you provide to us when you visit our website (puertaabierta.io) or interact with our services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                When you visit our website or sign up for our programs, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, and phone number.</li>
                <li><strong>Usage Data:</strong> Non-identifiable information such as browser type, pages visited, and time spent on the site (collected via analytics tools like Google Analytics).</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We do not collect or store any sensitive personal information, such as credit card numbers, social security numbers, or financial account details, directly on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We collect your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To communicate with you regarding updates, educational content, or events related to Puerta Abierta.</li>
                <li>To send newsletters, promotional materials, or other marketing communications (you may opt out at any time).</li>
                <li>To improve our website, services, and user experience.</li>
                <li>To analyze engagement and track the effectiveness of marketing campaigns.</li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                We will never sell, trade, or rent your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Marketing and Communications</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>By providing your email address or phone number, you consent to receiving communications from Puerta Abierta about new programs, events, and updates.</li>
                <li>You may opt out of marketing communications at any time by clicking the &quot;unsubscribe&quot; link in our emails or contacting us directly.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Protection and Security</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We use reasonable administrative, technical, and physical safeguards to protect your personal data from unauthorized access, alteration, disclosure, or destruction.</li>
                <li>While no online system is 100% secure, we take every precaution to protect your data.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-700">
                Our website may use cookies and similar technologies to enhance user experience and gather analytics. You can choose to disable cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access, correct, or delete your personal data.</li>
                <li>Request that we stop processing your information.</li>
                <li>Withdraw consent to receive marketing communications.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, contact us at <a href="mailto:info@puertaabierta.io" className="text-indigo-600 hover:text-indigo-800 underline">info@puertaabierta.io</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                Our website and services are intended for individuals aged 13 and older. We do not knowingly collect information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically to reflect changes in our practices. Any updates will be posted on this page with a revised &quot;Last Updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 font-semibold mb-2">Puerta Abierta, Inc.</p>
                <p className="text-gray-700 mb-1">
                  Email: <a href="mailto:support@puertaabierta.io" className="text-indigo-600 hover:text-indigo-800 underline">support@puertaabierta.io</a>
                </p>
                <p className="text-gray-700">
                  Website: <a href="https://puertaabierta.io" className="text-indigo-600 hover:text-indigo-800 underline">https://puertaabierta.io</a>
                </p>
              </div>
            </section>

            <div className="border-t pt-8 mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy Summary</h3>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  By signing up, you agree to receive updates and communications from Puerta Abierta. We collect your name, email, and phone number only for educational updates, event information, and marketing purposes to help grow our community. We respect your privacy – your information is never sold or shared with third parties, and you can unsubscribe at any time.
                </p>
                <p className="text-gray-700">
                  Read our full Privacy Policy to learn more about how we protect your data.
                </p>
              </div>
            </div>

            <div className="border-t pt-8 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cookie Consent</h3>
              <div className="bg-yellow-50 rounded-lg p-6">
                <p className="text-gray-700">
                  🍪 We use cookies to improve your browsing experience, personalize content, and analyze our traffic. By continuing to use our site, you agree to our use of cookies. You can manage your cookie preferences or learn more about them in our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
