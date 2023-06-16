import { createSlice } from "@reduxjs/toolkit";

export const tabBarIndexSlice = createSlice({
  name: "tabBarIndex",
  initialState: {
    bottomTabBarIndex: 1,
  },
  reducers: {
    setBottomBarIndex: (state, { payload }) => {
      state.bottomTabBarIndex = payload;
    },
  },
});


export const { setBottomBarIndex } = tabBarIndexSlice.actions;
export default tabBarIndexSlice.reducer;
