// types/bookmark.ts
import { BaseModel } from './useDatabase';

export interface Bookmark extends BaseModel {
  title: string;
  url: string;
  favicon?: string;
}