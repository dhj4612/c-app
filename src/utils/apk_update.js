import { NativeModules } from "react-native";
import { fetchAppLatestVersionApi } from "../api";
import { handlerErr } from "./request_error_handler";

export const fetchApkUpdateInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { AppConstant } = NativeModules;
      const { versionName } = AppConstant;
      const { appUrl, versionCode, type } = await fetchAppLatestVersionApi();
      resolve({
        appUrl,
        versionCode,
        type,
        versionName,
      });
    } catch (e) {
      await handlerErr(e);
      reject();
    }
  });
};
