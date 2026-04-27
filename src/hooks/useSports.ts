"use client";

import { useEffect, useState } from "react";

export const API_URL =
  "https://script.google.com/macros/s/AKfycbyd5FSP7UJQ54VqOkO6mT-5CQX7qgj-hHpD_ZhHc-pLOE7uhPkA1-WSUa-zSiYMN2cC/exec";
const SPORTS_API_URL = `${API_URL}?type=sports`;

export function useSports() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(SPORTS_API_URL);
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
