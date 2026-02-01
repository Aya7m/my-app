"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import React, { useRef, useMemo, useState } from "react";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});
const Page = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<null | File>(null);
  const [submiting, setSubmiting] = useState(false);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
      theme: "dark",
      style: {
        background: "#121212",
        color: "text-secondary",
      },
    }),
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!title || !excerpt || !content || !coverImage) {
        toast.error("Please fill all the fields");
        return;
      }
      setSubmiting(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("coverImage", coverImage);

      await axios.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog created successfully");
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
    finally {
      setSubmiting(false);
    }
  };
  return (
    <section className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-10">Write A New Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Blog Title"
          className="w-full bg-transparent text-primary text-2xl placeholder-secondary outline-none mb-6 border p-2 rounded"
        />

        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          placeholder="Write At List Tow Character .."
          className=" outline-none placeholder-secondary w-full bg-text/30 text-primary border mb-10 p-2"
        ></textarea>

        <div className="mb-10">
          <label
            htmlFor="img"
            className="px-4 py-2 rounded bg-text text-background"
          >
            Image
          </label>
          <input
            id="img"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0]) || null}
            className="hidden w-full text-sm"
          />
        </div>

        <div className="rounded-2xl overflow-hidden border mb-10">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <button className="px-4 py-2 bg-text text-background cursor-pointer">
          {submiting ? "Publish..." : "Publish Blog"}
        </button>
      </form>
    </section>
  );
};

export default Page;
