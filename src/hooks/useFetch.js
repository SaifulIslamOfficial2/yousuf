import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!url || !token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL || ''}${url}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
}
