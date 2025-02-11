"use client";

import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";
import { FIND_SERVICES_BY_VENDOR } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useState, useEffect } from "react";

interface CommentsProps {
  serviceId: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 6.9271,
  lng: 79.8612,
};

const GoogleMapComponent: React.FC<CommentsProps> = ({ serviceId }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const address = "Divulapitiya"; // You might want to make this dynamic based on your needs
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: address,
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            },
          }
        );

        if (response.data.results && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          setError("Location not found");
        }
      } catch (err) {
        setError("Error fetching coordinates");
        console.error("Geocoding error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading map...</div>;
  }

  const { data: vdata, loading: vendorLoading, error: vendorError } = useQuery(FIND_SERVICES_BY_VENDOR, {
    variables: { offering_id: serviceId },
    skip: !serviceId,
  });

  if (vendorLoading) return <LoaderHelix />;
  if (vendorError) return <div>Error fetching address</div>;

  const vendorData = vdata?.find || [];

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={15}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;