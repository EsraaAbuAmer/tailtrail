import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Box, Button, Typography } from '@mui/material';
import L from 'leaflet';
import { useAppSelector } from '../../../store/hooks';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.setView([lat, lng], map.getZoom());
  return null;
}

function LocationMarker({ onSelect }: { onSelect: (pos: { lat: number; lng: number }) => void }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export const MapPicker = ({
  onSelectLocation,
  initialCoords,
}: {
  onSelectLocation: (coords: { lat: number; lng: number }) => void;
  initialCoords?: { lat: number; lng: number };
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [currentPos, setCurrentPos] = useState<{ lat: number; lng: number } | null>(
    initialCoords || null,
  );

  useEffect(() => {
    const fetchCityCoords = async () => {
      if (!user?.city || !user?.country || currentPos) return;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
            user.city,
          )}&country=${encodeURIComponent(user.country)}&format=json&limit=1`,
        );
        const data = await res.json();
        if (data?.length > 0) {
          const { lat, lon } = data[0];
          const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setCurrentPos(coords);
          onSelectLocation(coords);
        }
      } catch (err) {
        console.warn('Failed to fetch city coordinates:', err);
      }
    };
    fetchCityCoords();
  }, [user, onSelectLocation]);

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setCurrentPos(coords);
        onSelectLocation(coords);
      },
      (err) => {
        console.warn('Geolocation error:', err);
      },
      { enableHighAccuracy: true },
    );
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Select Location
      </Typography>

      <Box mb={1}>
        <Button variant="outlined" onClick={handleUseMyLocation}>
          Use My Current Location
        </Button>
      </Box>

      <MapContainer
        center={currentPos || { lat: 31.9539, lng: 35.9106 }} // fallback to Amman if still unknown
        zoom={13}
        style={{ height: 300, width: '100%', borderRadius: 8, overflow: 'hidden' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {currentPos && (
          <>
            <Marker position={currentPos} icon={markerIcon} />
            <RecenterMap lat={currentPos.lat} lng={currentPos.lng} />
          </>
        )}
        <LocationMarker
          onSelect={(coords) => {
            setCurrentPos(coords);
            onSelectLocation(coords);
          }}
        />
      </MapContainer>
    </Box>
  );
};
