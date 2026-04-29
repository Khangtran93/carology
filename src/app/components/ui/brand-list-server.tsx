import { getAllBrands } from "@/app/lib/data";
import BrandList from "./brand-list";

export default async function BrandListServer() {
  const brands = await getAllBrands()

  return (
    <BrandList brands={brands}/>
  )
}