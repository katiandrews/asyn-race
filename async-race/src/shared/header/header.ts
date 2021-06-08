import './header.scss';
import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';

export class Header extends BaseComponent {
  private toGarage: Button = new Button(this.element, ['button', 'button_green'], 'to garage', false);

  private toWinners: Button = new Button(this.element, ['button', 'button_green'], 'to winners', false);

  constructor(node: HTMLElement) {
    super(node, 'header', ['main-header']);

    this.toGarage.changeHashOnclick('/garage');
    this.toWinners.changeHashOnclick('/winners');
  }
}
