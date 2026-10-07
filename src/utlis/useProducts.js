import { useEffect, useState } from "react";
import { api } from "./customAPI";
import { apiError } from "./apiError";

export function useProducts(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const query = params.toString();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get(`/product/all${query ? `?${query}` : ""}`)
      .then((response) => {
        if (!active) return;
        setProducts(Array.isArray(response.data?.data) ? response.data.data : []);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(apiError(err, "Unable to load products"));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [query]);

  return { products, loading, error };
}
