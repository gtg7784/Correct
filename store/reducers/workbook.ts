const SET_WORKBOOK = 'WORKBOOK/SET_WORKBOOK' as const;

export const changeWorkbook = (data: IWorkbook[]) => ({
  type: SET_WORKBOOK,
  payload: data,
});

type WorkbookAction = ReturnType<typeof changeWorkbook>;

export interface IWorkbookState {
  workbook: IWorkbook[];
}

const initialState: IWorkbookState = {
  workbook: [],
};

const setWorkbook = (state: IWorkbookState, data: IWorkbook[]) => ({
  ...state,
  workbook: data,
});

const reducer = (
  state: IWorkbookState = initialState,
  action: WorkbookAction,
) => {
  switch (action.type) {
    case SET_WORKBOOK:
      return setWorkbook(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
