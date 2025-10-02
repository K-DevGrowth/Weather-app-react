import { useEffect, useState } from "react";

const API_REVERSE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";

const useCurrentLocation = (defaultLocation) => {
    const [country, setCountry] = useState(defaultLocation);
    const [isLocating, setIsLocating] = useState(true);

    useEffect(() => {
        const fetchLocationName = async (latitude, longitude) => {
            const res = await fetch(
                `${API_REVERSE_GEOCODING_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            return data.results || defaultLocation
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const loc = await fetchLocationName(latitude, longitude);
                    setCountry(loc);
                    setIsLocating(false);
                },
                async () => {
                    setCountry(defaultLocation);
                    setIsLocating(false);
                }
            );
        }
        else {
            setCountry(defaultLocation);
            setIsLocating(false);
        }
    }, [defaultLocation]);

    const handleSelectLocation = (location) => {
        setCountry(location);
    };

    return { country, isLocating, handleSelectLocation }
};

export default useCurrentLocation;