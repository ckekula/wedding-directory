import React from "react";
import Link from "next/link";
import Image from "next/image";
//import { BlogPost } from "../../api/blog/blog.api";

interface BlogCardProps {
  post: any; // Use any temporarily to debug the structure
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Add console log to see the actual structure
  console.log("Post data in BlogCard:", post);

  // Check if post has the expected structure
  const title = post.Title || post.attributes?.Title || "Untitled";
  const content = post.Content || post.attributes?.Content || "";
  const author = post.Author || post.attributes?.Author || "Unknown";
  const publishedAt =
    post.publishedAt ||
    post.attributes?.publishedAt ||
    new Date().toISOString();
  const slug = post.Slug || post.attributes?.Slug || "";

  // Handle cover image if it exists
  const coverImageUrl =
    post.CoverImage?.data?.attributes?.url ||
    post.attributes?.CoverImage?.data?.attributes?.url ||
    null;

  // Function to strip markdown for preview
  const stripMarkdown = (markdown: string) => {
    return markdown
      .replace(/#{1,6}\s?([^\n]+)/g, "$1") // Remove headings
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
      .replace(/\*([^*]+)\*/g, "$1") // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
      .replace(/!\[([^\]]+)\]\([^)]+\)/g, "") // Remove images
      .replace(/`([^`]+)`/g, "$1") // Remove inline code
      .replace(/```[^`]*```/g, "") // Remove code blocks
      .replace(/^\s*>\s*(.*)$/gm, "$1") // Remove blockquotes
      .replace(/^\s*[-+*]\s+(.*)$/gm, "$1") // Remove list items
      .replace(/^\s*\d+\.\s+(.*)$/gm, "$1") // Remove numbered list items
      .replace(/\n\n/g, " ") // Replace double newlines with space
      .trim();
  };

  const contentPreview = stripMarkdown(content).substring(0, 150) + "...";

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      {coverImageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={`http://localhost:1337${coverImageUrl}`}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 font-title">{title}</h2>
        <p className="text-gray-600 mb-4 font-body text-sm">
          By {author} • {new Date(publishedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4 font-body">{contentPreview}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium font-body"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
