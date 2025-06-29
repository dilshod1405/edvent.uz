import { signIn, getSession } from "next-auth/react";
import axios from "axios";

export const handleGoogleLogin = async (router, setError) => {
    try {
      const result = await signIn("google", {redirect: false});
  
      // Check if there was an error in the Google login process
      if (result?.error) {
        console.error("Google login failed:", result.error);
        setError(result.error);
        return;
      }
  
      // Fetch the session to get user data and the ID token
      const session = await getSession();
      console.log("Session:", session);
      const idToken = session?.idToken;
      
  
      if (!idToken) {
        console.error("No ID token found in session!");
        setError("Google identifikatsiyasi topilmadi.");
        return;
      }
  
      // Send the ID token to your backend to process login
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authentication/google-auth/`, {
        token: idToken
      });
  
      // Check if the backend responded successfully
      if (response.status === 200) {
        const { access, refresh, user} = response.data;
        const { id, email, username, first_name, last_name, role, photo } = user;
        console.log("Backend Response:", response.data);
        console.log("Access Token:", access);
        console.log("Refresh Token:", refresh);
        console.log("User Data:", user);
        // Store the tokens and user data in localStorage
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("role", role); 
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("photo", photo);
  
        console.log("Tokens saved, redirecting...");
        router.push("/api/dashboard"); // Ensure proper redirection after successful login
      } else {
        console.log("Failed to log in, status:", response.status);
        setError("Google orqali kirish muvaffaqiyatsiz bo'ldi.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google orqali kirishda xatolik yuz berdi.");
    }
  };