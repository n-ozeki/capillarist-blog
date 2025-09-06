import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Post } from "./search";

export function getAllPosts(): Post[] {
  const postsDir = path.join(process.cwd(), "app/posts");
  
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  const postFolders = fs.readdirSync(postsDir).filter((name) => {
    const stat = fs.statSync(path.join(postsDir, name));
    return stat.isDirectory();
  });

  const posts = postFolders.map((folder) => {
    const filePath = path.join(postsDir, folder, "post.md");
    if (!fs.existsSync(filePath)) return null;
    
    const file = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(file);
    
    // Create excerpt from content (first 200 characters of content without markdown)
    const plainContent = content.replace(/[#*`_~\[\]]/g, '').replace(/\n+/g, ' ').trim();
    const excerpt = plainContent.length > 200 
      ? plainContent.substring(0, 200) + "..." 
      : plainContent;

    return {
      id: folder,
      title: data.title || "無題",
      date: data.date || new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      image: data.image,
      content,
      excerpt,
    } as Post;
  }).filter((post): post is Post => post !== null);

  // Sort by date (newest first)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

