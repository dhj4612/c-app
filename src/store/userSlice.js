import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    realNameInfo: {
      faceUrl: "",
      backUrl: "",
      faceHalfUrl: "",
      backHalfUrl: "",
    },
    score: "",
    userInfo: {},
    personInfoForm: {},
    homeData: {},
    evaluateFormData: {},
  },
  reducers: {
    setRealNameInfo: (state, { payload }) => {
      state.realNameInfo = { ...payload };
    },
    setScore: (state, { payload }) => {
      state.score = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = { ...payload };
    },
    setEvaluateFormData: (state, { payload }) => {
      state.evaluateFormData = { ...payload };
    },
    setPersonInfoForm: (state, { payload }) => {
      state.personInfoForm = { ...payload };
    },
    setHomeData: (state, { payload }) => {
      state.homeData = { ...payload };
    },
  },
});
export const {
  setRealNameInfo,
  setScore,
  setUserInfo,
  setPersonInfoForm,
  setHomeData,
  setEvaluateFormData,
} = userSlice.actions;
export default userSlice.reducer;
