"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

interface CommentsProps {
  serviceId: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapComponent: React.FC<CommentsProps> = ({ serviceId }) => {

  const MapApi = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  //  const address = "Colombo";

  //  const coordinates = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${MapApi}`);
  const center = { lat: 6.9271, lng: 79.8612 };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
