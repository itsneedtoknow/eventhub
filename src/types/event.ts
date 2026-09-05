import type { ICategory } from "./category";
import type { IPlace } from "./place";
import type { IPrice } from "./price";
export interface IEvent {
  img: string;
  date: string;
  place: IPlace;
  category: ICategory;
  description: string;
  ageLimit: number;
  duration: string;
  id: string;
  isFav: boolean;
  title: string;
  price: IPrice;
  time?: string;
}
