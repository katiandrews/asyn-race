import { ICarModel } from './models/car-model';
import { ICarProps } from './models/car-properties';
import { ICars } from './models/Cars-page-model';
import { EngineStatus } from './models/Engine-status';
import { IDriveStatus, IEngineParams } from './models/engineParam';
import { SortOrder } from './models/SortOrder';
import { SortParams } from './models/SortParams';
import { IWinnerTime, IWinner } from './models/winner-model';
import { IWinners } from './models/winnersPage-model';

class Api {
  private base = 'https://aqueous-brook-77293.herokuapp.com';

  private garage = `${this.base}/garage`;

  private engine = `${this.base}/engine`;

  private winners = `${this.base}/winners`;

  async getCars(page = 1, limit = 7): Promise<ICars> {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: Number(response.headers.get('X-Total-Count')),
    };
  }

  async getCar(id: number): Promise<ICarModel> {
    const response = await fetch(`${this.garage}/${id}`);
    return response.json();
  }

  async createCar(body: ICarProps): Promise<ICarModel> {
    const response = await fetch(this.garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async deleteCar(id: number): Promise<void> {
    const respone = await fetch(`${this.garage}/${id}`, { method: 'DELETE' });
    return respone.json();
  }

  async updateCar(id: number, body: ICarProps): Promise<ICarModel> {
    const response = await fetch(`${this.garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async startEngine(id: number): Promise<IEngineParams> {
    const respone = await (fetch(`${this.engine}?id=${id}&status=${EngineStatus.started}`));
    return respone.json();
  }

  async stopEngine(id: number): Promise<IEngineParams> {
    const response = await (fetch(`${this.engine}?id=${id}&status=${EngineStatus.stopped}`));
    return response.json();
  }

  async driveCar(id: number): Promise<IDriveStatus> {
    const response = await fetch(`${this.engine}?id=${id}&status=drive`).catch();
    return response.status !== 200 ? { success: false } : { success: true };
  }

  async getWinners(page = 1, limit = 10, sort = SortParams.id, order = SortOrder.fromLowest): Promise<IWinners> {
    const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    return {
      items: await response.json(),
      count: Number(response.headers.get('X-Total-Count')),
    };
  }

  async getWinner(id: number): Promise<IWinner> {
    const response = await fetch(`${this.winners}/${id}`);
    return response.json();
  }

  async createWinner(body: IWinner): Promise<IWinner> {
    const response = await fetch(this.winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async updateWinner(id: number, body: IWinnerTime): Promise<IWinner> {
    const response = await fetch(`${this.winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async deleteWinner(id: number): Promise<void> {
    const response = await fetch(`${this.winners}/${id}`, { method: 'DELETE' });
    return response.json();
  }
}

export const api = new Api();
