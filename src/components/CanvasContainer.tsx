'use client';

import dynamic from 'next/dynamic';
import type { ContentResponse } from '@/types';
import React from 'react';
import { TrackImg } from '@/types/TrackImg';

const CanvasMap = dynamic(() => import('../components/CanvasMap'), {
  ssr: false,
});

export const CanvasContainer = ({
  imgSrc,
  areas,
  descriptions,
  trackImgs,
}: {
  imgSrc: string;
  areas: ContentResponse['areas'];
  descriptions: ContentResponse['descriptions'];
  trackImgs: TrackImg[];
}) => {
  const [content, setContent] = React.useState<{
    title?: string;
    description?: string;
    trackImg?: string;
  }>({});
  return (
    <div className="flex flex-col items-center">
      <CanvasMap
        onCanvasClick={({ id }) => {
          const [title, description] =
            descriptions.find((d) => d.id === id)?.content || [];

          const trackImg = trackImgs.find(
            (ti) => ti.title?.toLowerCase().includes(title.toLowerCase()),
          )?.trackImg;
          setContent({ title, description, trackImg });
        }}
        areas={areas}
        imgSrc={imgSrc}
      />

      <div className="text-center mt-4 pb-4 mx-2 md:mx-8">
        <h2 className="mb-2 font-bold">{content.title}</h2>
        <div className="text-left text-sm whitespace-pre-line">
          {content.description ||
            'Tap a disturbance on the map to view details. Pinch zoom partially supported.'}
        </div>
        {content.trackImg && <img className="mt-3" src={content.trackImg} />}
      </div>
    </div>
  );
};
