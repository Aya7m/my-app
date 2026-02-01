import { FetchPostParams, FetchPostResponse } from "@/types/type";
import axios from "axios";

export async function fetchBlog({
  pageParam,
  limit,
}: FetchPostParams): Promise<FetchPostResponse> {
  const req = await axios.get("/api/blogs", {
    params: {
      cursor: pageParam,
      limit,
    },
  });
  return req.data;
}

export async function deleteBlog(blogId: string) {
  const req = await axios.delete(`/api/blogs/${blogId}`);
  return req.data;
}

export async function searchBlog(query: string) {
  if (!query) return [];
  const res = await axios.get("/api/blogs/search", {
    params: {
      q: query,
    },
  });

  return res.data.blogs;
}
