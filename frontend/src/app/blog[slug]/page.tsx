"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBlogPostBySlug, BlogPost } from "../../api/blog/blog.api";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

// You'll need to install react-markdown
// npm install react-markdown

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
        setPost(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to load blog post: ${err.message}`);
          console.error("Error fetching blog post:", err);
        } else {
          setError("Failed to load blog post");
          console.error("Error fetching blog post:", err);
        }
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
        <Link href="/blog" className="text-blue-600 hover:text-blue-800">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const { attributes } = post;
  const coverImage = attributes.CoverImage?.data?.attributes;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Link
        href="/blog"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
      >
        ← Back to Blog
      </Link>

      <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4 font-title">
          {attributes.Title}
        </h1>
        <div className="text-gray-600 mb-6 font-body">
          By {attributes.Author} •{" "}
          {new Date(attributes.publishedAt).toLocaleDateString()}
        </div>

        {coverImage && (
          <div className="relative h-64 md:h-96 w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={`http://localhost:1337${coverImage.url}`}
              alt={attributes.Title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none font-body">
          <ReactMarkdown>{attributes.Content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
