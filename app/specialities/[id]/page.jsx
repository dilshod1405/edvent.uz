"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, Clock } from "lucide-react";

const SpecialityDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [speciality, setSpeciality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeciality = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/education/specialities/${id}/`
        );
        setSpeciality(res.data);
      } catch (err) {
        console.error("Speciality fetch error:", err);
        router.push("/specialities");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeciality();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <p className="text-lg font-medium tracking-wide">Yuklanmoqda...</p>
      </div>
    );
  }

  if (!speciality) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <p className="text-lg font-semibold text-red-500">Mutaxassislik topilmadi.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-12">
      {/* Speciality Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-10 text-indigo-400 tracking-wide text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {speciality.title}
      </motion.h1>

      {/* Speciality Description */}
      <motion.div
        className="max-w-4xl mx-auto mb-16 p-6 bg-[#1e293b] rounded-2xl shadow-lg border border-indigo-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
          {speciality.description}
        </p>
      </motion.div>

      {/* Courses List */}
      <motion.h2
        className="text-3xl font-semibold mb-8 text-indigo-300 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Kurslar ro‘yxati
      </motion.h2>

      {speciality.courses.length === 0 ? (
        <p className="text-gray-400 text-center">Bu mutaxassislik bo‘yicha kurslar topilmadi.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {speciality.courses.map((course, idx) => (
            <motion.div
              key={course.id}
              className="bg-[#0f172a] rounded-3xl shadow-lg border border-indigo-600 hover:shadow-indigo-500/50 hover:border-indigo-500 cursor-pointer transition duration-300 ease-in-out flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Course image */}
              <div className="h-48 w-full rounded-t-3xl overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${course.photo}`}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Course details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{course.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-4 mb-4">{course.description}</p>

                <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-4">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>

                <Link
                  href={`/courses/${course.id}`}
                  className="mt-auto inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm tracking-wide text-center transition"
                >
                  Kursga kirish
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialityDetail;
