import { deleteBlog, fetchBlog } from "@/services/blog";
import { FetchPostResponse } from "@/types/type";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useInfiniteBlogs({ limit }: { limit: number }) {
  return useInfiniteQuery<FetchPostResponse>({
    queryKey: ["blogs"],
    queryFn: ({ pageParam }) =>
      fetchBlog({
        pageParam: pageParam as string | null,
        limit,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// delete
export function useDeleteBlog() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (blogId: string) => deleteBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.replace("/blogs");
    },
    onError: (error) => {
      console.error("Error deleting blog:", error);
    },
  });
}

export function useSearch<T>(value: T, delay = 300) {
  const [search, setSearch] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setSearch(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return search;
}
