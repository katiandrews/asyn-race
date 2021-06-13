import { api } from '../api';
import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';

export class EngineControl extends BaseComponent {
  start = new Button(this.element, ['outline-button'], 'A', false);

  stop = new Button(this.element, ['outline-button', 'button_disabled'], 'B', true);

  constructor(node: HTMLElement) {
    super(node, 'div', ['engine-control-buttons']);
  }

  toggleStartButton() {
    if (this.start.element.disabled) {
      this.start.element.disabled = false;
    } else {
      this.start.element.disabled = true;
    }
    this.start.element.classList.toggle('button_disabled');
  }

  toggleStopButton() {
    if (this.stop.element.disabled) {
      this.stop.element.disabled = false;
    } else {
      this.stop.element.disabled = true;
    }
    this.stop.element.classList.toggle('button_disabled');
  }
}
