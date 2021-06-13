import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import './winners.scss';

export class Winners extends BaseComponent {
  private pageName = new BaseComponent(this.element, 'h1', ['page-title']);

  private pageNumber = new BaseComponent(this.element, 'h2', ['page-number']);

  private page = 1;

  private paginationContainer = new BaseComponent(this.element, 'div', ['pagination-buttons']);

  private prevPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Prev', true);

  private nextPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Next', true);

  constructor(node: HTMLElement) {
    super(node, 'section', ['winners']);
    this.pageNumber.element.textContent = `Page #${this.page}`;
    this.changePageName()

  }

  changePageName(): void {
    api.getWinners(this.page, 10, 'id', 'ASC').then((result) => {
      this.pageName.element.textContent = `Winners (${result.count})`;
    });
  }
}
