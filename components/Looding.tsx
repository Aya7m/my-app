import React from 'react'

const Looding = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {[1,2,3,4].map((loader)=>(
            <div key={loader} className="animate-pulse flex flex-col border bg-text/90 backdrop-blur-2xl text-background p-3 cursor-pointer">
            <div className="space-y-2">
              <div className="h-60 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="mt-2">
                <div className="h-6 bg-gray-300 rounded w-3/4 mt-2 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full mt-1"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mt-1"></div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Looding