'use client';

import React from 'react';
import { MapManager } from './MapManager';
import type { ContentResponse } from '@/types';

const CanvasMap = ({
  imgSrc,
  areas,
  onCanvasClick,
}: {
  imgSrc: string;
  areas: ContentResponse['areas'];
  onCanvasClick: (options: { id: number }) => void;
}) => {
  const mapManager = React.useRef<MapManager>();

  React.useEffect(() => {
    mapManager.current = new MapManager({
      containerEl: 'container',
      imgUrl: imgSrc,
      areas,
    });

    mapManager.current.onAreaClick = onCanvasClick;
  }, []);

  return (
    <div id="container" className="mt-4 mx-auto overflow-scroll cursor-move" />
  );
};

export default CanvasMap;
