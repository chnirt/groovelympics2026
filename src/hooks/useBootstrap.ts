"use client";

import useSWR from "swr";
import { API_URL } from "../constants";

const BOOTSTRAP_API_URL = `${API_URL}?type=bootstrap`;

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
};

export function useBootstrap() {
  const { data, error, isLoading } = useSWR(BOOTSTRAP_API_URL, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 5,
  });

  return {
    data: data?.data || [],
    loading: isLoading,
    error: error?.message || null,
  };
}
