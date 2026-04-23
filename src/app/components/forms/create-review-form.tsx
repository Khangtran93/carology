'use client'
import { createComplaint } from "@/app/lib/action";
import { getBrandModels, getCarModels } from "@/app/lib/data";
import { CarModelWithRelations, ComplaintState } from "@/app/lib/definition";
import { Brand, BrandModel, CarModel } from "@/generated/prisma";
import {  useActionState, useState } from "react";

export default function CreateComplaintForm(
  { userId, brands, brandModels, carModels, carModel }: 
  { userId?: string | undefined, brands: Brand[], brandModels: BrandModel[], carModels: CarModel[], carModel: CarModelWithRelations | null}) {
    const [currentBrandModels, setCurrentBrandModels] = useState<BrandModel[]>(brandModels)
    const [currentCarModels, setCurrentCarModels] = useState<CarModel[]>(carModels)
    const [currentCarModel, setCurrentCarModel] = useState<string | undefined>(carModel?.id)
    const [isPending, setIsPending] = useState(false)

    const handleBrandChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      // when a new brand is selected, fetch new brand models and populate
      setIsPending(true)
      const newBrandModels = await getBrandModels(e.target.value) 
      const newCarModels = await getCarModels(newBrandModels[0].id)
      setCurrentBrandModels(newBrandModels)
      setCurrentCarModels(newCarModels)
      setCurrentCarModel(newCarModels[0].id)
      setIsPending(false)
    }

    const handleBrandModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCarModels = await getCarModels(e.target.value)
      setCurrentCarModels(newCarModels)
      setCurrentCarModel(newCarModels[0].id)
    }
    const handleCarModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentCarModel(e.target.value)
    }
    
    const initialState: ComplaintState = {message: null, errors: {}}
    const [state, formAction] = useActionState(createComplaint, initialState)
  return (
     <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className="mb-2 block text-sm font-medium">
            Choose Brand:
          </label>
          <div className="relative">
            <select
              id="brand"
              name="brandId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={carModel?.brandModel.brand.id}
              onChange={handleBrandChange}
            >
              <option value="" disabled>
                Select a Brand
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            
          </div>

          <label htmlFor="brandModel" className="mb-2 block text-sm font-medium">
            Choose Brand Model:
          </label>
          <div className="relative">
            <select
              id="brandModel"
              name="brandModelId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={carModel?.brandModel.id}
              onChange={handleBrandModelChange}
              disabled={currentBrandModels.length === 0 || isPending} //disabled if brandModels is empty
            >
              
              <option value="" disabled>
                Select a Brand Model
              </option>
              {isPending ? (
                    <option >Loading...</option>
                  ) : (
                    currentBrandModels?.map((brandModel) => (
                      <option key={brandModel.id} value={brandModel.id}>
                        {brandModel.name}
                      </option>
                    ))
                  )}
            </select>

          </div>

          <label htmlFor="carModel" className="mb-2 block text-sm font-medium">
            Choose Car Model Year:
          </label>
          <div className="relative">
            <select
              id="carModel"
              name="carModelId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={currentCarModel}
              onChange={handleCarModelChange}
            >
              <option value="" disabled>
                Select a Car Model Year
              </option>
              {currentCarModels.map((currentCarModel) => (
                <option key={currentCarModel.id} value={currentCarModel.id}>
                  {currentCarModel.year}
                </option>
              ))}
            </select>
            
          </div>

        </div>

          <div className="mb-4">

          <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title:
            </label>
            <input
              id="title"
              name="title"
              placeholder="Title for your complaint..."
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500 resize-none"
            />
            <label htmlFor="complaint" className="mb-2 block text-sm font-medium">
              Complaint:
            </label>
            <textarea
              id="complaint"
              name="complaint"
              rows={5}
              placeholder="Describe your complaint in detail..."
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500 resize-none"
            />
          </div>

          <input type="hidden" name="userId" value={userId ?? ''} />

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="submit"
              className="flex h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Submit Complaint
            </button>
          </div>
          {state && <div>{state.errors?.carModelId}</div>}
        </div>
  </form>
)}
