import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { center } from "./CenterMarker";

const GoogleMapAPI = ({ newMarker, sendNewMarker }) => {
  // Set google map libraries
  const [libraries] = useState(["places"]);
  // Load google map script
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB6Xu3rpJ_RKOn4qJR-lmXQHIOXQGMd9dY",
    libraries,
  });

  // Set marker default to KKU
  const [markers, setMarker] = useState(center);

  // Set new marker when user click on map
  const onMapClick = (event) => {
    sendNewMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setMarker(() => {
      return {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    });
  };

  // Set new marker when user type place and select
  useEffect(() => {
    if (newMarker) {
      setMarker(newMarker);
    }
  }, [newMarker]);

  return (
    <div className="flex flex-col mt-3">
      {isLoaded && markers ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "45vh",
          }}
          center={markers}
          zoom={15}
          onClick={onMapClick}
          //? streetViewControl is a doll to drop to street
          //? fullscreenControl is a full screen button
          //? mapTypeControl is a type of map like satellite
          options={{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }}
        >
          <Marker
            position={{
              lat: markers.lat,
              lng: markers.lng,
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GoogleMapAPI;
