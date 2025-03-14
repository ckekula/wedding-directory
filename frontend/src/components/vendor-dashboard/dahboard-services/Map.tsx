"use client";

import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";
import { FIND_VENDOR_BY_SERVICE } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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
  const [isFetchingCoordinates, setIsFetchingCoordinates] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Google Maps API only once
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const { data: vdata, loading: vendorLoading, error: vendorError } = useQuery(FIND_VENDOR_BY_SERVICE, {
    variables: { offering_id: serviceId },
    skip: !serviceId,
  });

  const vendorData = vdata?.findVendorsByOffering || [];
  const vendorLocation = vendorData.length > 0 ? vendorData[0].location : null;

  useEffect(() => {
    if (!vendorLocation) return; // Wait until vendorLocation is available

    setIsFetchingCoordinates(true);
    setError(null);

    const fetchCoordinates = async () => {
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

        if (response.data.results.length === 0) {
          // setError("Location not found");
          console.error(response);
          return;
        }

        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } catch (err) {
        setError("Error fetching coordinates");
        console.error("Geocoding error:", err);
      } finally {
        setIsFetchingCoordinates(false);
      }
    };

    fetchCoordinates();
  }, [vendorLocation]);

  if (vendorLoading || isFetchingCoordinates || !isLoaded) return <LoaderHelix />;
  if (vendorError || error || loadError) return <div>Error: {error || vendorError?.message || "Failed to load Google Maps"}</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={16}>
      <Marker position={coordinates} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
