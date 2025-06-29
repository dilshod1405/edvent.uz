"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";

const paymentMethods = [
  { id: "payme", label: "Payme", logo: "/images/payme.png" },
  { id: "click", label: "Click", logo: "/images/click.png" },
];

const PayTariff = ({ tariffId, price }) => {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      window.location.href = "/signin";
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/transactions/create/`,
        {
          course: null,
          module: null,
          tariff: tariffId,
          amount: Number(price),
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
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Noma’lum xatolik yuz berdi."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById("pay-tariff-section");
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
      id="pay-tariff-section"
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className="max-w-6xl mx-auto bg-[#0f172a] border border-indigo-700 rounded-2xl p-6 mt-16"
    >
      <h3 className="text-2xl font-semibold text-indigo-300 mb-6">
        Tarif uchun to‘lov
      </h3>

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
              <img src={logo} alt={label} className="h-12 w-auto" />
              <span className="text-white font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-indigo-300 font-semibold">
        Umumiy summa:{" "}
        <span className="text-indigo-400">{price?.toLocaleString()} so‘m</span>
      </div>

      {error && (
        <p className="mb-4 text-red-500 font-semibold">❌ {error}</p>
      )}
      {success && (
        <p className="mb-4 text-green-400 font-semibold">✔️ {success}</p>
      )}

      <button
        disabled={loading}
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg text-white font-semibold transition
          ${
            loading
              ? "bg-indigo-900 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
      >
        {loading ? "To‘lov jarayoni..." : "To‘lovni boshlash"}
      </button>
    </motion.div>
  );
};

export default PayTariff;
