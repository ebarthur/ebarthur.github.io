import type { CollectionEntry } from "astro:content";

function groupPosts(posts: CollectionEntry<"writing">[]) {
  const postsByYear = posts.reduce((acc, post) => {
    const year = post.data.createdAt.getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  return Object.entries(postsByYear)
    .map(([year, posts]) => [parseInt(year), posts] as [number, typeof posts])
    .sort(([a], [b]) => b - a);
}

export { groupPosts };
