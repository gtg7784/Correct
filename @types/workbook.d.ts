export {};

declare global {
  export interface IWorkBook {
    id: number;
    name: string;
    bockcover_url: string;
    answers: null | IAnswer[];
    subject: string;
  }

  export interface IAnswer {
    [key: number]: number | string;
  }
}
