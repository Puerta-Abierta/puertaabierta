import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners"
import Problem from "@/components/Problem"
import Solution from "@/components/Solution"
import B2B from "@/components/B2B"

export default function Home() {
  return (
    <>
    <Hero />
    <Problem />
    <Solution />
    <B2B />
    <Partners />
    </>
  );
}


