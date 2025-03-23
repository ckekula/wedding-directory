export interface BlogPost {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Content: string;
  Author: string;
  Published: boolean;
  CoverImage: {
    id: number;
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogCardProps {
  post: BlogPost;
}

export interface BlogResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}