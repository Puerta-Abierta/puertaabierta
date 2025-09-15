import Image from "next/image";
import { PartnersSection } from '@/sanity/lib/homepageTypes'
import { urlFor } from '@/sanity/lib/image'

const fallbackImages = [
    {src: "/ucirvine.png", alt: "UCI Logo"},
    {src: "/intuit.png", alt: "Intuit Logo"},
    {src: "/HUSD.png", alt: "Hayward Unified School District Logo"},
    {src: "/latinxcenter.png", alt: "Latina Center Logo"},
    {src: "/blackstone.png", alt: "Blackstone Logo"},
]

interface PartnersProps {
  content?: PartnersSection
}

export default function Partners({ content }: PartnersProps) {
    const images = content?.partnerLogos?.map(partner => ({
        src: partner.logo ? urlFor(partner.logo).width(150).height(150).url() : "",
        alt: partner.name || "Partner Logo"
    })).filter(img => img.src) || fallbackImages

    return (
        <>
            <div className="flex w-full justify-between items-center mt-6 mb-6">
            {images.map((image, index) => (
                <Image
                    key={image.src || index}
                    src={image.src}
                    alt={image.alt}
                    width={150}
                    height={150}
                    className="object-contain filter brightness-50" />
            ))}
            </div>
        </>
    );

}