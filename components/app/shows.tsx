import React, { useEffect } from "react";
import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { shows } from "@/data/shows";
import { vapi } from "@/lib/vapi.sdk";

interface HospitalsComponentProps {
  showList: Array<(typeof shows)[number]>;
}

function ShowsComponent({ showList = [] }: HospitalsComponentProps) {
  return (
    <div className="flex gap-8 py-4">
      {showList.map((show) => (
        <div key={show.title}>
          <img
            className="h-auto my-4 w-full rounded-lg object-cover transition-all hover:scale-105 aspect-[3/4]"
            src={show.img}
            alt={show.title}
          />
          <h2 className="text-xl font-bold">{show.title}</h2>
          <p className="text-gray-500 font-bold">Location: {show.theatre}</p>
          {/* <p className="text-gray-500">{show.date.toLocaleString()}</p> */}
          <p className="text-gray-500">Cashless Coverage: ₹{show.price}</p>
        </div>
      ))}
    </div>
  );
}

export { ShowsComponent };
