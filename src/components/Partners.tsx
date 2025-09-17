import Image from "next/image";
import { PartnersSection } from '@/sanity/lib/homepageTypes'
import { urlFor } from '@/sanity/lib/image'

const fallbackImages = [
    {src: "/ucirvine.png", alt: "UCI Logo"},
    {src: "/intuit.png", alt: "Intuit Logo"},
    {src: "/HUSD.png", alt: "Hayward Unified School District Logo"},
    {src: "/latinxcenter.png", alt: "Latina Center Logo"},
    {src: "/blackstone.png", alt: "Blackstone Logo", hideOnMobile: true},
]

interface PartnersProps {
  content?: PartnersSection
}

export default function Partners({ content }: PartnersProps) {
    const images = content?.partnerLogos?.map(partner => ({
        src: partner.logo ? urlFor(partner.logo).width(150).height(150).url() : "",
        alt: partner.name || "Partner Logo",
        hideOnMobile: partner.name?.toLowerCase().includes('blackstone') || false
    })).filter(img => img.src) || fallbackImages

    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
                    {images.map((image, index) => (
                        <div 
                            key={image.src || index} 
                            className={`flex items-center justify-center w-full h-16 sm:h-20 md:h-24 ${
                                image.hideOnMobile ? 'hidden sm:flex' : ''
                            }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={120}
                                height={80}
                                className="object-contain filter brightness-50 max-w-full max-h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}