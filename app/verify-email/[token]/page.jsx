"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/ui/header";
import { CircularProgress } from "@mui/material";

const EmailVerification = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/authentication/verify-email/${token}/`);
        if (response.status === 200) {
          const userEmail = response.data.email; // <-- get email from backend
          // Redirect to signin page with email
          router.push(`/signin?email=${encodeURIComponent(userEmail)}`);
        } else {
          setError("Email verification failed.");
        }
      } catch (err) {
        setError("Network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  if (loading) return <div>
    <Header />
    <CircularProgress style={{ color: "white", width: "80px", height: "80px", margin: "auto", display: "block", marginTop: "200px" }} />
  </div>;
  if (error) return <div>{error}</div>;

  return null; // No need to render anything because you will redirect
};

export default EmailVerification;
