import request from '../../utils/request';
import { BlogPost } from '../../components/blog/BlogCard';

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

export const fetchBlogPosts = async (page = 1, pageSize = 10) => {
  try {
    const response = await request.get('http://localhost:1337/api/posts', {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'sort': 'publishedAt:desc',
        'filters[Published][$eq]': true
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    throw error;
  }
};

export const fetchBlogPostBySlug = async (slug: string) => {
  try {
    const response = await request.get('http://localhost:1337/api/posts', {
      params: {
        'filters[Slug][$eq]': slug,
         'populate': 'CoverImage'
      }
    });
    
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error);
    throw error;
  }
};
