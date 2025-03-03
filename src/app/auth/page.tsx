"use client";

import { useSound } from "@/context/SoundContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authPage, setAuthPage] = React.useState("login");
  const { playClick } = useSound();

  const router = useRouter();

  const login = async () => {
    console.log({ username, password });

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username,
        password,
      });
      const user = response.data.user.username;
      const id = response.data.user.id;
      const rating = response.data.user.rating;
      localStorage.setItem("username", user);
      localStorage.setItem("userId", id);
      localStorage.setItem("rating", rating);
      router.push("/");
    } catch (error) {
      console.error("Error logging user, please try again!", error);
    }
  };

  const register = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/register", {
        username,
        password,
      });
      const status = response.data.success;
      if (status === true) {
        setAuthPage("login");
        alert("User registered successfully, please login now!");
      } else {
        alert("Unable to create the account, please try again!");
      }
    } catch (error) {
      console.error("Error logging user, please try again!", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-end p-4 bg-[url(/BaghChal.jpg)] bg-no-repeat bg-center bg-cover relative overflow-hidden scroll-hidden">
      <Link href="/">
        <button
          className="absolute top-5 left-5 bg-[url(/back.png)] active:scale-90 transition-all w-[10rem] h-[5rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer"
          onClick={() => playClick()}
        >
          <p className="text-xl text-black">Back</p>
        </button>
      </Link>

      {authPage === "login" ? (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[16rem] h-[6rem] text-black text-[1.5rem] p-3 rounded-full active:scale-90 transition-all bg-transparent bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 outline-none text-center placeholder-[white]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[16rem] h-[6rem] text-black text-[1.5rem] p-3 rounded-full active:scale-90 transition-all bg-transparent bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 outline-none text-center placeholder-[white]"
          />

          <button
            className="w-[16rem] h-[6rem] text-black text-[1.5rem] p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2"
            onClick={login}
          >
            Login
          </button>

          <div
            onClick={() => setAuthPage("signup")}
            className="text-white text-lg hover:underline"
          >
            Don &apos;t have an account? Sign up
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[16rem] h-[6rem] text-black text-[1.5rem] p-3 rounded-full active:scale-90 transition-all bg-transparent bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 outline-none text-center placeholder-[white]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[16rem] h-[6rem] text-black text-[1.5rem] p-3 rounded-full active:scale-90 transition-all bg-transparent bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2 outline-none text-center placeholder-[white]"
          />

          <button
            className="w-[16rem] h-[6rem] text-black text-[1.5rem] p-3 rounded-full active:scale-90 transition-all bg-[url(/wooden.png)] bg-center bg-cover hover:translate-y-2"
            onClick={register}
          >
            Register
          </button>

          <div
            onClick={() => setAuthPage("login")}
            className="text-white text-lg hover:underline"
          >
            Already have an account? Login
          </div>
        </div>
      )}
    </div>
  );
}
