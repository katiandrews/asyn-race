import { generateRandomCar } from '../../shared/additionalFunctions/generateRandomCar';
import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { Car } from '../../shared/Car/Car';
import { PAGE_LENGTH } from '../../shared/constants';
import { CarModel } from '../../shared/models/car-model';
import { CarProperties } from '../../shared/models/car-properties';
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

  private page = 1;

  constructor(node: HTMLElement) {
    super(node, 'section', ['garage']);
    this.pageNumber.element.textContent = `Page #${this.page}`;
    this.renderGarage();
    this.addCreateCarListener();
    this.prevPage.element.addEventListener('click', () => this.changePage(this.prevPage));
    this.nextPage.element.addEventListener('click', () => this.changePage(this.nextPage));
    this.element.addEventListener('click', () => this.togglePaginationButtons());
    this.garageControl.controlButtons.generateCars.element.addEventListener('click', (event) => {
      event.preventDefault();
      this.addCars(100, () => generateRandomCar());
    });
  }

  async renderGarage(): Promise<void> {
    this.renderCars();
    this.changePageName();
    this.togglePaginationButtons();
  }

   renderCars() {
    api.getCars(this.page).then(async (cars) => {
      const items = await cars.items;
      if (this.carsArray.length < PAGE_LENGTH) {
        for (let i = this.carsArray.length; i < items.length; i++) {
          const newCarOnPage = new Car(this.carsList.element, items[i].name, items[i].color, items[i].id,
            () => { this.changePageName(); this.updatePage(); });
          this.carsArray.push(newCarOnPage);
        }
      } else {
        this.replaceCars(this.page);
        this.addMissingCars(this.page);
      }
      this.addSelectListener();
    });
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

  updatePage(): void {
    api.getCars(this.page).then(async (response) => {
      const pageItems = await response.items;
      if (pageItems.length === 0 && this.page > 1) {
        this.changePage(this.prevPage);
      } else if (pageItems.length > 0 && pageItems.length < PAGE_LENGTH && this.page === 1) {
        this.updateCarsArray();
      } else if (pageItems.length === PAGE_LENGTH) {
        this.renderLastElement(pageItems);
      }
    });
  }

  renderLastElement(pageItems: CarModel[]): void {
    const lastElement = pageItems[6];
    const car = new Car(
      this.carsList.element,
      lastElement.name, lastElement.color,
      lastElement.id,
      () => { this.changePageName(); this.updatePage(); },
    );
    this.carsArray.push(car);
    this.updateCarsArray();
  }

  updateCarsArray(): void {
    api.getCars(this.page).then(async (respone) => {
      const items = await respone.items;
      this.carsArray.forEach((car) => {
        let check = false;
        items.forEach((item) => {
          if (car.id === item.id) {
            check = true;
          }
        });
        if (check === false) {
          this.carsArray.splice(this.carsArray.indexOf(car), 1);
        }
      });
    });
  }

  addCreateCarListener(): void {
    this.garageControl.createCar.button.element.addEventListener('click', (event) => {
      event.preventDefault();
      this.addCars(1, () => this.garageControl.createCar.getProperties());
    });
  }

  changePageName(): void {
    api.getCars(this.page).then((result) => {
      this.pageName.element.textContent = `Garage (${result.count})`;
    });
  }

  changePageNumber(num: number): void {
    this.pageNumber.element.textContent = `Page #${num}`;
  }

  changePage(direction: Button): void {
    if (direction === this.prevPage) {
      this.changePageNumber(--this.page);
      this.addMissingCars(this.page);
    } else if (direction === this.nextPage) {
      this.changePageNumber(++this.page);
      this.removeExtraCars(this.page);
    }
    this.replaceCars(this.page);
  }

  removeExtraCars(page: number): void {
    api.getCars(page).then(async (respone) => {
      const items = await respone.items;
      if (items.length < PAGE_LENGTH) {
        for (let i = items.length; i < PAGE_LENGTH; i++) {
          this.carsArray[i].element.remove();
        }
      }
    });
  }

  addMissingCars(page: number): void {
    let thisPage = page;
    api.getCars(++thisPage).then(async (respone) => {
      const items = await respone.items;
      if (items.length < PAGE_LENGTH) {
        for (let i = 0; i < PAGE_LENGTH; i++) {
          this.carsList.element.appendChild(this.carsArray[i].element);
        }
      }
    });
  }

  replaceCars(page: number): void {
    api.getCars(page).then(async (response) => {
      const items = await response.items;
      for (let i = 0; i < items.length; i++) {
        this.carsArray[i].id = items[i].id;
        const carImage = this.carsArray[i].element.querySelector('svg');
        if (carImage) carImage.style.fill = items[i].color;
        this.carsArray[i].name.element.textContent = items[i].name;
      }
    });
  }

  togglePaginationButtons(): void {
    if (this.page === 1) this.prevPage.element.disabled = true;
    if (this.page > 1) this.prevPage.element.disabled = false;
    api.getCars(this.page + 1).then(async (response) => {
      const items = await response.items;
      if (items.length === 0) this.nextPage.element.disabled = true;
      if (items.length > 0) this.nextPage.element.disabled = false;
    });
  }

  addCars(quantity: number, getBody: () => CarProperties): void {
    for (let i = 0; i < quantity; i++) {
      api.createCar(getBody());
    }
    this.renderCars();
    this.togglePaginationButtons();
    this.changePageName();
    this.garageControl.createCar.clearInputs();
  }
}
