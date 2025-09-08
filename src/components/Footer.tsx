import Link from "next/link";
import { Mail, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Logo / About */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Puerta Abierta</h3>
          <p className="mt-2 text-sm text-gray-600">
            Unlocking futures, one door at a time.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Puerta Abierta. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-sm text-gray-600">
          <Link href="/about" className="hover:text-gray-900">About</Link>
          <Link href="/programs" className="hover:text-gray-900">Programs</Link>
          <Link href="/mentorship" className="hover:text-gray-900">Mentorship</Link>
          <Link href="/resources" className="hover:text-gray-900">Resources</Link>
          <Link href="/contact" className="hover:text-gray-900">Contact Us</Link>
        </div>

        <div className="flex flex-col items-start md:items-end space-y-4">
          <Link 
            href="/book-intro" 
            className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-500 transition"
          >
            Book a Free Intro
          </Link>
          <div className="flex space-x-4 text-gray-500">
            <a href="mailto:info@puertaabierta.io" className="hover:text-gray-900">
              <Mail size={20} />
            </a>
            <a href="https://www.linkedin.com/company/puertaabierta-io" target="_blank" className="hover:text-gray-900">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com/puertaabierta.io " target="_blank" className="hover:text-gray-900">
              <Instagram size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
