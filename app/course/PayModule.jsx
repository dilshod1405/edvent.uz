"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";

const paymentMethods = [
  { id: "payme", label: "Payme", logo: "/images/payme.png" },
  { id: "click", label: "Click", logo: "/images/click.png" },
];

const PayModule = ({ courseId, modules }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleSubmit = async () => {
    if (!selectedModule) return;

    const token = localStorage.getItem("access");
    if (!token) {
      window.location.href = "/signin";
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const mod = modules.find((m) => m.id === selectedModule);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/transactions/create/`,
        {
          course: null,
          module: selectedModule,
          tariff: null,
          amount: Number(mod.price),
          payment_type: selectedMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const payLink = response.data.payme_link || response.data.click_link;

      if (payLink) {
        window.location.href = payLink;
      } else {
        setSuccess("To‘lov yaratildi, ammo to‘lov linki topilmadi.");
      }

      setSelectedModule(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.detail || err.message || "Noma’lum xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

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

  const selectedPrice =
    selectedModule && modules.find((m) => m.id === selectedModule)?.price || 0;

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
          modules.map((mod) => {
            const isSelected = selectedModule === mod.id;
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod.id)}
                className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 group
                  ${
                    isSelected
                      ? "border-indigo-400 bg-indigo-900 shadow-lg ring-1 ring-indigo-500"
                      : "border-indigo-700 bg-[#1e293b] hover:border-indigo-500 hover:bg-indigo-800"
                  }`}
              >
                <div
                  className={`absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-300 ${
                    isSelected ? "bg-green-400 shadow-md shadow-green-400/50" : "bg-gray-500"
                  }`}
                />
                <p className="text-white font-semibold mb-1">{mod.title}</p>
                <p className="text-indigo-400 text-sm">💸 {mod.price.toLocaleString()} so‘m</p>

                {isSelected && (
                  <div className="absolute inset-0 rounded-xl border-2 border-indigo-500 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })
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
              <img src={logo} alt={label} className="h-18 w-auto" />
              <span className="text-white font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-indigo-300 font-semibold">
        Umumiy summa:{" "}
        <span className="text-indigo-400">{selectedPrice.toLocaleString()} so‘m</span>
      </div>

      {error && (
        <p className="mb-4 text-red-500 font-semibold">❌ Xatolik yuz berdi: {error}</p>
      )}
      {success && (
        <p className="mb-4 text-green-400 font-semibold">✔️ Xarid cheki yaratildi: {success}</p>
      )}

      <button
        disabled={loading || !selectedModule}
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg text-white font-semibold transition hover:cursor-pointer
          ${
            loading || !selectedModule
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
