'use client'
import { CATEGORY_LABELS } from "@/app/data/category-labels";
import { CarModelData } from "@/app/lib/definition";
import { getInitials } from "@/app/lib/utils";
import { IssueCategory } from "@/generated/prisma";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryTab({carYearModel} : {carYearModel: CarModelData}) {
  const [activeTab, setActiveTab] = useState<string>("All Issues")
  useEffect(() => {
    console.log("activeTab ", activeTab)
  },[activeTab, setActiveTab])
  return (
    <div className='flex-3 md:mx-auto md:min-w-[1000px] md:max-w-[1200px] bg-cream px-4 md:px-24'>
      <div className={`flex px-4 gap-x-2 m-4 max-w-max border-b border-gray-200 text-gray-400 font-bebas-neue`}>
        <div onClick={() => setActiveTab('All Issues')} className={`cursor-pointer ${activeTab === "All Issues" && "border-b border-red-500 text-red-500" }`}>All Issue</div>
        {carYearModel.complaints
        .filter((c, index, arr) => arr.findIndex((x) => x.category === c.category) === index)
        .map((complaint, index) => (
          <div onClick={() => setActiveTab(complaint.category ?? "")} className={`cursor-pointer ${activeTab === complaint.category && "border-b border-red-500 text-red-500" }`} key={index}>{CATEGORY_LABELS[complaint.category as IssueCategory]}</div>
        )
        )}
      </div>
      <ul className="gap-y-2 mb-4">
      {(activeTab === "All Issues" ? carYearModel.complaints : carYearModel.complaints.filter((c) => c.category === activeTab)).map((complaint, index) => (
        <li key={index} className='flex flex-col p-4 m-2 border border-border rounded-xl bg-white'>
          <div className="flex flex-col p-2 gap-y-2">
            <div className="flex justify-between gap-x-2 items-center border-b-2 border-border pb-8">
              <div className="flex gap-x-2">
                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-navy text-white" >
                  {getInitials(complaint.user.name ?? "")}
                </div>
                <div>
                  <h2 className='text-lg md:text-xl font-bold font-dm-sans'>{complaint.user.name}</h2>
                  <h3 className="text-xs font-dm-mono">{complaint.createdAt.toDateString()}</h3>
                </div>
              </div>
                {(() => {
                const sev = complaint.severity ?? 0
                const label = sev < 3 ? "LOW" : sev < 6 ? "MEDIUM" : "HIGH"
                const colour = sev < 3 ? "bg-green-bg text-green-500"
                  : sev < 6 ? "bg-orange-bg text-orange-500"
                  : "bg-red-bg text-red-500"
                return (
                  <div className={`p-2 rounded-lg font-dm-mono text-xs ${colour}`}>
                    <span className="hidden md:inline">Severity: </span>{label}
                  </div>
                )
              })()}
              {/* <div className={` p-2 rounded-lg font-dm-mono text-xs ${complaint?.severity < 3 ? "bg-green-bg text-green-500" : (complaint?.severity > 33 && complaint?.severity < 6) ? "bg-orange-bg text-orange-500" : "bg-red-bg text-red-500" }`}>
                <span className="hidden md:inline">Severity: </span>{complaint?.severity < 3 ? "LOW" : (complaint?.severity > 3 && complaint?.severity < 6) ? "MEDIUM" : "HIGH" }
              </div> */}
            </div>
            <div className="w-px bg-gray-300 -my-4 mx-4 md:hidden mt-4" />
              <h3 className='text-sm md:text-md font-semibold font-dm-sans'>{complaint.title}</h3>
              <h4 className='text-sm md:text-md font-dm-sans text-gray-600'>{complaint.content}</h4>
              <div className="font-dm-mono bg-cream-dark text-gray-600 max-w-max p-1 text-sm rounded-lg">{CATEGORY_LABELS[complaint.category as IssueCategory] ?? ''}</div>
          </div>
          <div className="p-2 md:p-12 hidden">
            {complaint.severity}
          </div>

        </li> 
      ))}
      </ul>

      <Link href={`/${carYearModel.brandModel.brand.slug}/${carYearModel.brandModel.slug}/${carYearModel.slug}/complaint`}
          className='bg-navy text-white p-2 max-w-max rounded-lg ml-2 mb-6 inline-block hover:opacity-80 text-sm font-dm-sans'>
        Add Complaint
      </Link>
    </div>
  )
}