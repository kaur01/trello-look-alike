import { combineReducers } from "redux";
import listReducer from "./lists-reducer";
const allReducers = combineReducers({
  lists : listReducer
})
export default allReducers;
