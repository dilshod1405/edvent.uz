"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { debounce } from "@/utils";

export default function SignUpForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

  const checkEmailAvailability = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/check-email/`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": "csrftoken",
          },
        }
      );
      setEmailError("");
    } catch (error) {
      if (error.response?.data?.detail) {
        setEmailError(error.response.data.detail);
      }
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/check-username/`,
        { username },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": "csrftoken",
          },
        }
      );
      setUsernameError("");
    } catch (error) {
      if (error.response?.data?.detail) {
        setUsernameError(error.response.data.detail);
      }
    }
  };

  const debouncedCheckEmail = useCallback(
    debounce((email) => {
      checkEmailAvailability(email);
    }, 500),
    []
  );

  const debouncedCheckUsername = useCallback(
    debounce((email) => {
      checkUsernameAvailability(email);
    }, 500),
    []
  );

  // Handle input changes
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");
    if (value) {
      debouncedCheckEmail(value);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError("");
    if (value) {
      debouncedCheckUsername(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (
        !firstname ||
        !lastname ||
        !email ||
        !username ||
        !password ||
        !password2
      ) {
        setError("Barcha maydonlarni to'ldiring!");
        setLoading(false);
        return;
      }

      if (emailError) {
        setError("Email allaqachon ro'yxatdan o'tgan.");
        setLoading(false);
        return;
      }
      if (usernameError) {
        setError("Ushbu username allaqachon ro'yxatdan o'tgan.");
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
          password2,
        }
      );

      // console.log("Backend Response Status:", response.status);
      // console.log("Backend Response Data:", response.data);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage(
          "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! Iltimos, emailingizni tekshirib, tasdiqlash havolasini bosing."
        );

        // Clear form fields
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPassword2("");

        setTimeout(() => {
          router.push(`/verify-email/${token}`);
        }, 2000);
      } else {
        setError(
          "Xatolik yuz berdi. Iltimos, ma'lumotlarni tekshirib qayta urinib ko'ring."
        );
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      if (error.response) {
        setError(
          error.response?.data?.detail ||
            "Xatolik yuz berdi. Iltimos, ma'lumotlarni tekshirib qayta urinib ko'ring."
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
      {successMessage && (
        <Alert
          severity="info"
          className="mb-8"
          sx={{
            backgroundColor: "#4f39f65e",
            color: "#fff",
            borderRadius: "8px",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          <AlertTitle>Pochtani tekshiring</AlertTitle>
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert
          severity="error"
          className="mb-8"
          sx={{
            backgroundColor: "#4f39f65e",
            color: "#fff",
            borderRadius: "8px",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          <AlertTitle>Xatolik</AlertTitle>
          {error}
        </Alert>
      )}
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
            onChange={handleEmailChange}
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
            onChange={handleUsernameChange}
          />
          {usernameError && (
            <div className="mt-2 text-sm text-red-500">{usernameError}</div>
          )}
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
        <div>
          <label className="block text-sm font-medium text-indigo-200/65">
            Parolni qayta kiriting <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full form-input"
            placeholder="Parolni qayta kiriting"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <button
          className="w-full py-2 text-white bg-indigo-600 rounded cursor-pointer btn"
          disabled={loading || emailError}
        >
          {loading ? (
            <CircularProgress
              style={{ color: "white", width: "20px", height: "20px" }}
            />
          ) : (
            "Ro'yxatdan o'tish"
          )}
        </button>
        {emailError && (
          <div className="mt-2 text-sm text-red-500">{emailError}</div>
        )}
        {usernameError && (
          <div className="mt-2 text-sm text-red-500">{usernameError}</div>
        )}
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      </div>
    </form>
  );
}
