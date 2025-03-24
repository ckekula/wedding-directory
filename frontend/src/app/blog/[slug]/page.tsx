"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await fetchBlogPostBySlug(slug);
        //console.log("Individual blog post data:", data);
        setPost(data);
      } catch (err: unknown) {
        // Change from any to unknown
        // Type guard to handle the error properly
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(`Failed to load blog post: ${errorMessage}`);
       // console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading blog post...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500 mb-4">{error || "Blog post not found"}</p>
        <Link href="/blog" className="text-orange ">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Debug the CoverImage field
 // console.log("CoverImage field:", post.CoverImage);

  // Determine if we have a valid image URL
  const hasValidImage = post.CoverImage && post.CoverImage.url;
  const imageUrl = hasValidImage
    ? `http://localhost:1337${post.CoverImage.url}`
    : null;

 // console.log("Image URL:", imageUrl);

  return (
    <div className="bg-lightYellow font-body min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-4 max-w-5xl mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to Blog
        </Link>

        <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4 font-title">{post.Title}</h1>
          <div className="text-gray-600 mb-6 font-body">
            By {post.Author} • {new Date(post.publishedAt).toLocaleDateString()}
          </div>

          {imageUrl ? (
            <div className="relative h-64 md:h-96 w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={post.Title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          ) : (
            <div className="mb-6 text-gray-500 text-center py-12 bg-gray-100 rounded-lg">
              No cover image available
            </div>
          )}

          <div className="prose prose-lg max-w-none font-body">
            <ReactMarkdown>{post.Content}</ReactMarkdown>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
