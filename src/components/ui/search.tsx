"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Search({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    router.push(`/catalogue?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-6 md:mt-8">
      <div className="flex border border-brand-lightgreen/30 rounded-full overflow-hidden w-full md:max-w-md">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 md:px-4 md:py-2 outline-none text-sm"
        />
        <button className="bg-brand-green hover:bg-brand-darkgreen text-white px-3 md:px-4 transition-colors">
          <CiSearch className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </form>
  );
}
