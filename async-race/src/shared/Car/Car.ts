import { api } from '../api';
import { BaseComponent } from '../baseComponent';
import './Car.scss';
import { CarControl } from './carControl';
import { EngineControl } from './engineControl';
import carImage from '../../assets/Car.svg';

export class Car extends BaseComponent {
  private flag = new BaseComponent(this.element, 'span', ['finish-flag']);

  public id: number;

  private car = new BaseComponent(this.element, 'span', ['car']);

  private carControls = new CarControl(this.element);

  name = new BaseComponent(this.element, 'h3', ['car-name']);

  private engineControl = new EngineControl(this.element);

  selected = false;

  constructor(node: HTMLElement, name: string, color: string, id: number,
    callback: () => void) {
    super(node, 'li', ['car-item']);
    this.car.element.innerHTML = carImage;
    this.car.element.style.fill = `${color}`;
    const carColor = this.car.element.querySelector('svg');
    if (carColor) carColor.style.fill = `${color}`;
    this.id = id;
    this.name.element.textContent = `${name}`;
    this.carControls.remove.element.addEventListener('click', () => this.delete(callback));
  }

  onSelect(callback: () => void): void {
    this.carControls.selectCar(() => {
      callback();
    });
  }

  delete(callback: () => void): void {
    api.deleteCar(this.id);
    this.element.remove();
    callback();
  }
}
