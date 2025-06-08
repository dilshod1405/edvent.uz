"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";

const paymentMethods = [
  {
    id: "payme",
    label: "Payme",
    logo: "/images/payme.png",
  },
  {
    id: "click",
    label: "Click",
    logo: "/images/click.png",
  },
];

const PayModule = ({ courseId, modules }) => {
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  const toggleModuleSelection = (moduleId) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const totalAmount = selectedModules.reduce((sum, id) => {
    const mod = modules.find((m) => m.id === id);
    return mod ? sum + mod.price : sum;
  }, 0);

  const handleSubmit = async () => {
    if (selectedModules.length === 0) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Avtorizatsiya talab qilinadi.");

      // Hozir uchun faqat birinchi modul uchun to'lov so'rovini yuboramiz
      // Agar backend bir nechta modulni bitta requestda qabul qilmasa, har birini alohida yuborish kerak
      const moduleId = selectedModules[0];
      const mod = modules.find((m) => m.id === moduleId);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/transactions/create/`,
        {
          course: courseId,
          module: moduleId,
          tariff: 0,
          amount: mod.price,
          payment_type: selectedMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Backenddan to'lov linkini olamiz
      const paymeLink = response.data.payme_link || response.data.click_link;

      if (paymeLink) {
        window.location.href = paymeLink;
      } else {
        setSuccess("To‘lov yaratildi, ammo to‘lov linki topilmadi.");
      }

      setSelectedModules([]);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Noma’lum xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  // Scroll event for animation trigger
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById("pay-module-section");
      if (!element) return;

      const elementTop = element.offsetTop;

      if (scrollPosition > elementTop + 100 && !hasAnimated) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        });
        setHasAnimated(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls, hasAnimated]);

  return (
    <motion.div
      id="pay-module-section"
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className="max-w-6xl mx-auto bg-[#0f172a] border border-indigo-700 rounded-2xl p-6 mt-12"
    >
      <h3 className="text-2xl font-semibold text-indigo-300 mb-6">Modullar uchun to‘lov</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-h-64 overflow-y-auto">
        {modules.length === 0 ? (
          <p className="text-gray-400 italic">To‘lov uchun tanlanadigan modul yo‘q.</p>
        ) : (
          modules.map((mod) => (
            <label
              key={mod.id}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer
                ${
                  selectedModules.includes(mod.id)
                    ? "border-indigo-400 bg-indigo-900"
                    : "border-indigo-700 hover:border-indigo-500"
                }`}
            >
              <input
                type="checkbox"
                checked={selectedModules.includes(mod.id)}
                onChange={() => toggleModuleSelection(mod.id)}
                className="w-5 h-5 cursor-pointer accent-indigo-400"
              />
              <div>
                <p className="font-semibold text-white">{mod.title}</p>
                <p className="text-indigo-400 text-sm">💸 {mod.price.toLocaleString()} so‘m</p>
              </div>
            </label>
          ))
        )}
      </div>

      <div className="mb-6">
        <p className="mb-2 text-indigo-300 font-semibold">To‘lov turi tanlang:</p>
        <div className="flex gap-6">
          {paymentMethods.map(({ id, label, logo }) => (
            <button
              key={id}
              onClick={() => setSelectedMethod(id)}
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition
              ${
                selectedMethod === id
                  ? "border-indigo-400 bg-indigo-900"
                  : "border-indigo-700 hover:border-indigo-500"
              }`}
              aria-pressed={selectedMethod === id}
              type="button"
            >
              <img src={logo} alt={label} className="h-6 w-auto" />
              <span className="text-white font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-indigo-300 font-semibold">
        Umumiy summa: <span className="text-indigo-400">{totalAmount.toLocaleString()} so‘m</span>
      </div>

      {error && (
        <p className="mb-4 text-red-500 font-semibold">
          ❌ {error}
        </p>
      )}
      {success && (
        <p className="mb-4 text-green-400 font-semibold">
          ✔️ {success}
        </p>
      )}

      <button
        disabled={loading || selectedModules.length === 0}
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg text-white font-semibold transition hover:cursor-pointer
          ${
            loading || selectedModules.length === 0
              ? "bg-indigo-900 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
      >
        {loading ? "To‘lov jarayoni..." : "To‘lovni boshlash"}
      </button>
    </motion.div>
  );
};

export default PayModule;
