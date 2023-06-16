import { PermissionsAndroid } from "react-native";

export const initPermission = async () => {
  await PermissionsAndroid.requestMultiple([
    "android.permission.CAMERA",
    "android.permission.RECORD_AUDIO",
    "android.permission.READ_MEDIA_AUDIO",
    "android.permission.READ_MEDIA_IMAGES",
    "android.permission.READ_MEDIA_VIDEO",
    "android.permission.ACCESS_FINE_LOCATION",
    "android.permission.ACCESS_COARSE_LOCATION",
  ]);
};
