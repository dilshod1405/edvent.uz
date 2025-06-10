"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import {
  BadgeCheck,
  BadgeX,
  PercentCircle,
  Star,
  School,
  Book,
  ShoppingCart
} from "lucide-react";

const TariffList = () => {
  const [tariffs, setTariffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const res = await axios.get("https://archedu.uz/education/tariffs/");
        setTariffs(res.data);
      } catch (err) {
        console.error("Error fetching tariffs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTariffs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-12">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-12 text-indigo-400 text-center tracking-wide"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Tariff Rejalari
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tariffs.map((tariff, idx) => (
          <motion.div
            key={tariff.id}
            className="bg-[#0f172a] rounded-3xl p-7 shadow-lg border border-indigo-600 hover:border-indigo-500 hover:shadow-indigo-500/30 transition duration-400 ease-in-out flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white tracking-tight">{tariff.title}</h2>
              {tariff.is_active ? (
                <BadgeCheck className="text-green-400 w-6 h-6" title="Faol" />
              ) : (
                <BadgeX className="text-red-400 w-6 h-6" title="Faol emas" />
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-300 mt-3">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 w-4 h-4" />
                <span className="font-medium">Narxi:</span> {tariff.price?.toLocaleString()} so'm
              </div>
              <div className="flex items-center gap-2">
                <PercentCircle className="text-cyan-400 w-4 h-4" />
                <span className="font-medium">Chegirma:</span> {tariff.discount_percent}%
              </div>
              <div className="flex items-center gap-2">
                <School className="text-pink-400 w-4 h-4" />
                <span className="font-medium">Mutaxassislik:</span> {tariff.speciality?.title || "—"}
              </div>
              <div className="flex items-start gap-2">
                <Book className="text-lime-400 w-4 h-4 mt-1" />
                <div>
                  <span className="font-medium">Kurslar:</span>{" "}
                  {tariff.courses.length > 0 ? (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {tariff.courses.map((course, i) => (
                        <li key={i}>{course.title || "Noma'lum kurs"}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="italic text-gray-400">Yo‘q</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href={`/tariffs/${tariff.id}`}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition duration-300 ease-in-out shadow hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" /> Xarid qilish
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TariffList;
