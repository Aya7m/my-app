"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useModalState } from "@/store/useModalStore";
import { useSearch } from "@/hooks/useBlog";
import { useQuery } from "@tanstack/react-query";
import { searchBlog } from "@/services/blog";
import { Blog } from "@/types/type";
import { useRouter } from "next/navigation";

const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useModalState();
  const [query, setQuery] = useState("");
  const querySearch = useSearch(query, 400);
  const router=useRouter()

  const {
    data: results = [],
    isLoading,
  } = useQuery({
    queryKey: ["search-blogs", querySearch],
    queryFn: () => searchBlog(querySearch),
    enabled: querySearch.length > 1,
  });

  const handleNavigate=(slug:string)=>{
    router.push(`/blogs/${slug}`)
    closeSearch()
    setQuery("");
  }

  return (
    <Modal isOpen={isSearchOpen} onClose={closeSearch}>
      <div className="space-y-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search blogs..."
          autoFocus
          className="w-full p-2 border border-secondary rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        {/* loading */}
        {isLoading && (
          <div className="px-4 py-3 text-sm text-gray-300">
            Searching...
          </div>
        )}

        {/* no results */}
        {!isLoading && querySearch && results.length === 0 && (
          <div className="px-4 py-3 text-sm text-gray-300">
            No Result Found
          </div>
        )}

        {/* results */}
        {results.length > 0 && (
          <div className="max-h-60 overflow-y-auto rounded-xl border border-secondary mt-2">
            {results.map((result: Blog) => (
              <div
              onClick={()=>handleNavigate(result.slug)}
                key={result.id}
                className="p-2 hover:bg-gray-600 rounded cursor-pointer hover:text-secondary"
              >
                {result.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
