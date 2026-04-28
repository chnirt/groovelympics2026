"use client";

import { useEffect, useState } from "react";
import { API_URL } from "./useSports";

const ATHLETES_API_URL = `${API_URL}?type=matches`;

export function useMatches() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(ATHLETES_API_URL);
        const json = await res.json();

        if (!mounted) return;

        setData(json.data || []);
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
