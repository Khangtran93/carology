import { getNewsArticles } from "@/app/lib/external-data";
import NewsCarousel from "./news-carousel";
import { Article } from "@/app/lib/definition"

export default async function NewsCarouselServer() {

  const newsArticles: Article[] = await getNewsArticles()

  return (
    <NewsCarousel newsArticles={newsArticles}/>
  )
}