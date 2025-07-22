import { useState } from "react";
import axios from "axios";
import React from "react";
import { useAppDispatch } from "../features/Slices/hooks";
import { motion } from "framer-motion";
import { setLogInState } from "../features/Slices/MainSlice";
import { IConfirmationResultCard } from "../SharedComponents/ConfirmationResultCard";
import { ConfirmationResultCard } from "../SharedComponents/ConfirmationResultCard";
import { setToken } from "../features/Slices/MainSlice";
interface FormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showSendResult, setShowSendResult] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showErrorMessage) setShowErrorMessage(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Authorization/login",
        {
          email: formData.email,
          password: formData.password,
        },{withCredentials: true}
      );

      

      if (response.data.frozen === true) {
        setShowSendResult(true);
      } else {
        dispatch(setLogInState({ Type: response.data.type, IsLoggedIn: true }));
        dispatch(setToken(response.data.token));
        localStorage.setItem("account", response.data.account);
         localStorage.setItem("type", response.data.type);
         localStorage.setItem("refreshtoken", response.data.refreshtoken);
      }
    } catch (error) {
      setShowErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmationResult: IConfirmationResultCard | null = showSendResult
    ? {
        onclose: () => setShowSendResult(false),
        message: "Your account is not accessible, please contact the staff for more information",
        messagestate: true,
      }
    : null;

  return (
    <div className="flex items-center justify-center p-3 mb-2 mt-2 sm:mt-11 flex-1">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-cyan-700 mb-6">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your email and password to log in.
          </p>
          {showErrorMessage && (
            <p className="text-center text-red-600 mb-2 mt-1 font-semibold">
              Invalid Credentials.
            </p>
          )}
        </div>

        <motion.form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <label htmlFor="email" className="block text-gray-700">
              Account
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <small className="text-red-500 text-sm">{errors.email}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <small className="text-red-500 text-sm">{errors.password}</small>}
          </div>

          <div className="form-field">
            <motion.button
              type="submit"
              className="w-full py-3 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center gap-2"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </motion.button>
          </div>
        </motion.form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Nova All rights reserved.</p>
        </div>
      </div>

      {confirmationResult && <ConfirmationResultCard infos={confirmationResult} />}
    </div>
  );
};
