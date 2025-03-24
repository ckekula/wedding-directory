import React from "react";
import Link from "next/link";
import Image from "next/image";
import {BlogCardProps} from "../../types/blogTypes";
// Update the interface to match the actual data structure

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
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

  const contentPreview = stripMarkdown(post.Content).substring(0, 150) + "...";

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      {post.CoverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={`http://localhost:1337${post.CoverImage.url}`}
            alt={post.Title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 font-title">{post.Title}</h2>
        <p className="text-gray-600 mb-4 font-body text-sm">
          By {post.Author} • {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4 font-body">{contentPreview}</p>
        <Link
          href={`/blog/${post.Slug}`}
          className="text-orange  font-medium font-body"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
