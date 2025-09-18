import ContactForm from '@/components/ContactForm'
import PageHero from '@/components/PageHero'
import { getHomepageContent } from '@/sanity/lib/homepageHelpers'
import { getContactMethods } from '@/sanity/lib/homepageHelpers'
import { HomepageContent, ContactMethod } from '@/sanity/lib/homepageTypes'

export default async function ContactPage() {
  // Fetch homepage content from Sanity with error handling
  let homepageContent = null;
  let contactMethods: ContactMethod[] = [];
  try {
    homepageContent = await getHomepageContent();
    contactMethods = getContactMethods(homepageContent as HomepageContent);
  } catch (error) {
    console.warn('Failed to fetch homepage content from Sanity:', error);
    // Continue with empty contact methods - ContactForm will handle fallback
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHero 
        title="Contact Us"
        subtitle="Have questions about our courses, mentorship programs, or need support? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <ContactForm />
          </div>

          {/* Additional Contact Information */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const getIcon = (iconType?: string) => {
                switch (iconType) {
                  case 'email':
                    return (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )
                  case 'phone':
                    return (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )
                  case 'users':
                    return (
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  case 'clock':
                    return (
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  default:
                    return (
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                }
              }

              const getBgColor = (iconType?: string) => {
                switch (iconType) {
                  case 'email': return 'bg-blue-100'
                  case 'phone': return 'bg-green-100'
                  case 'users': return 'bg-orange-100'
                  case 'clock': return 'bg-purple-100'
                  default: return 'bg-gray-100'
                }
              }

              return (
                <div key={index} className="text-center">
                  <div className={`${getBgColor(method.icon)} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {getIcon(method.icon)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
