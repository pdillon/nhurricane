import React from 'react';
import { CanvasContainer } from '@/components/CanvasContainer';
import { parseNHCContent } from '@/components/parseNHCContent';
import { parseATIndex } from '@/components/parseATIndex';
import { getCacheDate } from '@/helpers/getCacheTime';

const Home = async () => {
  const response = await parseNHCContent(getCacheDate());
  const { trackImgs } = await parseATIndex(getCacheDate());

  return (
    <>
      <div className={`flex flex-col items-top justify-top h-[85vh]`}>
        <div className={`text-center mt-4 grow`}>
          <h1 className="text-2xl font-light mb-2">𝑛*hurricane</h1>
          <div className="text-sm">
            A mobile friendly view of Atlantic tropical outlooks from
            <a className="ml-1 underline" href="https://www.nhc.noaa.gov">
              nhc.noaa.gov
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
          All text, data and images are courtesy of NOAA/NWS.
          <br />
          Please visit
          <a className="ml-1 underline" href="https://www.nhc.noaa.gov">
            nhc.noaa.gov
          </a>{' '}
          for official information.
        </div>
        <div className="text-center text-xs mt-4 font-xs pb-6 flex-col justify-end">
          Site design © {new Date().getFullYear()} n*hurricane
        </div>
      </div>
    </>
  );
};

export default Home;
