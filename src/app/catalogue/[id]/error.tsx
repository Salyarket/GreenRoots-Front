"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center min-h-[60vh] flex flex-col justify-center items-center space-y-8">
      <h2 className="text-xl font-bold text-red-500 uppercase">
        Oups, il semble que le produit demandé ne puisse s&apos;afficher
      </h2>
      <p className="font-bold">{error.message}</p>
      <Link
        href={"/catalogue"}
        className="mt-4 px-4 py-2 w-fit bg-brand-green text-white rounded hover: custom-btn-hover hover:bg-brand-lightgreen"
      >
        Retour
      </Link>
    </div>
  );
}
