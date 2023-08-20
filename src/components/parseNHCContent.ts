import { parse } from 'node-html-parser';

export async function parseNHCContent() {
  const res = await fetch(
    'https://www.nhc.noaa.gov/gtwo.php?basin=atlc&fdays=7',
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const html = await res.text();
  const root = parse(html);

  const areas = root
    .querySelector('map')
    ?.querySelectorAll('area')
    .map((a) => {
      return {
        shape: a.getAttribute('shape'),
        coords: a.getAttribute('coords'),
      };
    });
  console.log(JSON.stringify(areas, null, 2));
  return areas;
}
