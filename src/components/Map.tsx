"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
  places: {
    id: number;
    name: string;
    lat: number;
    lng: number;
  }[];
}

export default function Map({ places }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Charger Leaflet uniquement côté client
    const initMap = async () => {
      if (!mapRef.current) return;

      const L = await import("leaflet");

      // Correction des icônes
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Centre par défaut (France)
      const centerLat = places.length > 0 ? places[0].lat : 46.6031;
      const centerLng = places.length > 0 ? places[0].lng : 1.8883;

      const map = L.map(mapRef.current).setView([centerLat, centerLng], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
        minZoom: 2,
        maxZoom: 18,
      }).addTo(map);

      // Ajouter les marqueurs
      places.forEach((place) => {
        L.marker([place.lat, place.lng])
          .addTo(map)
          .bindPopup(`<b>${place.name}</b>`);
      });

      // Ajuster la vue si plusieurs marqueurs
      if (places.length > 1) {
        const group = L.featureGroup(
          places.map((place) => L.marker([place.lat, place.lng]))
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }

      setMapLoaded(true);

      // Redimensionner après un court délai
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    initMap();
  }, [places]);

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
      <div ref={mapRef} className="w-full h-full" />
      {!mapLoaded && (
        <div className="absolute text-gray-500">Chargement de la carte...</div>
      )}
    </div>
  );
}
