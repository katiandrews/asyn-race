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

  carAnimation = 0;

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
    this.engineControl.start.element.addEventListener('click', () => this.drive());
    this.engineControl.stop.element.addEventListener('click', () => this.stop());
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

  drive(): void {
    this.engineControl.toggleButton(this.engineControl.start);
    api.startEngine(this.id).then(async (respone) => {
      this.engineControl.toggleButton(this.engineControl.stop);
      const time = respone.distance / respone.velocity;
      const start = Date.now();
      this.carAnimation = requestAnimationFrame(() => { this.animate(time, start); });
      api.driveCar(this.id).then(async (result) => {
        if (!result.success) cancelAnimationFrame(this.carAnimation);
      });
    });
  }

  animate(duration: number, start: number): void {
    let timeFraction = (Date.now() - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    this.car.element.style.left = `calc(${timeFraction * 73}% + 50px)`;

    if (timeFraction < 1) {
      this.carAnimation = requestAnimationFrame(() => this.animate(duration, start));
    }
  }

  stop(): void {
    api.stopEngine(this.id).then(() => {
      this.engineControl.toggleButton(this.engineControl.start);
    });
    cancelAnimationFrame(this.carAnimation);
    this.engineControl.toggleButton(this.engineControl.stop);
    this.car.element.style.left = '50px';
  }
}
