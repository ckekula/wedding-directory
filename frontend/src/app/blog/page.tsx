"use client";

import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "../../api/blog/blog.api";
import { BlogResponse } from "../../types/blogTypes";
import BlogCard from "../../components/blog/BlogCard";
import Pagination from "../../components/blog/Pagination";
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
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(`Failed to load blog posts: ${errorMessage}`);
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
      <div className="bg-lightYellow font-body min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto p-6 flex-grow">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>

          {/* Skeleton loader */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow animate-pulse h-96"
              >
                <div className="h-52 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mt-8"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-lightYellow font-body min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto p-4 text-center flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Error Loading Blog
            </h2>
            <p className="text-red-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blogData || !blogData.data || blogData.data.length === 0) {
    return (
      <div className="bg-lightYellow font-body min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto p-4 text-center flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              No Blog Posts Found
            </h2>
            <p className="text-gray-600 mb-6">
              There are currently no blog posts available.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-lightYellow font-body min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Decorative Background */}
      <div className="relative bg-gradient-to-r from-orange/10 to-pink-100/30 py-20">
        <div className="absolute inset-0 opacity-10 pattern-dots pattern-gray-700 pattern-bg-transparent pattern-size-4"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="font-title text-5xl md:text-6xl text-center mb-4 text-gray-800">
            Say I Do <span className="text-orange">Blog</span>
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto font-light text-lg">
            Inspiration, ideas and stories to help you plan your perfect wedding
            day
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <div
          className={`grid ${
            isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"
          } gap-8`}
        >
          {blogData.data.map((post) => (
            <div
              key={post.id}
              className="transform transition-all duration-300 hover:-translate-y-2 h-full"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {blogData.meta.pagination.pageCount > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={blogData.meta.pagination.pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
