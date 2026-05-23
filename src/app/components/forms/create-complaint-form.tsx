'use client'
import { CATEGORY_LABELS } from "@/app/data/category-labels";
import { createComplaint } from "@/app/lib/action";
import { getBrandModels, getCarModels } from "@/app/lib/data";
import { CarModelWithRelations, ComplaintState } from "@/app/lib/definition";
import { Brand, BrandModel, CarModel, IssueCategory } from "@/generated/prisma";
import {  useActionState, useState } from "react";

export default function CreateComplaintForm(
  { userId, brands, brandModels, carModels, carModel }: 
  { userId?: string | undefined, brands: Brand[], brandModels: BrandModel[], carModels: CarModel[], carModel: CarModelWithRelations | null}) {
    const [currentBrandModels, setCurrentBrandModels] = useState<BrandModel[]>(brandModels)
    const [currentCarModels, setCurrentCarModels] = useState<CarModel[]>(carModels)
    const [currentCarModel, setCurrentCarModel] = useState<string | undefined>(carModel?.id)
    const [isPending, setIsPending] = useState(false)
    const MAX_CHARS = 2000
    const [count, setCount] = useState(0)
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
    <div className="">
      <div className="flex flex-col w-full bg-navy p-8 md:p-12 justify-center text-center">
          <h3 className="font-bebas-neue text-xl text-red-500">REPORT AN ISSUE</h3>
          <h1 className="text-4xl font-bebas-neue text-white mb-6">Submit a complaint</h1>
          <h3 className="text-gray-400 font-dm-sans">Tell us about a problem you&apos;ve experienced with your vehicle.</h3>
      </div>
      <form className="rounded-md bg-white mt-4 border border-border p-6 m-2 md:p-12 max-w-[1000px] md:mx-auto font-dm-mono" action={formAction}>
        <div className="text-sm font-bold font-dm-mono text-gray-500 mb-2 pb-2 border-b border-border">
          YOUR VEHICLE
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 justify-between">
           {/* Brand */}
           <div className="">
            <label htmlFor="brand" className="mb-2 block text-xs font-medium">
              BRAND <span className="text-red-500">*</span>
            </label>
            <div className="relative bg-cream">
              <select
                id="brand"
                name="brandId"
                className="peer block w-full cursor-pointer rounded-md border border-border py-2 pl-4 text-sm placeholder:text-gray-500"
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
           </div>
       

          {/* Brand Model */}
          <div className="">
            <label htmlFor="brandModel" className="mb-2 block text-xs font-medium">
              MODEL <span className="text-red-500">*</span>
            </label>
            <div className="relative bg-cream">
              <select
                id="brandModel"
                name="brandModelId"
                className="peer block w-full cursor-pointer rounded-md border border-border py-2 pl-4 text-sm placeholder:text-gray-500"
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
          </div>
         
          {/* Car Year Model */}
          <div className=""> 
            <label htmlFor="carModel" className="mb-2 block text-xs font-medium">
              YEAR <span className="text-red-500">*</span>
            </label>
            <div className="relative bg-cream">
              <select
                id="carModel"
                name="carModelId"
                className="peer block w-full cursor-pointer rounded-md border border-border py-2 pl-4 text-sm placeholder:text-gray-500"
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

          <div className=""> 
            <label htmlFor="carModel" className="mb-2 block text-xs font-medium">
              ISSUE CATEGORY <span className="text-red-500">*</span>
            </label>
            <div className="relative bg-cream">
              <select
                id="category"
                name="issueCategory"
                className="peer block w-full cursor-pointer rounded-md border border-border py-2 pl-4 text-sm placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Select an Issue Category
                </option>
                {Object.values(IssueCategory).map(category => (
                <option key={category} value={category}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
              </select>
            </div>
          </div>

          <div className=""> 
            <label htmlFor="carModel" className="mb-2 block text-xs font-medium">
              SEVERITY <span className="text-red-500">*</span>
            </label>
            <div className="relative bg-cream pr-2">
              <select
                id="severity"
                name="severity"
                className="peer block w-full cursor-pointer rounded-md border border-border py-2 pl-4 text-sm placeholder:text-gray-500"
              >
                <option className="" value="" disabled>
                  Select Severity Score
                </option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          
        </div>

        <div className="mb-4">
          <div className="text-sm font-bold font-dm-mono text-gray-500 mb-2 pb-2 border-b border-border">
            THE ISSUE
          </div>
          {/* Title */}
          <div className="flex flex-col mb-2">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title:  <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              placeholder="e.g. Engine misfires at low RPM"
              className="peer block w-full rounded-md border border-border bg-cream py-2 px-3 text-sm placeholder:text-gray-400 resize-none"
            />
          </div>
         
          {/* Complaint */}
          <label htmlFor="complaint" className="mb-2 block text-sm font-medium">
            Complaint:  <span className="text-red-500">*</span>
          </label>
          <textarea
            id="complaint"
            name="complaint"
            rows={5}
            maxLength={MAX_CHARS}
            onChange={(e) => setCount(e.target.value.length)}
            placeholder="Describe what's happening — when it started, how often it happens, what you've tried, any dealer responses..."
            className="peer block w-full rounded-md border border-border bg-cream py-2 px-3 text-sm placeholder:text-gray-400 resize-none"
          />

          <div className="mt-1 text-right text-xs font-mono text-gray-500">
            {count} / {MAX_CHARS}
          </div>
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
    </form>
    </div>
     
)}
