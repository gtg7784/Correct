export {};

declare global {
  export interface IWorkbook {
    id: number;
    name: string;
    bookcover_url: string;
    answers: null | IAnswer;
    subject: SubjectType;
  }

  export interface IAnswer {
    [key: number]: number | string;
  }

  export type SubjectType = '국어' | '수학' | '사회' | '과학' | '영어' | '기타';

  export type SubjectEnglishType =
    | 'korean'
    | 'math'
    | 'society'
    | 'science'
    | 'english'
    | 'etc';

  export interface ISortedWorkbooks {
    [key: string]: IWorkbook[];
  }
}
