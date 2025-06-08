"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const paymentMethods = [
  {
    id: "payme",
    label: "Payme",
    logo: "/logos/payme.svg", // Sizning public papkangizda bo'lishi kerak
  },
  {
    id: "click",
    label: "Click",
    logo: "/logos/click.svg",
  },
];

const PayModule = ({ courseId, modules }) => {
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      // Agar backend bir nechta modulni bitta requestda qabul qilmasa,
      // har bir modul uchun alohida request yuboramiz (parallel)
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Avtorizatsiya talab qilinadi.");

      const requests = selectedModules.map((moduleId) => {
        const mod = modules.find((m) => m.id === moduleId);
        return axios.post(
          "https://archedu.uz/payment/transactions/create/",
          {
            course: courseId,
            module: moduleId,
            tariff: 0, // Agar kerak bo‘lsa, qo‘shish mumkin
            amount: mod.price,
            payment_type: selectedMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      const responses = await Promise.all(requests);

      // Hamma muvaffaqiyatli bo‘lsa:
      setSuccess("To‘lovlar muvaffaqiyatli boshlaldi. Iltimos, ko‘rsatmalarga amal qiling.");
      setSelectedModules([]);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Noma’lum xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-[#0f172a] border border-indigo-700 rounded-2xl p-6 mt-12">
      <h3 className="text-2xl font-semibold text-indigo-300 mb-6">Modullar uchun to‘lov</h3>

      {/* Modul tanlash */}
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

      {/* To‘lov turi tanlash */}
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

      {/* Umumiy summa */}
      <div className="mb-6 text-indigo-300 font-semibold">
        Umumiy summa: <span className="text-indigo-400">{totalAmount.toLocaleString()} so‘m</span>
      </div>

      {/* Xabarlar */}
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

      {/* To‘lov tugmasi */}
      <button
        disabled={loading || selectedModules.length === 0}
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg text-white font-semibold transition
          ${
            loading || selectedModules.length === 0
              ? "bg-indigo-900 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
      >
        {loading ? "To‘lov jarayoni..." : "To‘lovni boshlash"}
      </button>
    </div>
  );
};

export default PayModule;
