const SET_USER = 'USER/SET_USER' as const;

type UserType = {
  username: string;
  email: string;
  name: string;
} | null;

export const chagneUser = (user: UserType) => ({
  type: SET_USER,
  payload: user,
});

type UserAction = ReturnType<typeof chagneUser>;

export interface IUserState {
  user: UserType;
}

const initialState: IUserState = {
  user: null,
};

const setUser = (state: IUserState, user: UserType) => ({
  ...state,
  user,
});

const reducer = (state: IUserState = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
