'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from "react"
import { searchAll } from "@/app/lib/data"
import Link from "next/link"

type SearchResults = Awaited<ReturnType<typeof searchAll>>

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResults | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (value.length < 2) {
      setResults(null)
      setIsOpen(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const data = await searchAll(value)
      setResults(data)
      setIsOpen(true)
      setLoading(false)
    }, 300)
  }

  const hasResults = results && (
    results.brands.length > 0 ||
    results.carModels.length > 0 ||
    results.complaints.length > 0
  )

  return (
    <div ref={containerRef} 
    className="relative mx-auto p-6 pb-12 border border-gray-200 max-w-[1300px] mb-12 bg-[linear-gradient(261.74deg,_#0b193f_-7.56%,_#1e47a2_106.91%)] rounded-2xl">
       <div className='mb-8'>
         <h1 className='text-white text-xl'>Find out what people say about your car!</h1>
         <p className='text-gray-50 text-sm'>Thousands of reviews for various car models</p>
       </div>
      <div className="relative flex flex-1 flex-shrink-0 mx-auto mt-2 justify-center">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="w-full bg-white peer block rounded-md py-[9px] pl-10 text-sm placeholder:text-gray-500 rounded-lg"
          type='text'
          value={query}
          placeholder="Search brands, models, complaints..."
          onChange={handleChange}
        />
        {loading && (
        <div className="absolute left-6 top-3 text-gray-400 text-sm">Searching...</div>
      )}
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

        {isOpen && (
        <div className="w-full top-full absolute z-50 mt-1 peer block mx-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          
          {!hasResults && (
            <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
          )}

          { (results?.brands && results?.brands.length > 0) && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Brands</div>
              {results?.brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brand/${brand.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          )}
          {(results?.carModels && results?.carModels.length > 0) && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Models</div>
              {results?.carModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/brand/${model.brandModel.brand.slug}/${model.brandModel.slug}/${model.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {model.brandModel.brand.name} {model.name} {model.year}
                </Link>
              ))}
            </div>
          )}

          {(results?.complaints && results?.complaints.length > 0) && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Complaints</div>
              {results?.complaints.map((complaint) => (
                <Link
                  key={complaint.id}
                  href={`/brand/${complaint.carModel.brandModel.brand.slug}/${complaint.carModel.brandModel.slug}/${complaint.carModel.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {complaint.title}
                </Link>
              ))}
            </div>
          )}

        </div>
      )}
      </div>

      

     
    </div>
  )
}
