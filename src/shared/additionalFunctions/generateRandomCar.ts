import { ICarProps } from '../models/car-properties';
import { generateRandomColor } from './generateRandomColor';
import { generateRandomName } from './generateRandomName';

export function generateRandomCar(): ICarProps {
  return {
    name: generateRandomName(),
    color: generateRandomColor(),
  };
}
