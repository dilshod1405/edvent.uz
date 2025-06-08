"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Video } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";

const CourseDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModuleId, setOpenModuleId] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/education/courses/${id}/`
        );
        setCourse(res.data);
      } catch (err) {
        console.error("Kursni yuklashda xatolik:", err);
        router.push("/specialities");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, router]);

  const toggleModule = (moduleId) => {
    setOpenModuleId((prev) => (prev === moduleId ? null : moduleId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <CircularProgress />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <p className="text-lg font-semibold text-red-500">Kurs topilmadi.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-12">
      {/* Kurs ma'lumotlari */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-400">
            {course.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <img
              src={course.teacher.logo}
              alt={course.teacher.name}
              className="w-16 rounded-full border border-indigo-600"
            />
            <div>
              <p className="text-white font-semibold">
                Mentor: {course.teacher.name}
              </p>
              <p className="text-sm text-indigo-300">
                {course.teacher.profession} — {course.teacher.company}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.img
          src={course.photo}
          alt={course.title}
          className="rounded-2xl w-full h-80 object-cover shadow-lg border border-indigo-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        />
      </div>

      {/* Modullar */}
      <motion.h2
        className="text-3xl font-semibold mb-8 text-indigo-300 tracking-wide max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Modullar va darslar
      </motion.h2>

      <div className="max-w-6xl mx-auto space-y-4">
        {course.modules.map((module) => (
          <div
            key={module.id}
            className="bg-[#0f172a] border border-indigo-700 rounded-2xl p-6"
          >
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex justify-between items-center text-left"
            >
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {module.title}
                </h3>
                <p className="text-sm text-indigo-400">
                  💸 {module.price.toLocaleString()} so‘m
                </p>
              </div>
              {openModuleId === module.id ? (
                <ChevronUp className="text-indigo-400" />
              ) : (
                <ChevronDown className="text-indigo-400" />
              )}
            </button>

            <AnimatePresence>
              {openModuleId === module.id && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 pl-4 space-y-2 overflow-hidden"
                >
                  {module.lessons.length > 0 ? (
                    module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-3 text-gray-300 text-sm border-b border-indigo-700 pb-2"
                      >
                        <Video className="w-4 h-4 text-indigo-500" />
                        <Link
                          href={`/lesson/video/${lesson.id}`}
                          className="hover:underline"
                        >
                          <span>{lesson.title}</span>
                        </Link>
                        <span className="ml-auto text-indigo-400">
                          ⏱ {lesson.duration}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 italic">
                      Bu modulda hozircha darslar mavjud emas.
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
