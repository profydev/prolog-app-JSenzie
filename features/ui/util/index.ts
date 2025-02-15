// import { useCallback, useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";
// import { ChangeEvent } from "react";

// export const useDebounceQuery = (key: string, delay = 500) => {
//   const router = useRouter();
//   const [value, setValue] = useState("");

//   // Only set initial value from router
//   useEffect(() => {
//     if (router.isReady) {
//       setValue(String(router.query[key] || ""));
//     }
//   }, [router.isReady, key]);

//   // Separate effect for updating the URL
//   useEffect(() => {
//     if (!router.isReady) return;

//     const timer = setTimeout(() => {
//       const currentQuery = String(router.query[key] || "");
//       // Only update if the value is different from current query
//       if (value !== currentQuery) {
//         router.replace(
//           {
//             pathname: router.pathname,
//             query: { ...router.query, [key]: value },
//           },
//           undefined,
//           { scroll: false },
//         );
//       }
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [value, key, delay, router]);

//   const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//   }, []);

//   return { value, handleChange };
// };

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useDebounceQuery = (key: string) => {
  const [url, handleChange] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const query = String(router.query[key] || "");
      handleChange(String(query));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;

    const currentQuery = String(router.query[key]);
    if (url !== currentQuery) {
      const timer = setTimeout(() => {
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, [key]: url },
          },
          undefined,
          { scroll: false },
        );
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [url]);

  return { url, handleChange };
};
