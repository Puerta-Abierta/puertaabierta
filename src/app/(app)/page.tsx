import { getHomepageContent } from '@/sanity/lib/homepageHelpers'
import Hero from "@/components/Hero";
import Partners from "@/components/Partners"
import Problem from "@/components/Problem"
import Solution from "@/components/Solution"
import B2B from "@/components/B2B"
import RegionalShowcase from "@/components/RegionalShowcase"
import Testimonials from "@/components/Testimonials"
import ContactSection from "@/components/ContactSection"

export default async function Home() {
  // Fetch homepage content from Sanity
  // Wrap in try-catch to handle missing Sanity environment variables
  let homepageContent = null;
  try {
    homepageContent = await getHomepageContent();
  } catch (error) {
    console.warn('Failed to fetch homepage content from Sanity:', error);
    // Continue with null content - components will use fallback data
  }

  return (
    <>
    <Hero content={homepageContent?.hero} featuredImage={homepageContent?.featuredImage} />
    <Problem content={homepageContent?.problem} />
    <Solution content={homepageContent?.solution} />
    <B2B content={homepageContent?.b2b} />
    <RegionalShowcase />
    <Testimonials content={homepageContent?.testimonials} />
    <Partners content={homepageContent?.partners} />
    <ContactSection />
    </>
  );
}


