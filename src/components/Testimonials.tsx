"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    type: "Student Testimonial",
    name: "Ben",
    role: "High School Senior",
    quote: "The course made my college essays so much easier to tackle. I feel ready to submit my applications, and I'd recommend it to any student — every kid needs support with the process because it can be tough to do alone.",
    icon: "🎓",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    type: "Educator / Partner Testimonial",
    name: "Ms. Rodriguez",
    role: "College Counselor",
    quote: "Puerta Abierta gave my students confidence and structure. They went from feeling overwhelmed to checking items off their application list step by step. It's the kind of resource schools have been waiting for.",
    icon: "💬",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: 3,
    type: "Social Proof Highlight",
    name: "800+ Students",
    role: "Program Interest",
    quote: "Over 800 students have expressed interest in our programs — a clear sign of how much demand there is for accessible, personalized financial literacy and college prep.",
    icon: "✨",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  }
];

export default function Testimonials() {
  return (
    <>
    </>
  )
}
