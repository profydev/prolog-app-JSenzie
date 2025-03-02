import { useQuery } from "@tanstack/react-query";
import { getContent } from "@api/content";
import type { PageData } from "@api/content.types";

export function useGetContent() {
  return useQuery<PageData>(["content"], getContent);
}
