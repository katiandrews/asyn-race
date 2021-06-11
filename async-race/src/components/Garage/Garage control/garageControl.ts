import { BaseComponent } from '../../../shared/baseComponent';
import { CarCreation } from './CarCreation';
import { CarUpdate } from './CarUpdate';
import { ControlButtons } from './ControlButtons';
import './garageControl.scss';

export class GarageControl extends BaseComponent {
  createCar: CarCreation = new CarCreation(this.element);

  updateCar: CarUpdate = new CarUpdate(this.element);

  controlButtons: ControlButtons = new ControlButtons(this.element);

  constructor(node: HTMLElement) {
    super(node, 'form', ['garage-control']);
  }

  insertSelectedCarInfo(name: string, color: string): void {
    this.updateCar.insertSelectedCarInfo(name, color);
    this.updateCar.toggleButtonLock();
  }
}
