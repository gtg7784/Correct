export const subjects: SubjectType[] = [
  '국어',
  '수학',
  '사회',
  '과학',
  '영어',
  '기타',
];

export const englishSubjects: SubjectEnglishType[] = [
  'korean',
  'math',
  'society',
  'science',
  'english',
  'etc',
];

export const sortBySubject = (data: IWorkbook[]) => {
  let sortedWorkbooks: ISortedWorkbooks = {};

  englishSubjects.map(item => {
    sortedWorkbooks[item] = [];
  });

  data.map(item => {
    const subjectIdx = subjects.indexOf(item.subject);
    const subject = englishSubjects[subjectIdx];

    sortedWorkbooks[subject].push(item);
  });

  return sortedWorkbooks;
};
