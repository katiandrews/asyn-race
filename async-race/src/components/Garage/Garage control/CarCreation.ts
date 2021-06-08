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

  clearInputs() {
    this.name.element.value = '';
    this.color.element.value = '#ffffff';
    this.unlockButton();
  }

  createCar(node: HTMLElement, carsList: Car[], pageName: HTMLElement,
            callback: () => void, selectCallback: () => void): void {
    this.button.element.addEventListener('click', (event) => {
      event.preventDefault();
      const body = this.getProperties();
      api.createCar(body).then((result) => {
        const newCar = new Car(node, result.name, result.color, result.id, callback);
        carsList.push(newCar);
        selectCallback();
        api.getCars().then((result) => {
          pageName.textContent = `Garage (${result.length})`;
        })
        this.clearInputs();
      });
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
