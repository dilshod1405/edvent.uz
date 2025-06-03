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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeciality = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/education/specialities/${id}/`
        );
        setSpeciality(res.data);
        setCourses(res.data.courses);
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
      {/* HEADER */}
      <motion.div
        className="grid md:grid-cols-2 gap-10 items-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-400 mb-4">
            {speciality.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">{speciality.description}</p>
        </div>
        <div className="bg-indigo-600/10 p-6 rounded-2xl border border-indigo-700">
          <BookOpen className="w-14 h-14 text-indigo-500 mb-4" />
          <p className="text-gray-200">
            Bu bo‘lim ostida mavjud bo‘lgan kurslar quyida ro‘yxatlangan. Har bir kurs sizga amaliy va nazariy bilimlarni taklif etadi.
          </p>
        </div>
      </motion.div>

      {/* COURSES */}
      <motion.h2
        className="text-3xl font-semibold mb-8 text-indigo-300 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Kurslar ro‘yxati
      </motion.h2>

      {courses.length === 0 ? (
        <p className="text-gray-400 text-center">Bu mutaxassislik bo‘yicha kurslar topilmadi.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              className="bg-[#111827] rounded-2xl overflow-hidden border border-indigo-700 hover:shadow-xl hover:shadow-indigo-500/20 transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <img
                src={course.photo || "/placeholder-course.jpg"}
                alt={course.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-4">{course.description}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="flex items-center text-sm text-indigo-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration || "Davomiylik kiritilmagan"}
                  </span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition font-medium"
                  >
                    Kursga kirish
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialityDetail;
