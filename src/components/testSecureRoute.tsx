"use client";

import { useState } from "react";
import { getAllLocations } from "@/services/location.api";

const TestSecureRoute = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setError(null);
      const data = await getAllLocations(); // appel API
      setLocations(data);
      console.log("Locations:", data);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-darkgreen"
      >
        Tester /locations
      </button>

      {error && <p className="text-red-500 mt-4">Erreur : {error}</p>}

      {locations.length > 0 && (
        <pre className="mt-4 bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          {JSON.stringify(locations, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestSecureRoute;
