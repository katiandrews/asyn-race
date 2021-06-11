import { BaseComponent } from '../../../shared/baseComponent';
import { Button } from '../../../shared/button/button';

export class ControlButtons extends BaseComponent {
  race: Button = new Button(this.element, ['button', 'button_green'], 'Race', false);

  reset: Button = new Button(this.element, ['button', 'button_green'], 'Reset', false);

  generateCars: Button = new Button(this.element, ['button', 'button_blue'], 'Generate Cars', false);

  constructor(node: HTMLElement) {
    super(node, 'div', ['control-buttons']);
  }
}
