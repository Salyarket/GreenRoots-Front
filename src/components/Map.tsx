"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type * as Leaflet from "leaflet";

interface MapProps {
  places: { id: number; name: string; lat: number; lng: number }[];
}

export default function Map({ places }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Leaflet.Map | null>(null);
  const markersLayerRef = useRef<Leaflet.LayerGroup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    const run = async () => {
      if (!containerRef.current) return;

      const L = await import("leaflet");

      const customIcon: Leaflet.Icon = new L.Icon({
        iconUrl: "/map-icon.webp",
        iconSize: [25, 50],
        iconAnchor: [12, 65],
        popupAnchor: [-3, -76],
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
      });

      // On init map une seule fois
      if (!mapInstanceRef.current) {
        const [lat, lng] = places.length
          ? [places[0].lat, places[0].lng]
          : [46.6031, 1.8883];

        mapInstanceRef.current = L.map(containerRef.current).setView([lat, lng], 6);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
          minZoom: 2,
          maxZoom: 18,
        }).addTo(mapInstanceRef.current);

        markersLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
      }
      // On met à jour les markers à chaque changement de places
      const map = mapInstanceRef.current!;
      const markersLayer = markersLayerRef.current!;

      // On cleare les anciens markers
      markersLayer.clearLayers();

      // Markers ajoutés
      const markers: Leaflet.Marker[] = places.map((place) =>
        L.marker([place.lat, place.lng], { icon: customIcon }).bindPopup(
          `<b>${place.name}</b>`
        )
      );
      markers.forEach((m) => m.addTo(markersLayer));

      // On ajuste la vue
      if (places.length > 1) {
        const group: Leaflet.FeatureGroup = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
      } else if (places.length === 1) {
        map.setView([places[0].lat, places[0].lng], 12);
      } else {
        map.setView([46.6031, 1.8883], 6);
      }

      setMapLoaded(true);
      // Redimensionnement correct de la carte
      timeoutId = window.setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };
    run();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [places]);

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Chargement de la carte...
        </div>
      )}
    </div>
  );
}
