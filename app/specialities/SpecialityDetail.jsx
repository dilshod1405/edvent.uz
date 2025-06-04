"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import CircularProgress from '@mui/material/CircularProgress';

const SpecialityDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [speciality, setSpeciality] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchSpeciality = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/education/specialities/${id}/`);
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

  useEffect(() => {
    if (courses.length === 0) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % courses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [courses]);

  const handleExpand = () => {
    if (!speciality?.description) return;

    setIsExpanded(true);
    setTypedText("");

    let index = 0;
    const audio = new Audio("/sounds/keyboard.wav");
    audioRef.current = audio;

    const type = () => {
      if (index < speciality.description.length) {
        setTypedText((prev) => prev + speciality.description[index]);
        audio.play();
        index++;
        typingTimeoutRef.current = setTimeout(type, 30);
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    type();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030613] text-white">
        <p className="text-lg font-medium tracking-wide"><CircularProgress /></p>
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

  const previewText = speciality.description?.split(" ").slice(0, 15).join(" ") + "...";

  return (
    <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 mb-20">
        <div className="w-full lg:w-1/2 relative h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {courses.length > 0 && (
              <motion.div
                key={courses[currentStep].id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
                className="w-full bg-gradient-to-br from-indigo-600/80 to-indigo-400/80 text-white p-8 rounded-3xl shadow-xl border border-indigo-500"
              >
                <h3 className="text-3xl font-bold mb-4 tracking-tight">
                  {courses[currentStep].title}
                </h3>
                <p className="text-base text-indigo-100 leading-relaxed line-clamp-4">
                  {courses[currentStep].description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="w-full lg:w-1/2 bg-[#1e293b] rounded-3xl p-10 shadow-lg border border-indigo-700"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-indigo-400 mb-6 tracking-tight">
            {speciality.title}
          </h1>
          <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-full" : "max-h-[160px]"}`}>
            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
              {isExpanded ? typedText : previewText}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#1e293b] to-transparent flex items-end justify-center">
                <button
                  className="text-indigo-400 mt-4 font-semibold hover:underline flex items-center"
                  onClick={handleExpand}
                >
                  <span>Read more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.h2
        className="text-3xl font-semibold mb-8 text-indigo-300 tracking-wide max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Kurslar ro‘yxati
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
              <span>⏱ {course.duration} ta modul</span>
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
    </div>
  );
};

export default SpecialityDetail;
