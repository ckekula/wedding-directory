"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { fetchBlogPostBySlug } from "../../../api/blog/blog.api";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";
import { BlogPost } from "@/types/blogTypes";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await fetchBlogPostBySlug(slug);
        setPost(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(`Failed to load blog post: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [slug]);

  // Add reading progress tracking
  useEffect(() => {
    const scrollHandler = () => {
      if (!articleRef.current) return;

      const totalHeight = articleRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Start tracking after header is out of view
      if (scrollTop > 100) {
        const scrolled = (scrollTop - 100) / (totalHeight - windowHeight);
        setReadingProgress(Math.min(Math.max(scrolled * 100, 0), 100));
      } else {
        setReadingProgress(0);
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Share functionality
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.Title || "Wedding Blog Post";

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "pinterest":
        const imageUrl = post?.CoverImage?.url
          ? `http://51.79.145.226:5000${post.CoverImage.url}`
          : "";
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}&media=${encodeURIComponent(
            imageUrl
          )}&description=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "clipboard":
        navigator.clipboard.writeText(url);
        // You could add a notification here that the URL was copied
        break;
    }
  };

  if (loading) {
    return (
      <div className="bg-lightYellow font-body min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto p-6 flex-grow">
          <Link
            href="/blog"
            className="text-orange hover:text-orange-700 mb-6 inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Improved skeleton loader with shimmer effect */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer"></div>
            <div className="h-72 bg-gray-200"></div>
            <div className="p-6 md:p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex space-x-4 mb-8">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
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
              Post Not Found
            </h2>
            <p className="text-red-500 mb-6">
              {error || "Blog post not found"}
            </p>
            <Link
              href="/blog"
              className="bg-orange hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors inline-block"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine if we have a valid image URL
  const hasValidImage = post.CoverImage && post.CoverImage.url;
  const imageUrl = hasValidImage
    ? `http://51.79.145.226:5000${post.CoverImage.url}`
    : null;

  // Calculate estimated reading time
  const readingTime = calculateReadingTime(post.Content);

  return (
    <div className="bg-lightYellow font-body min-h-screen flex flex-col">
      <Header />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange to-orange-500 z-50 transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      ></div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="text-orange hover:text-orange-700 mb-8 inline-flex items-center group"
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>

          <article
            ref={articleRef}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Hero Image Section with elegant overlay */}
            {imageUrl && (
              <div className="relative h-64 md:h-[500px] w-full">
                <Image
                  src={imageUrl}
                  alt={post.Title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                {/* Enhanced title overlay with subtle animation */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white transform transition-all">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-shadow-sm">
                      {post.Title}
                    </h1>
                    <div className="flex items-center text-white/90 space-x-6 flex-wrap">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {post.Author || "Wedding Expert"}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* If no image, show title in elegant layout */}
            {!imageUrl && (
              <div className="p-8 md:p-12 border-b border-gray-100 bg-gradient-to-r from-orange/5 to-pink-100/10">
                <div className="max-w-3xl mx-auto">
                  <h1 className="font-title text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                    {post.Title}
                  </h1>
                  <div className="flex items-center text-gray-600 space-x-6 flex-wrap">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {post.Author || "Wedding Expert"}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
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
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Content Section */}
            <div className="p-6 md:p-12">
              <div className="max-w-3xl mx-auto">
                {/* Decorative first letter cap */}
                <div
                  className="prose prose-lg max-w-none font-body 
                             prose-headings:font-title prose-headings:text-gray-800 
                             prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                             prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                             prose-p:leading-relaxed prose-p:mb-6
                             prose-a:text-orange prose-a:no-underline hover:prose-a:underline 
                             prose-img:rounded-lg prose-img:shadow-md
                             prose-blockquote:border-orange prose-blockquote:bg-orange/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                             prose-ul:my-6 prose-ol:my-6
                             prose-li:mb-2 
                             prose-hr:border-gray-200 prose-hr:my-12"
                >
                  <ReactMarkdown>{post.Content}</ReactMarkdown>
                </div>

                {/* Share buttons */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between flex-wrap">
                    

                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                        Share This Post
                      </h3>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1.1.4-1.8 1.8-1.8H18V1h-3.4C10.8 1 9 2.6 9 5.6V8z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-400 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.013 10.013 0 01-3.127 1.196 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.476c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleShare("pinterest")}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.4.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleShare("clipboard")}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3 3 3 0 00-3 3h2a1 1 0 112 0v4a3 3 0 11-6 0V7a1 1 0 112 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Author section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.Author || "Wedding Expert"}
                </h3>
                <p className="text-gray-600 mb-4">
                  Wedding planning specialist with years of experience helping
                  couples create their perfect day.
                </p>
                <div className="flex justify-center md:justify-start space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-700">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Add Stylesheets for animations */}
      <style jsx>{`
        .text-shadow-sm {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer {
          animation: shimmer 2s infinite;
        }

        .prose p:first-of-type::first-letter {
          float: left;
          font-family: serif;
          font-size: 3.5em;
          line-height: 0.8;
          padding-right: 0.1em;
          font-weight: bold;
          color: #f97316;
        }
      `}</style>
    </div>
  );
}
