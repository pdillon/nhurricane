'use client';

import dynamic from 'next/dynamic';
// @ts-ignore
const CanvasMap = dynamic(() => import('../components/CanvasMap'), {
  ssr: false,
});

export const CanvasContainer = ({
  imgSrc,
  areas,
}: {
  imgSrc: string;
  areas: { type: string; coords: string }[];
}) => {
  return <CanvasMap areas={areas} imgSrc={imgSrc} />;
};
