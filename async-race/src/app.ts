import { Garage } from './components/Garage/garage';
import { Winners } from './components/Winners/winners';
import { BaseComponent } from './shared/baseComponent';
import { Header } from './shared/header/header';

export class App {
  private header: Header = new Header(this.rootElement);

  private main: BaseComponent = new BaseComponent(this.rootElement, 'main', ['main']);

  private garage: Garage | null = null;

  private winners: Winners | null = null;

  constructor(readonly rootElement: HTMLElement) {
  }

  clear(): void {
    this.main.element.innerHTML = '';
  }

  toGarage(): void {
    this.garage = new Garage(this.main.element);
  }

  toWinners(): void {
    this.winners = new Winners(this.main.element);
  }
}
