import React from 'react';
import { CanvasContainer } from '@/components/CanvasContainer';
import { parseNHCContent } from '@/components/parseNHCContent';
import { parseATIndex } from '@/components/parseATIndex';

const Home = async () => {
  const response = await parseNHCContent();
  const { trackImgs } = await parseATIndex();

  return (
    <>
      <div className={`flex flex-col items-top justify-top h-[85vh]`}>
        <div className={`text-center mt-4 grow`}>
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
            trackImgs={trackImgs}
            imgSrc="https://www.nhc.noaa.gov/xgtwo/two_atl_7d0.png"
          />
        </div>
        <div className="text-center text-xs mt-4 font-xs pb-6 flex-col justify-end">
          Copyright © {new Date().getFullYear()} n*hurricane
        </div>
      </div>
    </>
  );
};

export default Home;
