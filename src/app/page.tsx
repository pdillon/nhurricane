import React from 'react';
import { CanvasContainer } from '@/components/CanvasContainer';
import { parseNHCContent } from '@/components/parseNHCContent';

const Home = async () => {
  const response = await parseNHCContent();

  return (
    <div className={`flex items-top justify-center h-screen`}>
      <div className={`text-center mt-6`}>
        <h1 className="text-2xl font-light mb-2">𝑛*hurricane</h1>
        <div>
          A remixed view of the Atlantic tropical outlooks from
          <a className="ml-1" href="https://www.nhc.noaa.gov">
            www.nhc.noaa.gov
          </a>
          .
        </div>

        <CanvasContainer
          descriptions={response.descriptions}
          areas={response.areas}
          imgSrc="https://www.nhc.noaa.gov/xgtwo/two_atl_7d0.png"
        />
      </div>
    </div>
  );
};

export default Home;
