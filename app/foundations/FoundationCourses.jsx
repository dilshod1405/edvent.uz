"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const FoundationCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/education/foundation-courses/`
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Foundation courses fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-14">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Asosiy (Foundation) Kurslar
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {courses.map((course, idx) => (
          <motion.div
            key={course.id}
            className="bg-[#0f172a] rounded-3xl p-6 shadow-lg border border-indigo-600 hover:shadow-indigo-500/40 hover:border-indigo-500 cursor-pointer transition duration-400 ease-in-out flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <img
                src={course.photo}
                alt={course.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
                loading="lazy"
              />
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-indigo-500 w-6 h-6" />
                <h3 className="text-xl font-semibold text-white tracking-tight">{course.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm line-clamp-5">{course.description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-indigo-400 font-semibold text-sm">
              <span>🎓 {course.teacher?.name}</span>
              <Link
                href={`/course/${course.id}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold text-sm tracking-wide transition"
              >
                Batafsil
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoundationCourses;
