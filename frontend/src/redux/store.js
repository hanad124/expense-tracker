import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getUserInfoReducer,
  getUserNameReducer,
} from "./reducers/userReducers";

const finalReducer = combineReducers({
  getUserInfoReducer: getUserInfoReducer,
  getUserNameReducer: getUserNameReducer,
});

const initialState = {};

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
