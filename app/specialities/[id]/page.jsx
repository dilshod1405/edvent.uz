"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, User, Clock, GraduationCap, BookOpen } from "lucide-react";

const CourseDetailPage = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const courseId = params.id;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://api.example.com/courses/${courseId}`);
        setCourse(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-4 py-10 md:px-16">
      {/* HEADER */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={course.photo}
          alt={course.title}
          className="rounded-2xl shadow-xl w-full h-auto object-cover"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-400">
            {course.title}
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Clock className="w-5 h-5" />
            <span>Kurs davomiyligi: {course.duration} oy</span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <GraduationCap className="w-5 h-5" />
            <span>Yo‘nalish: {course.speciality.title}</span>
          </div>
        </div>
      </motion.div>

      {/* TEACHER */}
      <motion.div
        className="mt-16 grid md:grid-cols-3 gap-6 items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={course.teacher.logo}
          alt={course.teacher.name}
          className="w-24 h-24 rounded-full border border-indigo-600 p-1"
        />
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-white">{course.teacher.name}</h2>
          <p className="text-sm text-gray-400">
            {course.teacher.profession} - {course.teacher.company} ({course.teacher.experience} yil tajriba)
          </p>
        </div>
      </motion.div>

      {/* MODULES */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-indigo-400 mb-6">Modullar</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {course.modules.map((mod) => (
            <div
              key={mod.id}
              className="bg-[#0f172a] p-6 rounded-2xl shadow hover:shadow-indigo-500/20 transition duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">{mod.title}</h4>
                <span className="text-sm text-indigo-400">
                  {mod.price.toLocaleString()} so‘m
                </span>
              </div>
              {mod.lessons.length > 0 && (
                <ul className="mt-3 text-sm text-gray-300 space-y-2">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      {lesson.title} ({lesson.duration})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* SUPPORT */}
      <motion.div
        className="mt-16 bg-[#0f172a] rounded-2xl p-6 flex items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={course.support.photo}
          alt={course.support.username}
          className="w-16 h-16 rounded-full border-2 border-indigo-500"
        />
        <div>
          <p className="text-sm text-gray-400">Yordamchi o‘qituvchi</p>
          <h4 className="text-lg font-semibold text-white">{course.support.first_name} {course.support.last_name}</h4>
          <p className="text-sm text-gray-400">{course.support.email}</p>
        </div>
        <a
          href={`mailto:${course.support.email}`}
          className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Bog‘lanish
        </a>
      </motion.div>
    </div>
  );
};

export default CourseDetailPage;
