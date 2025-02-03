"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { genarateContent } from "@/lib/ai-api";

export default function ChatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("loggedIn=true");
    if (!isLoggedIn) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);
  
  const handlePrompt = async (e: React.FormEvent) => {
    const inpuElement = e.currentTarget as HTMLInputElement;
    setPrompt(inpuElement.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await genarateContent(prompt);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Welcome to the Chat!</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Enter your prompt"
          onChange={handlePrompt}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      <button
        onClick={() => {
          // Expire the cookie immediately
          document.cookie = "loggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          router.push("/");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
