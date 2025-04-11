import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  overflow: "hidden",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

export const Map = ({
  onLengthChange,
  onMarkerChange,
  markers = [],
  editable = true,
}: {
  onLengthChange?: (length: number) => void;
  onMarkerChange?: (markers: { lat: number; lng: number }[]) => void;
  markers?: { lat: number; lng: number }[];
  editable?: boolean;
}) => {
  useEffect(() => {
    if (markers.length > 1) {
      const total = calculateDistances(markers).reduce((acc, d) => acc + d, 0);
      onLengthChange?.(total);
    } else {
      onLengthChange?.(0);
    }
  }, [markers, onLengthChange]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!editable || !event.latLng) return;
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const newMarkers = [...markers, newMarker];
    onMarkerChange?.(newMarkers);
    if (newMarkers.length > 1) {
      const total = calculateDistances(newMarkers).reduce(
        (acc, d) => acc + d,
        0
      );
      onLengthChange?.(total);
    }
  };

  const calculateDistances = (points: { lat: number; lng: number }[]) => {
    const distances: number[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const pointA = new google.maps.LatLng(points[i].lat, points[i].lng);
      const pointB = new google.maps.LatLng(
        points[i + 1].lat,
        points[i + 1].lng
      );
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        pointA,
        pointB
      );
      distances.push(distance / 1000);
    }
    return distances;
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      onClick={handleMapClick}
    >
      {markers.map((marker, i) => (
        <Marker key={i} position={marker} />
      ))}
      {markers.length > 1 && (
        <Polyline
          path={markers}
          options={{ strokeColor: "#FF0000", strokeWeight: 2 }}
        />
      )}
    </GoogleMap>
  );
};
