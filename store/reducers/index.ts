import {combineReducers} from 'redux';
import user, {IUserState} from './user';
export interface RootState {
  user: IUserState;
}

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
