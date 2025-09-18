import { getPricingContent } from '@/sanity/lib/homepageHelpers'
import PageHero from '@/components/PageHero'
import PricingPlans from '@/components/PricingPlans'
import PricingPackages from '@/components/PricingPackages'
import PricingFAQ from '@/components/PricingFAQ'

export default async function PricingPage() {
  // Fetch pricing content from Sanity
  let pricingContent = null;
  try {
    pricingContent = await getPricingContent();
  } catch (error) {
    console.warn('Failed to fetch pricing content from Sanity:', error);
    // Continue with null content - components will use fallback data
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Simple, Transparent Pricing"
        subtitle="Choose the learning path that works best for you. All our courses are designed to give you real-world financial skills."
      />
      <PricingPlans content={pricingContent?.plans} />
      <PricingPackages content={pricingContent?.packages} />
      <PricingFAQ content={pricingContent?.faq} />
    </div>
  );
}
