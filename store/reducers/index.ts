import {combineReducers} from 'redux';
import user, {IUserState} from './user';
import workbook, {IWorkbookState} from './workbook';
export interface RootState {
  user: IUserState;
  workbook: IWorkbookState;
}

const rootReducer = combineReducers({
  user,
  workbook,
});

export default rootReducer;
