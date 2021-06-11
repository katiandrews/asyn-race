import { CarProperties } from '../models/car-properties';
import { generateRandomColor } from './generateRandomColor';
import { generateRandomName } from './generateRandomName';

export function generateRandomCar(): CarProperties {
  return {
    name: generateRandomName(),
    color: generateRandomColor(),
  };
}
