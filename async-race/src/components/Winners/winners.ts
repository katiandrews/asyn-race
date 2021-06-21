import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { SortOrder } from '../../shared/models/SortOrder';
import { SortParams } from '../../shared/models/SortParams';
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
    this.nextPage.element.addEventListener('click', () => this.changePage(this.nextPage));
    this.prevPage.element.addEventListener('click', () => this.changePage(this.prevPage));
  }

  changePageName(): void {
    api.getWinners(this.page, 10, SortParams.id, SortOrder.fromLowest).then((result) => {
      this.pageName.element.textContent = `Winners (${result.count})`;
    });
  }

  renderWinners(): void {
    api.getWinners(this.page, 10, SortParams.id, SortOrder.fromLowest).then(async (result) => {
      const winners = await result.items;
      winners.forEach((winner) => {
        api.getCar(winner.id).then((car) => {
          this.winners.addTableRow(winner, car);
        });
      });
    });
  }

  updatePage(): void {
    this.winners.element.innerHTML = '';
    this.winners.addTableHeader();
    this.renderWinners();
    this.changePageName();
    this.togglePaginationButtons();
  }

  togglePaginationButtons(): void {
    this.prevPage.element.disabled = this.page === 1;
    api.getWinners(this.page + 1).then(async (response) => {
      const items = await response.items;
      this.nextPage.element.disabled = items.length === 0;
    });
  }

  changePageNumber(num: number): void {
    this.pageNumber.element.textContent = `Page #${num}`;
  }

  changePage(direction: Button): void {
    if (direction === this.prevPage) {
      this.changePageNumber(--this.page);
      this.updatePage();
    } else if (direction === this.nextPage) {
      this.changePageNumber(++this.page);
      this.updatePage();
    }
    this.togglePaginationButtons();
  }
}
