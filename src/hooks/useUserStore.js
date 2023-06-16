import { useDispatch, useSelector } from "react-redux";
import {
  setScore,
  setRealNameInfo,
  setUserInfo,
  setPersonInfoForm,
  setHomeData,
  setEvaluateFormData,
} from "../store/userSlice";

export const useUserStore = () => {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();
  const savePersonInfoForm = (data) => {
    dispatch(setPersonInfoForm(data));
  };
  const saveEvaluateFormData = (data) => {
    dispatch(setEvaluateFormData(data));
  };
  const clearEvaluateFormData = () => {
    dispatch(setEvaluateFormData({}));
  };
  const clearPersonInfoForm = () => {
    dispatch(setPersonInfoForm({}));
  };
  const saveRealNameInfo = (realNameInfo) => {
    dispatch(setRealNameInfo(realNameInfo));
  };
  const saveUserInfo = (userInfo) => {
    dispatch(setUserInfo(userInfo));
  };
  const clearUserInfo = () => {
    dispatch(setUserInfo({}));
  };
  const saveHomeData = (homeData) => {
    dispatch(setHomeData(homeData));
  };
  const clearHomeData = () => {
    dispatch(setHomeData({}));
  };

  const clearUserStore = () => {
    clearScore();
    clearRealNameInfo();
    clearUserInfo();
    clearHomeData();
    clearEvaluateFormData();
    clearPersonInfoForm()
  };

  const clearRealNameInfo = () => {
    dispatch(setRealNameInfo({}));
  };

  const clearScore = () => {
    dispatch(setScore(undefined));
  };

  const saveScore = (score) => {
    dispatch(setScore(score));
  };
  return {
    userState: state,
    saveScore,
    saveRealNameInfo,
    clearUserStore,
    clearScore,
    clearRealNameInfo,
    saveUserInfo,
    clearUserInfo,
    savePersonInfoForm,
    saveHomeData,
    clearHomeData,
    saveEvaluateFormData,
    clearEvaluateFormData,
  };
};
