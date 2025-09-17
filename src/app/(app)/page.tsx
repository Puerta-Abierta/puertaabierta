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
  const homepageContent = await getHomepageContent()

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


