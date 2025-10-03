import { useState } from "react";

const API_REVERSE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";

const useCurrentLocation = (defaultLocation) => {
    const [country, setCountry] = useState(defaultLocation);
    const [isLocating, setIsLocating] = useState(true);
    const [error, setError] = useState(null);

    const fetchLocationName = async (latitude, longitude) => {

        try {
            const res = await fetch(
                `${API_REVERSE_GEOCODING_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            return {
                name: data.city || data.locality || data.principalSubdivision || "Unknown",
                country: data.countryName || "Unknown",
                latitude,
                longitude,
            };
        } catch (err) {
            return defaultLocation;
        }
    };

    const requestLocation = () => {
        setIsLocating(true);
        setError(null);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationName = await fetchLocationName(latitude, longitude);
                    setCountry(locationName);
                    setIsLocating(false);
                },
                () => {
                    setCountry(defaultLocation);
                    setIsLocating(false);
                    setError("Unable to retrieve your location");
                }
            );
        } else {
            setCountry(defaultLocation);
            setIsLocating(false);
            setError("Geolocation is not supported by this browser.");
        }
    };


    const handleSelectLocation = (location) => {
        setCountry(location);
    };

    return { country, isCurrentLocationError: error, isLocating, handleSelectLocation, requestLocation }
};

export default useCurrentLocation;