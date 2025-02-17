"use client";

import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";
import { FIND_VENDOR_BY_SERVICE } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useState, useEffect } from "react";

interface GoogleMapComponentProps {
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
  lng: 79.8612, // Default: Colombo, Sri Lanka
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ serviceId }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: vdata, loading: vendorLoading, error: vendorError } = useQuery(FIND_VENDOR_BY_SERVICE, {
    variables: { offering_id: serviceId },
    skip: !serviceId,
  });

  const vendorData = vdata?.findVendorsByOffering || [];
  const vendorLocation = vendorData.length > 0 ? vendorData[0].location : null;

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!vendorLocation) {
        setError("Vendor location not found");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: vendorLocation,
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            },
          }
        );

        if (response.data.results.length > 0) {
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

    if (vendorLocation) {
      fetchCoordinates();
    }
  }, [vendorLocation]);

  if (vendorLoading) return <LoaderHelix />;
  if (vendorError) return <div>Error fetching location</div>;

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={18}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
