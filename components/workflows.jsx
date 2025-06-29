"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

function TiltCard({ href, title, description, image }) {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [15, -15]),
    { damping: 25, stiffness: 150 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-15, 15]),
    { damping: 25, stiffness: 150 }
  );

  const shadowX = useTransform(mouseX, [0, 1], [-30, 30]);
  const shadowY = useTransform(mouseY, [0, 1], [-30, 30]);

  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) =>
      `${x}px ${y}px 40px rgba(115, 0, 253, 0.6), 0 0 60px rgba(115, 0, 253, 0.3)`
  );

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  // Intersection Observer hook
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.a
      href={href}
      ref={(node) => {
        cardRef.current = node;
        ref(node);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-sm bg-gradient-to-tr from-[#4F39F6] to-[#14067a]/70 rounded-2xl shadow-xl overflow-hidden cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        boxShadow,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 30, duration: 0.6 }}
      whileHover={{ scale: 1.07 }}
    >
      <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="p-6">
        <motion.h3
          className="text-white text-xl font-bold mb-2"
          initial={{ y: 0, color: "#e0d7ff" }}
          whileHover={{ y: -6, color: "#b13aff" }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-purple-200 text-sm leading-relaxed"
          initial={{ y: 0, opacity: 1 }}
          whileHover={{ y: -3, opacity: 0.85 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.a>
  );
}

export default function Workflows() {
  const workflows = [
    {
      href: "/foundations",
      title: "Maxsus Kurslar",
      description:
        "Fundamental bilimlarni o'rganishga mo'ljallangan o'quv kurslar.",
      image:
        "https://i.pinimg.com/736x/09/c0/81/09c081f3dddcb88244fdc57b2bbf62e0.jpg",
    },
    {
      href: "/specialities",
      title: "Mutaxassislik Kurslar",
      description: "Turli xildagi zamonaviy mutaxassisliklar bo'yicha kurslar.",
      image:
        "https://i.pinimg.com/736x/5b/17/4b/5b174bb175968e241a534a1f78559fc9.jpg",
    },
    {
      href: "/tariffs",
      title: "Tarifli Kurslar",
      description:
        "Bir nechta mutaxassislik kurslarini qamrab olgan, arzonlashtirilgan paketli kurslar.",
      image:
        "https://i.pinimg.com/736x/fb/a5/00/fba500c6e99adee23edf4e5e7ad31722.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
      <h2 className="col-span-full text-4xl text-center mb-12 bg-gradient-to-r from-[#beb6ff] via-[#beb6ff]/80 to-[#beb6ff]/80 bg-clip-text text-transparent drop-shadow-lg font-nacelle font-semibold">
        O'quv kurslar strukturasi
      </h2>
      {workflows.map(({ href, title, description, image }, index) => (
        <TiltCard
          key={index}
          href={href}
          title={title}
          description={description}
          image={image}
        />
      ))}
    </section>
  );
}
