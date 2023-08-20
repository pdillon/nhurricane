import React from 'react';
import { CanvasContainer } from '@/components/CanvasContainer';
import { parseNHCContent } from '@/components/parseNHCContent';

const Home = async () => {
  const response = await parseNHCContent();

  return (
    <>
      <div className={`flex flex-col items-top justify-top h-screen`}>
        <div className={`text-center mt-4`}>
          <h1 className="text-2xl font-light mb-2">𝑛*hurricane</h1>
          <div className="text-sm">
            A remixed view of the Atlantic tropical outlooks from
            <a className="ml-1 underline" href="https://www.nhc.noaa.gov">
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
        <div className="text-center text-xs font-xs mt-4 pb-4 justify-self-end">
          Copyright © {new Date().getFullYear()} n*hurricane
        </div>
      </div>
    </>
  );
};

export default Home;
