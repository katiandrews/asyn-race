import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { Car } from '../../shared/Car/Car';
import { GarageControl } from './Garage control/garageControl';
import './garage.scss';

export class Garage extends BaseComponent {
  private garageControl: GarageControl = new GarageControl(this.element);

  private pageName = new BaseComponent(this.element, 'h1', ['page-title']);

  private pageNumber = new BaseComponent(this.element, 'h2', ['page-number']);

  private carsList = new BaseComponent(this.element, 'ul', ['cars-list']);

  private carsArray: Car[] = [];

  private paginationContainer = new BaseComponent(this.element, 'div', ['pagination-buttons']);

  private prevPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Prev', true);

  private nextPage = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Next', false);

  private page: number = 1;

  constructor(node: HTMLElement) {
    super(node, 'section', ['garage']);
    this.pageNumber.element.textContent = `Page #${this.page}`;
    this.renderGarage();
    this.garageControl.addCar(this.carsList.element, this.carsArray, this.pageName.element,
                              () => { this.changePageName(); this.renderLastElement(); },
                              () => { this.addSelectListener(); });
    this.changePage(this.prevPage);
    this.changePage(this.nextPage);
  }

  async renderGarage(): Promise<void> {
    this.renderCars();
    this.addSelectListener();
    this.changePageName();
    this.lockPaginationButton();
  }

  renderCars(): void {
    api.getCars(this.page).then(async (response) => {
      const items = await response.items;
      if (this.carsArray.length === 0) {
        items.forEach((element) => {
        const car = new Car(
        this.carsList.element,
        element.name, element.color,
        element.id,
        () => { this.changePageName();  this.renderLastElement(); },);
        this.carsArray.push(car);
        });
      }
    })
  }

  renderLastElement(): void {
    api.getCars(this.page).then(async (response) => {
      const items = await response.items;
      if (items.length >= 7) {
        const lastElement = items[6];
        const car = new Car(
        this.carsList.element,
        lastElement.name, lastElement.color,
        lastElement.id,
        () => { this.changePageName(); this.renderLastElement(); },);
        this.carsArray.push(car);
      }
    })
    this.updateCarsArray();
  }

  updateCarsArray(): void {
    api.getCars(this.page).then(async (respone) => {
      const items = await respone.items;
      this.carsArray.forEach((car) => {
        let check = false;
        items.forEach((item) => {
          if(car.id === item.id) {
            check = true;
          }
        })
        if (check === false) {
          this.carsArray.splice(this.carsArray.indexOf(car), 1);
        }
      })
    })
  }

  addSelectListener(): void {
    this.carsArray.forEach((element) => {
      element.onSelect(() => {
        this.carsArray.forEach((el) => { el.selected = false; });
        element.selected = true;
        this.updateSelectedCar(element);
      });
    });
  }

  updateSelectedCar(element: Car):void {
    api.getCar(element.id).then((result) => {
      this.garageControl.insertSelectedCarInfo(result.name, result.color);
      const carImage = element.element.querySelector('svg');
      if (carImage) {
        this.garageControl.updateCar.addUpdateListener(
          element.selected,
          result.id,
          carImage,
          element.name.element,
        );
      }
    });
  }

  changePageName(): void {
    api.getCars().then((result) => {
      this.pageName.element.textContent = `Garage (${result.count})`;
    });
  }

  changePageNumber(num: number) {
    this.pageNumber.element.textContent = `Page #${num}`;
  }

  changePage(direction: Button) {
    direction.element.addEventListener('click', () => {
      if (direction === this.prevPage) {
        this.unlockPaginationButton(this.nextPage);
        this.changePageNumber(--this.page);
      } else if (direction === this.nextPage) {
        this.unlockPaginationButton(this.prevPage);
        this.changePageNumber(++this.page);
      }
      this.lockPaginationButton();
      this.replaceCars(this.page);
    })
  }

  replaceCars(page: number) {
    api.getCars(page).then(async (response) => {
      const items = await response.items;
      for (let i = 0; i < items.length; i++) {
        const carImage = this.carsArray[i].element.querySelector('svg');
        if (carImage) carImage.style.fill = items[i].color;
        this.carsArray[i].name.element.textContent = items[i].name;
      }
      })
  }

  unlockPaginationButton(button: Button) {
    if (button.element.disabled) button.element.disabled = false;
  }

  lockPaginationButton() {
    if (this.page === 1) this.prevPage.element.disabled = true;
    api.getCars(this.page + 1).then(async (response) => {
        const items = await response.items;
        if (items.length === 0) this.nextPage.element.disabled = true;
    })
  }
}
