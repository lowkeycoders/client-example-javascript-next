import { shows } from "@/data/shows";
import { vapi } from "../../lib/vapi.sdk";
import { MessageTypeEnum } from "../../lib/types/conversation.type";

interface ClaimDetailsProps {
  type: "confirm" | "ticket";
  show: (typeof shows)[0];
  params: any;
}

function Ticket({
  type = "confirm",
  show = shows[0],
  params = {},
}: ClaimDetailsProps) {
  const confirmDetails = () => {
    vapi.send({
      type: MessageTypeEnum.ADD_MESSAGE,
      message: {
        role: "user",
        content: `The pre-authorization details look good. Please proceed with the request.`,
      },
    });
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/60 to-transparent h-24 z-10"></div>
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {type === "ticket" ? "Escalated Claim" : "Pre-Authorization"}
          </span>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <img
                className="w-full h-64 object-cover rounded-xl"
                src={show.img}
                alt="Hospital Image"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white text-xl font-bold">{show.title}</h2>
                <p className="text-white/80 text-sm">{show.theatre}</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white p-6 rounded-xl">
              {type === "ticket" ? (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r-md">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="font-medium">Your claim has been escalated successfully.</p>
                  </div>
                </div>
              ) : null}
              
              <p className="text-gray-600 mb-6">{show.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">PLANNED DATE</h3>
                    <p className="text-base font-semibold text-gray-900">
                      {new Date(params.plannedDate ?? show.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">HOSPITAL</h3>
                    <p className="text-base font-semibold text-gray-900">{show.theatre}</p>
                    <p className="text-sm text-gray-500">{show.venue}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">ESTIMATED COST</h3>
                    <div className="flex items-baseline">
                      <p className="text-base font-semibold text-gray-900">₹{params.estimatedCost ?? show.price}</p>
                      <span className="ml-2 text-sm text-gray-500">- {params.treatmentType ?? 'Treatment'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {type == "confirm" ? (
                <div className="mt-8">
                  <button
                    onClick={confirmDetails}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                    type="button"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Confirm Pre-Authorization
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Ticket };
