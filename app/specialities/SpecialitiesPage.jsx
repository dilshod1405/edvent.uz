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
        const res = await axios.get("https://api.example.com/specialities");
        setSpecialities(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching specialities:", err);
        setLoading(false);
      }
    };
    fetchSpecialities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <p className="text-lg">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-4 md:px-16 py-10">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-10 text-indigo-400 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Mutaxassisliklar
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialities.map((spec, index) => (
          <motion.div
            key={spec.id}
            className="bg-[#0f172a] rounded-2xl p-6 shadow-lg border border-indigo-600 hover:shadow-indigo-400/20 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-indigo-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-white">{spec.title}</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-5">{spec.description}</p>

            <Link
              href={`/specialities/${spec.id}`}
              className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
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
