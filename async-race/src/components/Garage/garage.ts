import { BaseComponent } from '../../shared/baseComponent';
import './garage.scss';

export class Garage extends BaseComponent {
  constructor(node: HTMLElement) {
    super(node, 'section', ['garage']);
    this.element.textContent = 'HEllo, this is garage!';
  }
}
