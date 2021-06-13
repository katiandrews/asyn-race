import { api } from '../api';
import { BaseComponent } from '../baseComponent';
import './Car.scss';
import { CarControl } from './carControl';
import { EngineControl } from './engineControl';
import carImage from '../../assets/Car.svg';
let carAnimation: number;

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
    this.engineControl.start.element.addEventListener('click', () => this.drive());
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

  drive() {
    this.engineControl.toggleStart();
    this.engineControl.toggleStop();
    api.startEngine(this.id).then(async (respone) => {
      const time = respone.distance / respone.velocity;
      const start = Date.now();
      carAnimation = requestAnimationFrame(() => {this.animate(time, start)});
      api.driveCar(this.id).then(async(respone) => {
        if (!respone.success) cancelAnimationFrame(carAnimation);
      })
    })
  }

  animate(duration: number, start: number) {
  let timeFraction = (Date.now() - start) / duration;
  if (timeFraction > 1) timeFraction = 1;

  this.car.element.style.left = `calc(${timeFraction * 73}% + 50px)`;

  if (timeFraction < 1) {
    carAnimation = requestAnimationFrame(() => this.animate(duration, start));
  }
  }
}
