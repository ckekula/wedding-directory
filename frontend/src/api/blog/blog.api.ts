import request from '../../utils/request';



export const fetchBlogPosts = async (page = 1, pageSize = 10) => {
  try {
    const response = await request.get('http://51.79.145.226:5000/api/posts', {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'sort': 'publishedAt:desc',
        'filters[Published][$eq]': true,
        'populate': 'CoverImage',
      }
    });
    
    return response.data;
  } catch (error) {
    //console.error('Failed to fetch blog posts:', error);
    throw error;
  }
};

export const fetchBlogPostBySlug = async (slug: string) => {
  try {
    const response = await request.get('http://51.79.145.226:5000/api/posts', {
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
    //console.error(`Failed to fetch blog post with slug ${slug}:`, error);
    throw error;
  }
};
