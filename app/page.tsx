import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { ParticlesBackground } from "@/components/particles-background";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <ParticlesBackground />
      <main className="max-w-7xl mx-auto py-8 px-4 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Capillarist</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            テクノロジー、科学、人生について考えるブログ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">記事がありません</p>
          </div>
        )}
      </main>
    </>
  );
}
