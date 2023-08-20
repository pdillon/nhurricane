'use client';

import React from 'react';
import { MapManager } from './MapManager';

const CanvasMap = ({ imgSrc }: { imgSrc: string }) => {
  //   const containerRef = React.useRef<HTMLDivElement>(null);
  const mapManager = React.useRef<MapManager>();

  React.useEffect(() => {
    console.log('test');
    mapManager.current = new MapManager({
      containerEl: 'container',
      imgUrl: 'https://www.nhc.noaa.gov/xgtwo/two_atl_7d0.png',
    });
  }, []);

  return <div id="container"></div>;
};

export default CanvasMap;
