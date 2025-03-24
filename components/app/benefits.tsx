import React from 'react';

export const Benefits = () => {
  return (
    <div className="w-full max-w-4xl mt-6 text-center">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Why use our AI Claims Assistant?</h2>
      
      <div className="space-y-4 inline-block text-left">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Improve NPS by consistent experience</h3>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Reduced TAT for claim settlement</h3>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Zero wait time</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
