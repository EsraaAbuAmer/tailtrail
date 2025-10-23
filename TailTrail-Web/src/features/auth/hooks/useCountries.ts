import { use, useEffect, useState } from 'react';
import axios from 'axios';

export interface CountryData {
  country: string;
  cities: string[];
}

export const useCountries = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('https://countriesnow.space/api/v0.1/countries');
        if (data.data) {
          const updatedCountries = data.data.map((country) =>
            country.country === 'Israel' ? { ...country, country: 'Palestine' } : country,
          );
          setCountries(updatedCountries);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (selectedCountry: string) => {
    const selected = countries.find((c) => c.country === selectedCountry);
    setCities(selected ? selected.cities : []);
  };
  return { countries, cities, setCities, loading, handleCountryChange };
};
