import { WebView } from "react-native-webview";
import { getBasePageUrlByEnv } from "../../../utils/env";
import React, { useEffect } from "react";
import Loading from "../../../components/Loading";
import { handlerPostMessage } from "../../../utils/tools";
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
  return <>
    <WebView originWhitelist={["*"]}
             userAgent={"chengxueapp"}
             mixedContentMode="always"
             onLoadStart={() => Loading.show()}
             onLoadEnd={() => Loading.hide()}
             onMessage={(e) => handlerPostMessage(e, navigation)}
             allowsBackForwardNavigationGestures={true}
             source={{
               uri: `${getBasePageUrlByEnv()}/sourceHistory${route.params.url}`,
             }} />
  </>;
}
