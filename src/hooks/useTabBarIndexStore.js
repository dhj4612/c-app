import { useDispatch, useSelector } from "react-redux";
import { setBottomBarIndex } from "../store/tabBarIndexSlice";

export const useTabBarIndexStore = () => {
  const state = useSelector(state => state.tabBarIndex);
  const dispatch = useDispatch();
  const changeBottomBarIndex = (index) => {
    dispatch(setBottomBarIndex(index));
  };

  const resetBottomBarIndex = () => {
    dispatch(setBottomBarIndex(1));
  };

  return {
    tabBarStore: state,
    changeBottomBarIndex,
    resetBottomBarIndex,
  };
};
