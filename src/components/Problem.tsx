"use client";

import { PieChart, Pie, Cell } from "recharts";

const pieData = [{ name: "Need Education", value: 73 }, { name: "No Access", value: 27 }];
const COLORS = ["#6366F1", "#E5E7EB"]; // Purple + Gray


export default function Problem() {
  return (
    <section className="bg-gray-50 -mx-6 p-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Financial stress is the <span className="font-bold">#1 reason</span> for College Dropout
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6">
            <p className="text-4xl font-bold text-[#6366F1]">$352B</p>
            <p className="text-gray-600 mt-2">
              Lost by U.S. adults in 2021 due to financial illiteracy
            </p>
          </div>
          {/* Circle*/}
          <div className="flex flex-col items-center">
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
          </div>

          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6">
            <p className="text-4xl font-bold text-[#6366F1]">59%</p>
            <p className="text-gray-600 mt-2">
               Of College students considered dropping out due to financial stress.
            </p>
          </div>

          
        </div>
      </div>
    </section>
  );
}
