import { ArticleSummary } from "./definition";

export async function getNewsArticles() {
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
      }
    })
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    throw new Error
  }
}

async function fetchWithDelay(url: string, delayMs: number) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return fetch(url, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_NEWS_API_KEY!
    },
    next: {
      revalidate: 300
    }
  }).then((r) => r.json());
}


export async function getCarouselArticles() {
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
      next: {revalidate: 300}}) 
      if (!res.ok) {
         console.log("!res.ok")
        throw new Error(`HTTP error: ${res.status}`);
      }
      const articles = await res.json();

      const details = await Promise.all(
        articles.data.slice(0, 6).map((article: ArticleSummary, index:number) => fetchWithDelay(`https://api.freenewsapi.io/v1/details?uuid=${article.uuid}`, index*200)
      ));

      return details.map((d) => ({
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
