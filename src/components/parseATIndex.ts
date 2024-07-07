import { parse } from 'node-html-parser';
import { getCacheDate } from '@/helpers/getCacheTime';
import { TrackImg } from '@/types/TrackImg';

export async function parseATIndex(cacheTS: number) {
  const res = await fetch(
    `https://www.nhc.noaa.gov/index-at.xml?&tid=${cacheTS}`,
    { method: 'GET', cache: 'no-store' },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch index');
  }

  const html = await res.text();
  const root = parse(html);

  const trackImgs: TrackImg[] = Array.from(root.querySelectorAll('item'))
    .filter((el) => el.querySelector('title')?.innerText.includes('Graphics'))
    .map((el) => {
      return {
        title: el.querySelector('title')?.innerText,
        trackImg: el
          .querySelector('description')
          ?.innerHTML.match(/https:\/\/.*\.png/g)?.[0]
          ?.replace('_sm2', ''),
      };
    });

  return { trackImgs };
}
