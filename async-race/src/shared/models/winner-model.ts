export interface WinnerModel {
  id: number;
  wins: number;
  time: number;
}

export interface UpdateWinner {
  wins: number;
  time: number;
}

export interface WinnerMessage {
  id: number;
  name: string | null;
  time: number;
}
