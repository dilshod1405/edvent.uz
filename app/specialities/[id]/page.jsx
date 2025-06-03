"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, RefreshCcw } from "lucide-react";

const SpecialityDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [speciality, setSpeciality] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeciality = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/education/specialities/${id}/`
        );
        setSpeciality(res.data);
        setCourses(res.data.courses); // faqat shu mutaxassislikka tegishli kurslar
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
      {/* Title + loop animation */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold text-indigo-400 tracking-wide select-none">
          {speciality.title}
        </motion.h1>

        <motion.div
          className="text-indigo-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        >
          <RefreshCcw size={36} />
        </motion.div>
      </motion.div>

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

      {courses.length === 0 ? (
        <p className="text-gray-400 text-center">Bu mutaxassislik bo‘yicha kurslar topilmadi.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              className="bg-[#0f172a] rounded-3xl p-6 shadow-lg border border-indigo-600 hover:shadow-indigo-500/40 hover:border-indigo-500 cursor-pointer transition duration-400 ease-in-out flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(99,102,241,0.4)" }}
            >
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${course.photo}`}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                  loading="lazy"
                />
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="text-indigo-500 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-white tracking-tight">{course.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm line-clamp-5">{course.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between text-indigo-400 font-semibold text-sm">
                <span>⏱ {course.duration} ta moduldan iborat</span>
                <Link
                  href={`/courses/${course.id}`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold text-sm tracking-wide transition"
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
