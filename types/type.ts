export interface postAuthor {
  name: string | null;
  image: string;
}
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
  authorId: postAuthor;
}


export interface FetchPostParams{
  pageParam?: string | null;
  limit?: number;
}

export interface FetchPostResponse{
  blogs: Blog[];
  nextCursor: string | null;
}