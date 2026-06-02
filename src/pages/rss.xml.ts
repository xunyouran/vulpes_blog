import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPublishedPosts } from '../utils/posts';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../consts';

export async function GET(context: { site: URL | string }) {
  const posts = getPublishedPosts(await getCollection('blog'));

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
      customData: post.data.updatedDate
        ? `<updatedDate>${post.data.updatedDate.toISOString()}</updatedDate>`
        : undefined,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
