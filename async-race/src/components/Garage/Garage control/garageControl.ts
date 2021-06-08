import { BaseComponent } from '../../../shared/baseComponent';
import { Car } from '../../../shared/Car/Car';
import { CarCreation } from './CarCreation';
import { CarUpdate } from './CarUpdate';
import { ControlButtons } from './ControlButtons';
import './garageControl.scss';

export class GarageControl extends BaseComponent {
  public createCar: CarCreation = new CarCreation(this.element);

  public updateCar: CarUpdate = new CarUpdate(this.element);

  private controlButtons: ControlButtons = new ControlButtons(this.element);

  constructor(node: HTMLElement) {
    super(node, 'form', ['garage-control']);
  }

  addCar(node: HTMLElement, id: number, carsList: Car[], pageName: HTMLElement): void {
    this.createCar.createCar(node, id, carsList, pageName);
  }

  insertSelectedCarInfo(name: string, color: string): void {
    this.updateCar.insertSelectedCarInfo(name, color);
    this.updateCar.unlockButton();
  }
}
