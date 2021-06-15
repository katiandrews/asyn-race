import { BaseComponent } from '../../shared/baseComponent';
import { TableRow } from './table-cell';
import carImage from '../../assets/car.svg';

export class WinnersTable extends BaseComponent<HTMLTableElement> {
  private tableHeader = new TableRow(this.element, 'tr', ['winners-table_header']);

  constructor(node: HTMLElement) {
    super(node, 'table', ['winners-table']);
    this.tableHeader.tdNumber.element.textContent = 'Number';
    this.tableHeader.tdCar.element.textContent = 'Car';
    this.tableHeader.tdName.element.textContent = 'Name';
    this.tableHeader.tdWins.element.textContent = 'Wins';
    this.tableHeader.tdBestTime.element.textContent = 'Best time';
  }

  addTableRow(number: number, color: string, name: string, wins: number, bestTime: number): void {
    const tableRow = new TableRow(this.element);
    tableRow.tdNumber.element.textContent = `${number}`;
    tableRow.tdCar.element.innerHTML = carImage;
    const car = tableRow.tdCar.element.querySelector('svg');
    if (car) {
      car.style.width = '30';
      car.style.color = `${color}`;
    }
    tableRow.tdName.element.textContent = `${name}`;
    tableRow.tdWins.element.textContent = `${wins}`;
    tableRow.tdBestTime.element.textContent = `${bestTime}`;
  }
}
