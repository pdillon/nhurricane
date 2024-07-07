import { parse } from 'node-html-parser';

import type { ContentResponse } from '@/types/ContentResponse';

export async function parseNHCContent(cacheTS: number) {
  const res = await fetch(
    `https://www.nhc.noaa.gov/gtwo.php?basin=atlc&fdays=7&tid=${cacheTS}`,
    { method: 'GET', cache: 'no-store' },
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const html = await res.text();
  const root = parse(html);
  const areaEls = root.querySelector('map')?.querySelectorAll('area');

  const descriptionEl = Array.from(root.querySelectorAll('script')).find((el) =>
    el.innerHTML.includes('Text'),
  );

  let descriptions = [];

  if (descriptionEl) {
    descriptions = descriptionEl.innerHTML
      .match(/Text\[[0-9]\]=(.*)\]/g)
      ?.map((s) =>
        s.replace(/Text\[([0-9])\]=/, (_, v) => `{"id":${v},"content":`),
      )
      .map((s) => `${s}}`)
      .map((s) => s.replace(/'/g, '"'))
      .map((s) => s.replace(/<(\/)?b>/g, ''))
      .map((s) => s.replace(/ <br>/g, ' '))
      .map((s) => s.replace(/<br>/g, '\\n'))
      .map((s) => s.replace('...', '...\\n'))
      .map((s) => s.replaceAll('* ', '\\n'))
      .map((s) => s.replaceAll(' percent', '%'))
      .map((s) => s.replaceAll(' (click for details)', ''))
      .map((s) => {
        return JSON.parse(s);
      }) as any[];
  }

  const areas = areaEls?.map((a) => {
    return {
      id: a.getAttribute('onmouseover')?.match(/[0-9]/)?.[0],
      shape: a.getAttribute('shape'),
      coords: a
        .getAttribute('coords')
        ?.split(',')
        .map((v) => {
          return Number(v.replace(/[^0-9]/g, ''));
        }),
    };
  }) as ContentResponse['areas'];

  return { descriptions, areas } as ContentResponse;
}
