import { DateTime } from 'luxon';

export function getCacheTime() {
  const currentTime = DateTime.local().setZone('America/New_York');
  return Math.max(60 - (currentTime.minute + 2), 1) * 60;
}
