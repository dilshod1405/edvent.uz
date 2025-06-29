"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import { User, Briefcase, Film } from "lucide-react";

const FoundationCourseDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/education/foundation-courses/${id}/`
        );
        setCourse(res.data);
      } catch (err) {
        console.error("Foundation course fetch error:", err);
        router.push("/foundation");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, router]);

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
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-14">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={course.photo}
          alt={course.title}
          className="w-full lg:w-1/2 h-72 object-cover rounded-3xl shadow-lg"
        />
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-400 mb-6">
            {course.title}
          </h1>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg mb-6">
            {course.description}
          </p>
          <div className="flex items-center gap-4 text-indigo-300 text-sm font-medium">
            <span>💵 Narxi: {course.price?.toLocaleString()} so'm</span>
          </div>
        </div>
      </motion.div>

      {/* Teacher info */}
      <motion.div
        className="max-w-6xl mx-auto bg-[#0f172a] rounded-3xl p-8 border border-indigo-700 shadow-lg mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">O'qituvchi</h2>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={course.teacher.logo}
            alt={course.teacher.name}
            className="w-24 h-24 rounded-full object-cover border border-indigo-500"
          />
          <div>
            <p className="text-xl font-bold">{course.teacher.name}</p>
            <p className="text-indigo-300 flex items-center gap-2 mt-1">
              <Briefcase className="w-4 h-4" /> {course.teacher.profession} — {course.teacher.company}
            </p>
            <p className="text-gray-400 mt-1">
              Tajriba: {course.teacher.experience} yil
            </p>
          </div>
        </div>
      </motion.div>

      {/* Videos */}
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-indigo-400 mb-6">Video darslar</h2>
        {course.videos.length === 0 ? (
          <p className="text-gray-400">Video darslar hali mavjud emas.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {course.videos.map((video) => (
              <div
                key={video.id}
                className="bg-[#0f172a] p-6 rounded-2xl border border-indigo-600 shadow-md hover:shadow-indigo-500/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Film className="text-indigo-400 w-5 h-5" />
                  <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden border border-indigo-700">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.video_id}`}
                    title={video.title}
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FoundationCourseDetail;
