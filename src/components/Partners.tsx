import Image from "next/image";

const images = [
    {src: "/ucirvine.png", alt: "UCI Logo"},
    {src: "/intuit.png", alt: "Intuit Logo"},
    {src: "/HUSD.png", alt: "Hayward Unified School District Logo"},
    {src: "/latinxcenter.png", alt: "Latina Center Logo"},
    {src: "/blackstone.png", alt: "Blackstone Logo"},
]

export default function Partners() {
    return (
        <>
            <div className="flex w-full justify-between items-center mt-5 mb-5">
            {images.map((image) => (
                <Image
                    key={image.src}
                    src={image.src}
                    alt={image.src}
                    width={150}
                    height={150}
                    className="object-contain filter brightness-50" />
            ))}
            </div>
        </>
    );

}