"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

const SpecialitiesPage = () => {
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/education/specialities/`);
        setSpecialities(res.data);
      } catch (err) {
        console.error("Error fetching specialities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <p className="text-lg font-medium tracking-wide">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-12">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-12 text-indigo-400 text-center tracking-wide"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Mutaxassisliklar
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {specialities.map((spec, idx) => (
          <motion.div
            key={spec.id}
            className="bg-[#0f172a] rounded-3xl p-7 shadow-lg border border-indigo-600 hover:shadow-indigo-500/40 hover:border-indigo-500 cursor-pointer transition duration-400 ease-in-out flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.6 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(99,102,241,0.4)" }}
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <GraduationCap className="text-indigo-500 w-7 h-7" />
                <h2 className="text-2xl font-semibold text-white tracking-tight">{spec.title}</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm line-clamp-5">{spec.description}</p>
            </div>

            <Link
              href={`/specialities/${spec.id}`}
              className="mt-7 self-start inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm tracking-wide transition"
            >
              Kurslarni ko‘rish
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialitiesPage;
