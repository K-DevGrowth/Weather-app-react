import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const API_LOCATION_URL = "https://geocoding-api.open-meteo.com/v1/search";

const useLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [locationList, setLocationList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useDebounce(() => setDebouncedSearch(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearch) return;

    const fetchLocations = async () => {
      try {
        setIsSearching(true);
        const res = await fetch(`${API_LOCATION_URL}?name=${debouncedSearch}&count=5`);
        if (!res.ok) throw new Error("Location search failed");

        const data = await res.json();
        setLocationList(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    };

    fetchLocations();
  }, [debouncedSearch]);

  return { searchTerm, setSearchTerm, locationList, setLocationList, isSearching };
}

export default useLocationSearch;