import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { SortOrder } from '../../shared/models/SortOrder';
import { SortParams } from '../../shared/models/SortParams';
import { WinnersTable } from './winners-table';
import './winners.scss';

export class Winners extends BaseComponent {
  private pageName = new BaseComponent(this.element, 'h1', ['page-title']);

  private pageText = new BaseComponent(this.element, 'h2', ['page-number']);

  private pageNumber = 1;

  winners = new WinnersTable(this.element);

  private paginationContainer = new BaseComponent(this.element, 'div', ['pagination-buttons']);

  private prevPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Prev', true);

  private nextPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Next', true);

  constructor(node: HTMLElement) {
    super(node, 'section', ['winners']);
    this.pageText.element.textContent = `Page #${this.pageNumber}`;
    this.updatePageName();
    this.renderWinners();
    this.nextPage.element.addEventListener('click', () => this.changePage(this.nextPage));
    this.prevPage.element.addEventListener('click', () => this.changePage(this.prevPage));
  }

  updatePageName(): void {
    api.getWinners(this.pageNumber, 10, SortParams.id, SortOrder.fromLowest).then((result) => {
      this.pageName.element.textContent = `Winners (${result.count})`;
    });
  }

  renderWinners(): void {
    api.getWinners(this.pageNumber, 10, SortParams.id, SortOrder.fromLowest).then(async (result) => {
      const winners = result.items;
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
    this.updatePageName();
    this.updatePaginationButtons();
  }

  updatePaginationButtons(): void {
    this.prevPage.element.disabled = this.pageNumber === 1;
    api.getWinners(this.pageNumber + 1).then(async (response) => {
      const items = response.items;
      this.nextPage.element.disabled = items.length === 0;
    });
  }

  renderPageNumber(num: number): void {
    this.pageText.element.textContent = `Page #${num}`;
  }

  changePage(direction: Button): void {
    if (direction === this.prevPage) {
      this.renderPageNumber(--this.pageNumber);
      this.updatePage();
    } else if (direction === this.nextPage) {
      this.renderPageNumber(++this.pageNumber);
      this.updatePage();
    }
    this.updatePaginationButtons();
  }
}
