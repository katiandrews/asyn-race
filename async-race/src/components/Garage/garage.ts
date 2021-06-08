import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Car } from '../../shared/Car/Car';
import { GarageControl } from './Garage control/garageControl';
import './garage.scss';

export class Garage extends BaseComponent {
  private garageControl: GarageControl = new GarageControl(this.element);

  private pageName = new BaseComponent(this.element, 'h1', ['page-title']);

  private carsList = new BaseComponent(this.element, 'ul', ['cars-list']);

  private carsArray: Car[] = [];

  constructor(node: HTMLElement) {
    super(node, 'section', ['garage']);
    this.renderGarage().then(() => {
      this.garageControl.addCar(this.carsList.element, this.carsArray.length + 1, this.carsArray,
        this.pageName.element);
      this.addSelectListener();
      this.removeCarfromGarage();
    });
  }

  async renderGarage(): Promise<void> {
    const response = await api.getCars();
    response.forEach((element) => {
      const car = new Car(this.carsList.element, element.name, element.color, element.id);
      this.carsArray.push(car);
    });
    this.changePageName();
  }

  addSelectListener(): void {
    this.carsArray.forEach((element) => {
      element.onSelect(() => {
        this.carsArray.forEach((el) => { el.selected = false; });
        element.selected = true;
        this.updateSelectedCar(element);
      });
    });
  }

  updateSelectedCar(element: Car):void {
    api.getCar(element.id).then((result) => {
      this.garageControl.insertSelectedCarInfo(result.name, result.color);
      const carImage = element.element.querySelector('svg');
      if (carImage) {
        this.garageControl.updateCar.addUpdateListener(
          element.selected,
          result.id,
          carImage,
          element.name.element,
        );
      }
    });
  }

  removeCarfromGarage(): void {
    this.carsArray.forEach((el) => {
      el.onDelete(() => {
        const removeIndex = this.carsArray.indexOf(el);
        this.carsArray.splice(removeIndex, 1);
        this.changePageName();
      });
    });
  }

  changePageName(): void {
    this.pageName.element.textContent = `Garage (${this.carsArray.length})`;
  }
}
