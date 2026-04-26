import { getCarouselArticles } from "@/app/lib/external-data";
import NewsCarousel from "./news-carousel";
import { Article } from "@/app/lib/definition";


export default async function NewsCarouselServer() {
  'use cache'
  const newsArticles: Article[] = await getCarouselArticles()

  return (
    <NewsCarousel newsArticles={newsArticles}/>
  )
}