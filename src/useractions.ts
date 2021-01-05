import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getUserByUsername as getUserByUsernameAPI,
         IUserState} from "./facility"
import { UserActionTypes, IUserGetAction, IUserLoadingAction} from "./facility"
import { loginAPI } from "./userapi"


const loading: ActionCreator<IUserLoadingAction> = () => ({
    type: UserActionTypes.LOADING
});

export const getUser: ActionCreator<ThunkAction<Promise<AnyAction>, IUserState, null, IUserGetAction>> = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const user = await getUserByUsernameAPI(username);
        return dispatch({
          user,
          type: UserActionTypes.GETINFO
        });
    };
};

export const loginAction: ActionCreator<ThunkAction<Promise<AnyAction>, any, null, any>> = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
      dispatch(loading());
      const result = await loginAPI(email, password);
      return dispatch({
        result,
        type: UserActionTypes.LOGIN,
      });
  };
};