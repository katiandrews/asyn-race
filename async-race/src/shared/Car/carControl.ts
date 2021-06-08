import { api } from '../api';
import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';

export class CarControl extends BaseComponent {
  private select = new Button(this.element, ['button', 'button_blue'], 'Select', false);

  private remove = new Button(this.element, ['button', 'button_blue'], 'Remove', false);

  constructor(node: HTMLElement, id: number, callback: () => void) {
    super(node, 'div', ['car-control-buttons']);
    this.deleteCar(id, node, callback);
  }

  deleteCar(id: number, element: HTMLElement, callback: () => void): void {
    this.remove.element.addEventListener('click', () => {
      api.deleteCar(id);
      element.remove();
      callback();
    });
  }

  selectCar(callback: () => void): void {
    this.select.element.addEventListener('click', (event) => {
      event.preventDefault();
      callback();
    });
  }
}
