import type { ICategory } from "./category";
import type { IPlace } from "./place";
export interface IEvent {
  img: string;
  date: string;
  place: IPlace;
  category: ICategory;
  description: string;
  ageLimit: number;
  duration: string;
  id: string;
  isFav: string;
  title: string;
}
