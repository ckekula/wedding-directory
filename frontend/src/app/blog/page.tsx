"use client";

import React, { useEffect, useState } from "react";
import { fetchBlogPosts, BlogResponse } from "../../api/blog/blog.api";
import BlogCard from "../../components/blog/BlogCard";
import useMediaQuery from "../../hooks/useMediaQuery";
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";

export default function BlogPage() {
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPosts(currentPage, pageSize);
        setBlogData(data);
      } catch (err: unknown) {
        // Change from any to unknown
        // Type guard to handle the error properly
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(`Failed to load blog posts: ${errorMessage}`);
       // console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading blog posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!blogData || !blogData.data || blogData.data.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        No blog posts found.
      </div>
    );
  }

  return (
    <div className="bg-lightYellow font-body min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-4 mb-8">
        <div
          className={`grid mt-8 ${
            isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"
          } gap-6`}
        >
          {blogData.data.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {blogData.meta.pagination.pageCount > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from(
                { length: blogData.meta.pagination.pageCount },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border border-gray-300 text-sm font-medium ${
                    page === currentPage
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === blogData.meta.pagination.pageCount}
                className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
