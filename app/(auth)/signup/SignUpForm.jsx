"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function SignUpForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // New state for email error
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

  // Function to check email availability
  const checkEmailAvailability = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/check-email/`, 
        { email },
        {headers: { "Content-Type": "application/json", 'X-CSRFToken': 'csrftoken'}
      }
      );
      setEmailError(""); // Clear email error if available
    } catch (error) {
      if (error.response?.data?.detail) {
        setEmailError(error.response.data.detail); // Set error if email exists
      }
    }
  };

  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Reset error message
    if (e.target.value) {
      checkEmailAvailability(e.target.value); // Check email availability on change
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError("");
    setSuccessMessage(""); 

    try {
      if (!firstname || !lastname || !email || !username || !password) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      if (emailError) {
        setError("Please fix the email issue before proceeding.");
        setLoading(false);
        return;
      }

      // Sending registration request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/register/`,
        {
          first_name: firstname,
          last_name: lastname,
          email,
          username,
          password,
        }
      );

      console.log("Backend Response Status:", response.status);
      console.log("Backend Response Data:", response.data);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! Iltimos, emailingizni tekshirib, tasdiqlash havolasini bosing.");

        // Clear form fields
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");

        setTimeout(() => {
          router.push(`/verify-email/${token}`);
        }, 3000);
      } else {
        setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      if (error.response) {
        setError(
          error.response?.data?.detail ||
          "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        );
      } else {
        setError("Tarmoqda uzilish yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-indigo-200/65">
            Ism <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full form-input"
            placeholder="Ismingiz"
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-indigo-200/65">
            Familiya <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full form-input"
            placeholder="Familiyangiz"
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-indigo-200/65">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full form-input"
            placeholder="Elektron pochta"
            required
            value={email}
            onChange={handleEmailChange} // Use handleEmailChange here
          />
          {emailError && (
            <div className="mt-2 text-sm text-red-500">{emailError}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-indigo-200/65">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full form-input"
            placeholder="Username kiriting"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-200/65">
            Parol <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full form-input"
            placeholder="Parol qo'ying"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <button
          className="w-full py-2 text-white bg-indigo-600 rounded cursor-pointer btn"
          disabled={loading || emailError} // Disable button if email is not valid
        >
          {loading ? (
            <CircularProgress style={{ color: "white", width: "20px", height: "20px" }} />
          ) : (
            "Ro'yxatdan o'tish"
          )}
        </button>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
        {successMessage && <div className="mt-4 text-center text-green-500">{successMessage}</div>}
      </div>
    </form>
  );
}
