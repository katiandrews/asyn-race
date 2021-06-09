import { CarModel } from "./car-model";

export interface CarsPage {
  items: Promise<CarModel[]>;
  count: number;
}
