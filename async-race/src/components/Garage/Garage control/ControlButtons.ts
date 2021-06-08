import { BaseComponent } from '../../../shared/baseComponent';
import { Button } from '../../../shared/button/button';

export class ControlButtons extends BaseComponent {
  private race: Button = new Button(this.element, ['button', 'button_green'], 'Race', false);

  private reset: Button = new Button(this.element, ['button', 'button_green'], 'Reset', false);

  private generateCars: Button = new Button(this.element, ['button', 'button_blue'], 'Generate Cars', false);

  constructor(node: HTMLElement) {
    super(node, 'div', ['control-buttons']);
  }
}
