import { combineReducers } from "@reduxjs/toolkit";
import CoordinatesReducer from "../../../pages/home/reducers/coordinates.reducer";
import ToastReducer from "../../../shared/components/toast/reducer/ToastReducer";

const rootReducer = combineReducers({
    coordinates: CoordinatesReducer,
    toast: ToastReducer
  });
  
  export default rootReducer;