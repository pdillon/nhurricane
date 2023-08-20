import type { Area } from './Area';

export interface ContentResponse {
  descriptions: { id: number; content: string[] }[];
  areas: Area[];
}
