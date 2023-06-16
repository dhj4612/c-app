import { WebView } from "react-native-webview";
import { handlerPostMessage } from "../../../utils/tools";
import Loading from "../../../components/Loading";
import { getBasePageUrlByEnv } from "../../../utils/env";
import React, { useEffect } from "react";
import { BackHandler, Platform } from "react-native";

export default ({ route, navigation }) => {
  const onAndroidBackPress = () => {
    Loading.hide();
    return false;
  };
  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
      };
    }
  }, []);
  return <WebView originWhitelist={["*"]}
                  mixedContentMode="always"
                  userAgent={"chengxueapp"}
                  onMessage={(e) => handlerPostMessage(e, navigation)}
                  allowsBackForwardNavigationGestures={true}
                  onLoadStart={() => Loading.show()}
                  onLoadEnd={() => Loading.hide()}
                  source={{
                    uri: `${getBasePageUrlByEnv()}/lessonHandle/agreement${route.params.url}`,
                  }} />;
}
