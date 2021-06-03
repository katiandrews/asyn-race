import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor(node: HTMLElement, styles: string[] = [], text: string) {
    super(node, 'button', styles);
    this.element.textContent = text;
  }

  changeHashOnclick(hash: string): void {
    this.element.addEventListener('click', () => {
      window.location.hash = hash;
    });
  }
}
