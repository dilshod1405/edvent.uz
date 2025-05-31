"use client";
import Link from "next/link";
import Logo from "./logo";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [photo, setPhoto] = useState(() => localStorage.getItem("photo") || "");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access");
      const id = localStorage.getItem("id");

      if (!token || !id || id === "undefined") {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/authentication/users/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status !== 200) {
          throw new Error("Failed to fetch user data");
        }

        const fetchedPhoto = res.data.photo || "";
        setPhoto(fetchedPhoto);
        localStorage.setItem("photo", fetchedPhoto);

        setFirstname(res.data.first_name);
        setLastname(res.data.last_name);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <header className="z-30 w-full mt-2 md:mt-5">
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="relative flex items-center justify-between gap-3 px-3 h-14 rounded-2xl bg-gray-900/90">
            <Logo />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="z-30 w-full mt-2 md:mt-5">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="relative flex items-center justify-between gap-4 px-3 h-14 rounded-2xl bg-gray-900/90">
          <div className="flex items-center flex-1">
            <Logo />
          </div>
          <ul className="flex items-center justify-end flex-1 gap-3">
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/api/dashboard" className="text-sm text-gray-200 hover:underline">
                    {firstname} {lastname}
                  </Link>
                </li>
                {photo && (
                  <li>
                    <Avatar
                      alt={`${firstname} ${lastname}`}
                      src={`${process.env.NEXT_PUBLIC_API_URL}${photo}`}
                    />
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link href="/signin" className="py-1 text-gray-300 bg-gray-800 btn-sm">
                    Kirish
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="py-1 text-white bg-indigo-600 btn-sm">
                    Ro'yxatdan o'tish
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
