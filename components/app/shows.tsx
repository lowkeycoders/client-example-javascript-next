import React, { useEffect } from "react";
import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { shows } from "@/data/shows";
import { vapi } from "@/lib/vapi.sdk";

interface HospitalsComponentProps {
  showList: Array<(typeof shows)[number]>;
}

function ShowsComponent({ showList = [] }: HospitalsComponentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {showList.map((show) => (
        <div key={show.title} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative">
            <img
              className="h-48 w-full object-cover transition-all hover:scale-105 duration-500"
              src={show.img}
              alt={show.title}
            />
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded-md text-xs font-semibold">
              Network Hospital
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{show.title}</h2>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-600">{show.theatre}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">Coverage: <span className="font-bold text-blue-600">₹{show.price}</span></p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Cashless</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ShowsComponent };
