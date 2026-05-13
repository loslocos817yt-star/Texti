import { kv } from '@vercel/kv';
import { createPost, votePost } from './actions';

export default async function Home() {
  const postIds = await kv.lrange('posts_list', 0, 50);
  const posts = await Promise.all(postIds.map(id => kv.hgetall(`post:${id}`)));

  return (
    <main className="max-w-2xl mx-auto p-4 font-sans">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-black tracking-tighter text-orange-600">TEXTIT</h1>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">by PattitexTEC</span>
      </header>

      <form action={createPost} className="mb-8 space-y-3 bg-white p-4 border rounded-lg shadow-sm">
        <input name="title" placeholder="Título del post" className="w-full p-2 border-b outline-none font-bold text-lg" required />
        <textarea name="content" placeholder="Contenido de texto..." className="w-full p-2 outline-none h-20 text-sm resize-none" />
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md active:scale-95 transition">
          Publicar
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post: any) => (
          <div key={post.id} className="flex border bg-white rounded-md overflow-hidden hover:border-orange-200 transition">
            <form action={async () => { 'use server'; await votePost(post.id); }} className="bg-gray-50 w-12 flex flex-col items-center pt-2 border-r">
              <button className="text-gray-400 hover:text-orange-600">▲</button>
              <span className="text-xs font-bold my-1">{post.votes || 0}</span>
            </form>
            <div className="p-4">
              <span className="text-[10px] text-gray-400 uppercase font-bold">u/{post.author}</span>
              <h2 className="text-lg font-bold leading-tight">{post.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
