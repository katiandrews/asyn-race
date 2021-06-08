import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';

export class EngineControl extends BaseComponent {
  private start = new Button(this.element, ['outline-button'], 'A', false);

  private stop = new Button(this.element, ['outline-button', 'button_disabled'], 'B', true);

  constructor(node: HTMLElement) {
    super(node, 'div', ['engine-control-buttons']);
  }
}
