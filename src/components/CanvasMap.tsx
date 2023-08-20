'use client';

import React from 'react';
import { MapManager } from './MapManager';

const CanvasMap = ({
  imgSrc,
  areas,
}: {
  imgSrc: string;
  areas: { type: string; coords: string }[];
}) => {
  //   const containerRef = React.useRef<HTMLDivElement>(null);
  const mapManager = React.useRef<MapManager>();

  React.useEffect(() => {
    mapManager.current = new MapManager({
      containerEl: 'container',
      imgUrl: imgSrc,
      areas,
    });
  }, []);

  return <div id="container"></div>;
};

export default CanvasMap;
