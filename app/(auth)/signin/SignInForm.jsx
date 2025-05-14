"use client";
import React, { useState } from 'react';
import { useAuth } from "@/utils/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Header from '@/components/ui/header';
import { handleGoogleLogin } from "@/utils/authConfig/GoogleLogin";

const SignInForm = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authentication/login/`, { username: email, password });
      if (res.status === 200) {
        const { access, refresh, id, photo } = res.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("id", id);
        localStorage.setItem("photo", photo);
        dispatch({ type: "LOGIN", payload: { token: access, user: res.data.user } });
        setIsLoading(false);
        router.replace("/api/dashboard");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError("Email yoki parol xato!");
      } else {
        setError("Email yoki parol xato!");
      }
      setIsLoading(false);
    }
  }
  
  
  
  return (
    <section>
      <Header />
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Xush kelibsiz
            </h1>
          </div>

          <form className="mx-auto max-w-[400px]" onSubmit={handleLogin}>
            <div className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-indigo-200/65" htmlFor="email">Email</label>
                <input id="email" type="email" className="w-full form-input" placeholder="Elektron pochta" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3 mb-1">
                  <label className="block text-sm font-medium text-indigo-200/65" htmlFor="password">Parol</label>
                  <Link className="text-sm text-gray-600 hover:underline" href="/reset-password">Unutdingizmi?</Link>
                </div>
                <input id="password" type="password" className="w-full form-input" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

            <div className="mt-6 space-y-5">
              <button type="submit" className="w-full text-white cursor-pointer btn bg-linear-to-t from-indigo-600 to-indigo-500">
                {isLoading ? <CircularProgress style={{ color: "white", width: "20px", height: "20px" }} /> : "Kirish"}
              </button>
              {/* <div className="flex items-center gap-3 text-sm italic text-center text-gray-600">
                <div className="flex-1 h-px bg-gray-400/25"></div> yoki <div className="flex-1 h-px bg-gray-400/25"></div>
              </div>
              <button onClick={() => handleGoogleLogin(router, setError)} className="relative w-full text-gray-300 bg-gray-800 cursor-pointer c btn">
                <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-7" alt="Google" /> Google orqali kirish
              </button> */}
            </div>
          </form>

          <div className="mt-6 text-sm text-center text-indigo-200/65">
            Akkauntingiz yo'qmi?{" "}
            <Link className="font-medium text-indigo-500" href="/signup">Ro'yxatdan o'tish</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;
