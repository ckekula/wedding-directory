import request from '../../utils/request';

// Interface matching your Strapi content type structure
export interface BlogPost {
  id: number;
  attributes: {
    Title: string;
    Slug: string;
    Content: string;
    Author: string;
    Published: boolean;
    CoverImage: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          formats: {
            thumbnail: { url: string };
            small: { url: string };
            medium: { url: string };
            large?: { url: string };
          };
        };
      } | null;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
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

export const fetchBlogPosts = async (page = 1, pageSize = 10) => {
  try {
    console.log(`Fetching blog posts from http://localhost:1337/api/posts`);
    console.log(`With params: page=${page}, pageSize=${pageSize}`);
    
    const response = await request.get('http://localhost:1337/api/posts', {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'populate': 'CoverImage',
        'sort': 'publishedAt:desc',
        'filters[Published][$eq]': true
      }
    });
    
    console.log('Full API response:', response);
    console.log('Response data structure:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch blog posts:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};


export const fetchBlogPostBySlug = async (slug: string) => {
  try {
    const response = await request.get('http://localhost:1337/api/posts', {
      params: {
        'filters[Slug][$eq]': slug,
        'populate': 'CoverImage' // Include the cover image
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
