export {};

declare global {
  export interface IWorkbook {
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
