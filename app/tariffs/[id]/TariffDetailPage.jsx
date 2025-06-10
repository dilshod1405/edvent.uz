"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import PayTariff from "../PayTariff";

const TariffDetailPage = () => {
  const { id } = useParams();
  const [tariff, setTariff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTariff = async () => {
      try {
        const res = await axios.get(
          `https://archedu.uz/education/tariffs/${id}/`
        );
        setTariff(res.data);
      } catch (err) {
        console.error("Error fetching tariff detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTariff();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <CircularProgress />
      </div>
    );
  }

  if (!tariff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-red-400">
        Tarif topilmadi
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-12">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-indigo-400 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {tariff.title}
      </motion.h1>

      <div className="text-lg text-gray-300 text-center mb-6">
        {tariff.speciality?.title} — {tariff.courses.length} ta kurs
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 mb-10">
        <div className="bg-[#1e293b] border border-indigo-600 rounded-2xl p-6 shadow-md">
          <p className="text-white font-semibold text-xl mb-2">Narxi</p>
          <p className="text-indigo-300 text-3xl font-bold">
            {tariff.price.toLocaleString()} so‘m
          </p>
          {tariff.discount_percent > 0 && (
            <p className="text-green-400 font-semibold mt-1">
              Chegirma: {tariff.discount_percent}%
            </p>
          )}
        </div>
      </div>

      <div className="mb-12">
        <motion.h2
          className="text-2xl font-semibold text-indigo-400 mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Kurslar ro'yxati
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tariff.courses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-[#1e293b] rounded-xl p-4 border border-indigo-700 hover:shadow-lg hover:border-indigo-500 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={course.photo}
                alt={course.title}
                width={400}
                height={200}
                className="rounded-lg object-cover h-40 w-full mb-4"
              />
              <h3 className="text-white font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-gray-400 mb-2 line-clamp-3">
                {course.description}
              </p>
              <p className="text-indigo-400 text-sm">⏱ {course.duration} daqiqa</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tariff uchun to‘lov componenti */}
      <PayTariff tariffId={tariff.id} price={tariff.price} />
    </div>
  );
};

export default TariffDetailPage;