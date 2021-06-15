import { BaseComponent } from '../../../shared/baseComponent';
import { Button } from '../../../shared/button/button';

export class ControlButtons extends BaseComponent {
  race: Button = new Button(this.element, ['button', 'button_green'], 'Race', false);

  reset: Button = new Button(this.element, ['button', 'button_green'], 'Reset', true);

  generateCars: Button = new Button(this.element, ['button', 'button_blue'], 'Generate Cars', false);

  constructor(node: HTMLElement) {
    super(node, 'div', ['control-buttons']);
  }

  toggleButton(button: Button): void {
    if (button.element.disabled) {
      button.element.disabled = false;
    } else {
      button.element.disabled = true;
    }
  }
}
