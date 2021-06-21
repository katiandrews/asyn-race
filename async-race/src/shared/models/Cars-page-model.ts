import { ICarModel } from './car-model';

export interface ICars {
  items: Promise<ICarModel[]>;
  count: number;
}
