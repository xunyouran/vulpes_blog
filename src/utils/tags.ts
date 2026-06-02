import type { CollectionEntry } from 'astro:content';

/** Extract all unique tags with their post counts, sorted by count descending */
export function getAllTagsWithCounts(
  posts: CollectionEntry<'blog'>[],
): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** Extract all unique categories with their post counts */
export function getAllCategoriesWithCounts(
  posts: CollectionEntry<'blog'>[],
): { category: string; count: number }[] {
  const catMap = new Map<string, number>();

  for (const post of posts) {
    const cat = post.data.category;
    catMap.set(cat, (catMap.get(cat) || 0) + 1);
  }

  return Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
