import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export const useDebounceQuery = (key: string, delay = 500) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const isFirstMount = useRef(true);

  // Only set initial value from router
  useEffect(() => {
    if (router.isReady && isFirstMount.current) {
      setValue(String(router.query[key] || ""));
      isFirstMount.current = false;
    }
  }, [router.isReady, key]);

  // Separate effect for updating the URL
  useEffect(() => {
    if (!router.isReady || isFirstMount.current) return;

    const timer = setTimeout(() => {
      const currentQuery = String(router.query[key] || "");
      // Only update if the value is different from current query
      if (value !== currentQuery) {
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, [key]: value },
          },
          undefined,
          { scroll: false },
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, key, delay, router]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return { value, handleChange };
};
