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
    this.name.element.addEventListener('input', () => { this.toggleButtonLock(); });
  }

  getProperties(): CarProperties {
    return {
      name: this.name.element.value,
      color: this.color.element.value,
    };
  }

  clearInputs(): void {
    this.name.element.value = '';
    this.color.element.value = '#ffffff';
    this.toggleButtonLock();
  }

  createCar(node: HTMLElement, carsArray: Car[], pageName: HTMLElement,
    callback: () => void, selectCallback: () => void): void {
    this.button.element.addEventListener('click', (event) => {
      event.preventDefault();
      const body = this.getProperties();
      api.getCars().then(async (res) => {
        const items = await res.items;
        api.createCar(body).then((result) => {
          pageName.textContent = `Garage (${res.count + 1})`;
          if (items.length < 7) { // check if there are less items on page than page length
            const newCar = new Car(node, result.name, result.color, result.id, callback);
            if (res.count < 7) carsArray.push(newCar); // check if there are less items overall than page length
          }
          selectCallback();
        });
        this.clearInputs();
      });
    });
  }

  toggleButtonLock(): void {
    if (this.name.element.value === '') {
      this.button.element.disabled = true;
    } else {
      this.button.element.disabled = false;
    }
  }
}
