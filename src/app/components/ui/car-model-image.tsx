import { CarModelWithRelations } from "@/app/lib/definition";

export default async function CarModelImage({ carYearModel }: { carYearModel: CarModelWithRelations }) {
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_CAR_IMAGES_API_KEY!,
    make: carYearModel.brandModel.brand.name,
    model: carYearModel.brandModel.name,
    year: String(carYearModel.year),
    width: '800',
    format: 'webp'
  })

  try {
    const res = await fetch(`https://carimagesapi.com/api/v1/signed-url?${params}`)
    const data = await res.json()
    return (
      <div className="mb-6 max-w-[800px] aspect-[8/5] mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className=' mx-auto bg-gray-100 rounded-xl'
          src={data.url}
          alt={`${carYearModel.brandModel.brand.name} ${carYearModel.brandModel.name}`}
        />
      </div>
    )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return (
      <div className="mb-6 w-full max-w-[800px] aspect-[8/5] mx-auto bg-gray-100 rounded-md flex items-center justify-center">
        <p className="text-gray-400">Image unavailable</p>
      </div>
    )
  }

}