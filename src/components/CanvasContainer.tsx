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
      <div className="mt-4 p-2 mx-auto max-w-full h-auto overflow-scroll cursor-move">
        <CanvasMap
          onCanvasClick={({ id }) => {
            setContent(descriptions.find((d) => d.id === id)?.content || []);
          }}
          areas={areas}
          imgSrc={imgSrc}
        />
      </div>
      <div className="text-center mx-4">
        <h2 className="mb-2 text-xl">{content[0]}</h2>
        <div className="text-left whitespace-pre">{content[1]}</div>
      </div>
    </div>
  );
};
