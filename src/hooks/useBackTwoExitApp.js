import { toastMessage } from "../utils/tools";

export const useBackTwoExitApp = () => {
  let backCount = 0;
  let preTime;

  const backInit = () => {
    preTime = Date.now();
    toastMessage("再次返回退出app");
  };
  const twoBackExitApp = () => {
    backCount++;
    if (backCount <= 1) {
      backInit();
      return true;
    }
    let nowTime = Date.now();
    if (nowTime - preTime <= 2000) {
      backCount = 0;
      preTime = nowTime;
      return false;
    } else {
      backCount = 1;
      backInit();
      return true;
    }
  };

  return {
    twoBackExitApp,
  };
};
