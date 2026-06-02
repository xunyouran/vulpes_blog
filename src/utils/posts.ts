import { getCollection, type CollectionEntry } from 'astro:content';

/** Get all blog posts from the content collection */
export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  return await getCollection('blog');
}

/** Filter and sort published posts (newest first) */
export function getPublishedPosts(
  posts: CollectionEntry<'blog'>[],
): CollectionEntry<'blog'>[] {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Filter posts by a specific tag */
export function getPostsByTag(
  posts: CollectionEntry<'blog'>[],
  tag: string,
): CollectionEntry<'blog'>[] {
  return posts.filter((post) =>
    post.data.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

/** Filter posts by a specific category */
export function getPostsByCategory(
  posts: CollectionEntry<'blog'>[],
  category: string,
): CollectionEntry<'blog'>[] {
  return posts.filter(
    (post) => post.data.category.toLowerCase() === category.toLowerCase(),
  );
}

/** Get featured posts (limited count) */
export function getFeaturedPosts(
  posts: CollectionEntry<'blog'>[],
  limit = 3,
): CollectionEntry<'blog'>[] {
  return getPublishedPosts(posts)
    .filter((p) => p.data.featured)
    .slice(0, limit);
}

/** Get paginated posts slice */
export function getPaginatedPosts(
  posts: CollectionEntry<'blog'>[],
  page: number,
  perPage: number,
): CollectionEntry<'blog'>[] {
  const start = (page - 1) * perPage;
  return posts.slice(start, start + perPage);
}
