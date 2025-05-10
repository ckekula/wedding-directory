import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogCardProps } from "../../types/blogTypes";

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Function to strip markdown for preview
  const stripMarkdown = (markdown: string) => {
    return markdown
      .replace(/#{1,6}\s?([^\n]+)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/!\[([^\]]+)\]\([^)]+\)/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/```[^`]*```/g, "")
      .replace(/^\s*>\s*(.*)$/gm, "$1")
      .replace(/^\s*[-+*]\s+(.*)$/gm, "$1")
      .replace(/^\s*\d+\.\s+(.*)$/gm, "$1")
      .replace(/\n\n/g, " ")
      .trim();
  };

  const contentPreview = stripMarkdown(post.Content).substring(0, 120) + "...";

  const imageUrl = post.CoverImage?.url
    ? `http://51.79.145.226:5000${post.CoverImage.url}`
    : "/images/placeholder-blog.jpg"; // Add a placeholder image

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-52 w-full overflow-hidden group">
        {post.CoverImage && (
          <Image
            src={imageUrl}
            alt={post.Title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

        
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <p className="text-sm text-gray-500 mb-2 font-light flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <h2 className="text-xl font-semibold mb-3 font-title text-gray-800 line-clamp-2">
            {post.Title}
          </h2>

          <p className="text-gray-600 mb-5 font-light line-clamp-3">
            {contentPreview}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-gray-600 text-sm font-medium">
            By {post.Author}
          </span>
          <Link
            href={`/blog/${post.Slug}`}
            className="text-orange hover:text-orange-700 transition-colors font-medium flex items-center group"
          >
            Read More
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
