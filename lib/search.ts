export interface Post {
  id: string;
  title: string;
  date: string;
  tags: string[];
  image?: string;
  content: string;
  excerpt: string;
}

export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) {
    return posts;
  }

  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter((post) =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}