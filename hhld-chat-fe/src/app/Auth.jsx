"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "./zustand/useAuthStore";

function Auth() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { updateAuthName } = useAuthStore();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_HOST}:5001/auth/signup`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.status === false) {
        alert(res.data.message);
      } else {
        updateAuthName(username);
        router.push("/chat");
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error.response);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_HOST}:5001/auth/login`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (res?.data?.status === false) {
        alert(res.data.message);
      } else {
        updateAuthName(username);
        router.push("/chat");
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error.response);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup or Login to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex">
              <button
                type="submit"
                onClick={handleSignUp}
                className="flex m-2 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
              <button
                type="submit"
                onClick={handleLogin}
                className="flex m-2 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
