

import React from 'react';
import Image from 'next/image';

const Home = () => {
  


  return (
    <div className={`flex items-top justify-center h-screen bg-blue-500`}>
    
      <div className={`text-white text-center mt-2`}>
        <h1 className="text-4xl font-bold mb-4">nHurricane</h1>
        <div className="mt-8 mx-auto max-w-full h-auto overflow-scroll cursor-move p-4">
        <Image
         width={900}
         height={665}
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
          src="https://www.nhc.noaa.gov/xgtwo/two_atl_7d0.png"
          alt="Hurricane"
          className="max-w-full h-auto"
        />
      </div>
      </div>
    
    </div>
  );
};

export default Home;
