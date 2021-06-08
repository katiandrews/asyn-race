import { Garage } from './components/Garage/garage';
import { Winners } from './components/Winners/winners';
import { BaseComponent } from './shared/baseComponent';
import { Header } from './shared/header/header';

export class App {
  private header: Header = new Header(this.rootElement);

  private main: BaseComponent = new BaseComponent(this.rootElement, 'main', ['main']);

  private garage: Garage = new Garage(this.main.element);

  private winners: Winners = new Winners(this.main.element);

  constructor(readonly rootElement: HTMLElement) {
  }

  toGarage(): void {
    this.winners.element.remove();
    this.main.element.appendChild(this.garage.element);
  }

  toWinners(): void {
    this.garage.element.remove();
    this.main.element.appendChild(this.winners.element);
  }
}
