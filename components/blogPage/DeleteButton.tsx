
import { useDeleteBlog } from "@/hooks/useBlog";
import React from "react";
import toast from "react-hot-toast";
import { LuTrash } from "react-icons/lu";

const DeleteButton = ({ blogId }: { blogId: string }) => {
  const { mutate: deleteBlog, isPending } = useDeleteBlog();
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (confirmDelete) {
      deleteBlog(blogId, {
        onSuccess: () => {
          toast.success("Blog deleted successfully");
        },
       
      });
    }
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      type="button"
      className="inline-flex items-center gap-3 px-3 py-1.5 text-sm font-medium border bg-red-500 text-white rounded-full hover:bg-red-800 hover:text-white teansition-all duration-300"
    >
      <LuTrash />
      Delete
    </button>
  );
};

export default DeleteButton;
