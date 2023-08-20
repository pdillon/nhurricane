import React from 'react';
import { CanvasContainer } from '@/components/CanvasContainer';
import { parseNHCContent } from '@/components/parseNHCContent';

const Home = async () => {
  const areas: any = await parseNHCContent();

  return (
    <div className={`flex items-top justify-center h-screen`}>
      <div className={`text-center mt-6`}>
        <h1 className="text-4xl font-light mb-4">(𝑛)hurricane</h1>
        <div className="mt-8 pb-8 mx-auto max-w-full h-auto overflow-scroll cursor-move p-2">
          <CanvasContainer
            areas={areas}
            imgSrc="https://www.nhc.noaa.gov/xgtwo/two_atl_7d0.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
