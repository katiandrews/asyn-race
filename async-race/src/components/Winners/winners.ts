import { BaseComponent } from '../../shared/baseComponent';
import './winners.scss';

export class Winners extends BaseComponent {
  constructor(node: HTMLElement) {
    super(node, 'section', ['winners']);
    this.element.textContent = 'HEllo, this is winners!';
  }
}
