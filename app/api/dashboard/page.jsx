"use client";
import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    // Check if the token exists and is valid
    if (!token) {
      router.push("/signin");  // Redirect if no token is found
    } else {
      setLoading(false);  // Token found, stop loading
    }
  }, [router]); // Empty array so the effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;  // Show a loading message while checking for the token
  }

  return (
    <div>
      <Header />
      <h1>Welcome!</h1>
    </div>
  );
};

export default Dashboard;
