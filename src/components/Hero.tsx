'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection, HomepageContent } from '@/sanity/lib/homepageTypes'
import PortableTextRenderer from './PortableTextRenderer'

interface HeroProps {
  content?: HeroSection
  featuredImage?: HomepageContent['featuredImage']
}

export default function Hero({ content, featuredImage }: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Smooth Gradient Background */}
      <div className="absolute inset-0">
        {/* Main gradient - yellow/orange to purple/blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 via-purple-600 to-blue-600 bg-[length:200%_200%] animate-gradient-flow"></div>
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-transparent to-blue-500/20"></div>
        
        {/* Soft wave animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-purple-500/15 to-cyan-500/10 bg-[length:300%_300%] animate-gradient-soft"></div>
      </div>
      
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                {content?.title}
              </h1>
              
              <div className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                <PortableTextRenderer 
                  content={content?.subtitle} 
                  className="prose prose-invert prose-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {content?.primaryButton && (
                  <Link
                    href={content.primaryButton.link || "/mentors"}
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-800 transition-colors duration-300 text-md"
                  >
                    {content.primaryButton.text || "Book Free Intro Session"}
                  </Link>
                )}
                {content?.secondaryButton && (
                  <Link
                    href={content.secondaryButton.link || "/services"}
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-800 transition-colors duration-300 text-md"
                  >
                    {content.secondaryButton.text || "Explore Services"}
                  </Link>
                )}
              </div>
            </div>
            
            {/* Right Panel - Featured Image */}
            <motion.div 
              className="lg:ml-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: "easeOut"
              }}
            >
              {/* <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {featuredImage ? (
                  <Image
                    src={urlFor(featuredImage).width(600).height(500).url()}
                    alt="Featured image"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">No image available</span>
                  </div>
                )}
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
