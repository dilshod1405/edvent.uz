"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Users, Search, Video, Bot, BookOpen } from "lucide-react";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-indigo-400" />,
    title: "Real loyihalar",
    text: "Real portfoliongiz uchun loyiha qilasiz va kursdan keyin uni ko‘rsatishingiz mumkin.",
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-400" />,
    title: "Jamoaviy ishlash",
    text: "Real jamoada ishlash tajribasini kurs davomida olasiz.",
  },
  {
    icon: <Search className="w-8 h-8 text-indigo-400" />,
    title: "Qo‘shimcha izlanish",
    text: "Imtihonlar, savollar, materiallar sizga qo‘shimcha tayyorgarlik beradi.",
  },
  {
    icon: <Video className="w-8 h-8 text-indigo-400" />,
    title: "Onlayn uchrashuvlar",
    text: "Ustozlaringiz bilan jonli muloqot orqali savollaringizga javob olasiz.",
  },
  {
    icon: <Bot className="w-8 h-8 text-indigo-400" />,
    title: "Telegram yordamchi",
    text: "Bot sizni kun davomida qo‘llab-quvvatlaydi.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-indigo-400" />,
    title: "Sertifikat",
    text: "Rasmiy sertifikat sizning bilimlaringizni tasdiqlaydi.",
  },
];

export default function Features() {
  const duplicatedFeatures = [...features, ...features]; // loop effect

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
        <Image src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 opacity-50">
        <Image src={BlurredShape} width={760} height={668} alt="" />
      </div>

      {/* Title */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-200">
          Platformaning afzalliklari
        </h2>
        <p className="text-indigo-200/70 mt-4 max-w-xl mx-auto">
          Sifatli ta'lim, kuchli qo‘llab-quvvatlash va real tajriba orqali natijaga erishamiz!
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {duplicatedFeatures.map((feature, index) => (
            <div
              key={index}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] max-w-sm bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl text-left text-gray-200 shadow-xl"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-indigo-200/70 text-sm">{feature.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
