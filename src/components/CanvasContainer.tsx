'use client';

import dynamic from 'next/dynamic';
import type { ContentResponse } from '@/types';
import React from 'react';

const CanvasMap = dynamic(() => import('../components/CanvasMap'), {
  ssr: false,
});

export const CanvasContainer = ({
  imgSrc,
  areas,
  descriptions,
}: {
  imgSrc: string;
  areas: ContentResponse['areas'];
  descriptions: ContentResponse['descriptions'];
}) => {
  const [content, setContent] = React.useState<string[]>([]);
  return (
    <div className="flex flex-col">
      <CanvasMap
        onCanvasClick={({ id }) => {
          setContent(descriptions.find((d) => d.id === id)?.content || []);
        }}
        areas={areas}
        imgSrc={imgSrc}
      />

      <div className="text-center mt-4 pb-4 mx-2">
        <h2 className="mb-2 font-bold">{content[0]}</h2>
        <div className="text-left text-sm whitespace-pre-line">
          {content[1]}
        </div>
      </div>
    </div>
  );
};
