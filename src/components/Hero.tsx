import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Stripe-style Smooth Gradient Background */}
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
                Financial Literacy
                <br />
                for the Next Generation
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                Join the thousands of students who use Puerta Abierta to build financial skills, 
                gain mentorship, and unlock their potential for a brighter future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/mentors"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-800 transition-colors duration-300 text-md"
                >
                  Book Free Intro Session
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-800 transition-colors duration-300 text-md"
                >
                  Explore Services
                </Link>
              </div>
            </div>
            
            {/* Right Panel - Interactive Demo */}
        {/*<div className="lg:ml-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto lg:mx-0">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Student Dashboard</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Today's Progress</div>
                    <div className="text-2xl font-bold text-gray-900">$2,450 saved</div>
                    <div className="text-sm text-green-600">+15% from last week</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">This Week</div>
                    <div className="text-2xl font-bold text-gray-900">$1,890 invested</div>
                    <div className="text-sm text-blue-600">Portfolio growing</div>
                </div>
                </div>
            </div>
            
            <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-black rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PA</span>
                </div>
                <div>
                    <div className="font-semibold text-gray-900">Mentor Session</div>
                    <div className="text-sm text-gray-600">30 min • Tomorrow 2:00 PM</div>
                </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-black text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
                Join Session
                </button>
            </div>
            </div>
        </div>*/}
          </div>
        </div>
      </div>
    </section>
  );
}
