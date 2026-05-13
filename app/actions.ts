'use server'
import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const id = Math.random().toString(36).substring(2, 9);

  await kv.hset(`post:${id}`, {
    id,
    title,
    content,
    votes: 0,
    author: 'Anonimo',
    createdAt: Date.now()
  });

  await kv.lpush('posts_list', id);
  revalidatePath('/');
  redirect('/');
}

export async function votePost(postId: string) {
  await kv.hincrby(`post:${postId}`, 'votes', 1);
  revalidatePath('/');
}
