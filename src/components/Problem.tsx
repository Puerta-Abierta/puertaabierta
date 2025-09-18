"use client";

import { PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { ProblemSection } from '@/sanity/lib/homepageTypes'
import PortableTextRenderer from './PortableTextRenderer'

const pieData = [{ name: "Need Education", value: 73 }, { name: "No Access", value: 27 }];
const COLORS = ["#6366F1", "#E5E7EB"]; // Purple + Gray

interface ProblemProps {
  content?: ProblemSection
}

export default function Problem({ content }: ProblemProps) {
  return (
    <section className="bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {content?.title || 'Financial stress is the #1 reason for College Dropout'}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {content?.statistics?.map((stat, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-bold text-[#6366F1]">{stat.value}</p>
              <div className="text-gray-600 mt-2">
                <PortableTextRenderer content={stat.description} />
              </div>
            </motion.div>
          )) || (
            // Fallback content
            <>
              <motion.div 
                className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-[#6366F1]">$352B</p>
                <p className="text-gray-600 mt-2">
                  Lost by U.S. adults in 2021 due to financial illiteracy
                </p>
              </motion.div>
              {/* Circle*/}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <PieChart width={180} height={180}>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80}
                    startAngle={90} endAngle={-270}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <p className="text-2xl font-bold">73%</p>
                <p className="text-gray-600">of U.S. Students not confident in their financial education</p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-[#6366F1]">59%</p>
                <p className="text-gray-600 mt-2">
                   Of College students considered dropping out due to financial stress.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
