import { api } from '../../../shared/api';
import { BaseComponent } from '../../../shared/baseComponent';
import { Button } from '../../../shared/button/button';
import { Car } from '../../../shared/Car/Car';
import { Input } from '../../../shared/input/input';
import { CarProperties } from '../../../shared/models/car-properties';

export class CarCreation extends BaseComponent {
  name: Input = new Input(this.element, ['text-input'], 'text');

  color: Input = new Input(this.element, ['color-input'], 'color');

  button: Button = new Button(this.element, ['button', 'button_blue'], 'Create', true);

  constructor(node: HTMLElement) {
    super(node, 'div', ['create-car_inputs']);

    this.name.element.addEventListener('input', () => { this.unlockButton(); });
  }

  getProperties(): CarProperties {
    return {
      name: this.name.element.value,
      color: this.color.element.value,
    };
  }

  createCar(node: HTMLElement, id: number, carsList: Car[], pageName: HTMLElement): void {
    this.button.element.addEventListener('click', () => {
      const body = {
        name: this.name.element.value,
        color: this.color.element.value,
      };
      api.createCar(body);
      const carProperties = this.getProperties();
      const newCar = new Car(node, carProperties.name, carProperties.color, id);
      carsList.push(newCar);
      pageName.textContent = `Garage (${carsList.length})`;
    });
  }

  unlockButton(): void {
    if (this.name.element.value === '') {
      this.button.element.disabled = true;
    } else {
      this.button.element.disabled = false;
    }
  }
}
