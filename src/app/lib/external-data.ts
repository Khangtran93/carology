import { ArticleSummary } from "./definition";
import { unstable_cacheLife as cacheLife } from 'next/cache'

async function fetchWithDelay(url: string, delayMs: number) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  try {
    const res = await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_NEWS_API_KEY!
      },
      next: { revalidate: 43200 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}


export async function getNewsArticles() {
  'use cache'
  cacheLife('hours')
  const params = new URLSearchParams({
    language: "en",
    country: "AU",
    topic: 'vehicles',
    order_by: 'recent'
  })
  try {
    const res = await fetch(`https://api.freenewsapi.io/v1/news?${params}`, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_NEWS_API_KEY!
      }, 
      next: {revalidate: 43200}}) 
      if (!res.ok) {
         console.log("!res.ok")
        throw new Error(`HTTP error: ${res.status}`);
      }
      const articles = await res.json();

      const details = await Promise.all(
        articles.data.slice(0, 10).map((article: ArticleSummary, index:number) => fetchWithDelay(`https://api.freenewsapi.io/v1/details?uuid=${article.uuid}`, index*200)
      ));

      return details
      .filter((d) => d?.data?.uuid && d?.data?.thumbnail)
      .filter((d, index, arr) => 
        arr.findIndex((x) => x?.data?.title === d?.data?.title) === index
      )
      .map((d) => ({
        uuid: d.data.uuid,
        title: d.data.title,
        thumbnail: d.data.thumbnail,
        url: d.data.original_url,
        incipit: d.data.incipit
      }));
    }
    catch (error) {
      console.log(error)
      return []
    }
}
