import { WebView } from "react-native-webview";
import Loading from "../../../components/Loading";
import { BackHandler, Platform } from "react-native";
import React, { useEffect } from "react";
import { getBasePageUrlByEnv } from "../../../utils/env";
import { handlerPostMessage } from "../../../utils/tools";
import { useUserStore } from "../../../hooks/useUserStore";

export default ({ route, navigation }) => {
  const { userState } = useUserStore();
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
  const runScript = `
  localStorage.setItem("homeData.corporationName","${userState.homeData.corporationName}");
  localStorage.setItem("homeData.corporatioId", "${userState.homeData.corporatioId}");
  true;
  `;
  return <WebView originWhitelist={["*"]}
                  mixedContentMode="always"
                  userAgent={"chengxueapp"}
                  injectedJavaScript={runScript}
                  javaScriptEnabled={true}
                  onMessage={(e) => handlerPostMessage(e, navigation)}
                  allowsBackForwardNavigationGestures={true}
                  onLoadStart={() => Loading.show()}
                  onLoadEnd={() => Loading.hide()}
                  source={{
                    uri: `${getBasePageUrlByEnv()}/lessonExamine${route.params.url}`,
                  }} />;
}
