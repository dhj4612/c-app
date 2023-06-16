import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tabBarIndexReducer from "./tabBarIndexSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    tabBarIndex: tabBarIndexReducer,
  },
});
