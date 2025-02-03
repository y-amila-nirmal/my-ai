"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded credentials (replace with your own)
    const validUsername = process.env.NEXT_PUBLIC_USERNAME;
    const validPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (username === validUsername && password === validPassword) {
      // Set cookie with expiration time (24 hours)
      const expiration = new Date();
      expiration.setTime(expiration.getTime() + 24 * 60 * 60 * 1000); // 24 hours

      document.cookie = `loggedIn=true; path=/; expires=${expiration.toUTCString()}; Secure; SameSite=Strict`;
      router.push("/chat");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
