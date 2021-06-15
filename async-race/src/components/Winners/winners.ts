import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { WinnersTable } from './winners-table';
import './winners.scss';

export class Winners extends BaseComponent {
  private pageName = new BaseComponent(this.element, 'h1', ['page-title']);

  private pageNumber = new BaseComponent(this.element, 'h2', ['page-number']);

  private page = 1;

  winners = new WinnersTable(this.element);

  private paginationContainer = new BaseComponent(this.element, 'div', ['pagination-buttons']);

  private prevPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Prev', true);

  private nextPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Next', true);

  constructor(node: HTMLElement) {
    super(node, 'section', ['winners']);
    this.pageNumber.element.textContent = `Page #${this.page}`;
    this.changePageName();
    this.renderWinners();
  }

  changePageName(): void {
    api.getWinners(this.page, 10, 'id', 'ASC').then((result) => {
      this.pageName.element.textContent = `Winners (${result.count})`;
    });
  }

  renderWinners(): void {
    api.getWinners(this.page, 10, 'id', 'ASC').then(async (result) => {
      const winners = await result.items;
      winners.forEach((winner) => {
        api.getCar(winner.id).then((car) => {
          this.winners.addTableRow(winner.id, car.color, car.name, winner.wins, winner.time);
        });
      });
    });
  }
}
