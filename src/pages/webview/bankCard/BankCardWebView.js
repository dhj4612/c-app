import Loading from "../../../components/Loading";
import { WebView } from "react-native-webview";
import { getBasePageUrlByEnv } from "../../../utils/env";
import { useEffect, useRef } from "react";
import { BackHandler, Platform } from "react-native";
import { handlerPostMessage } from "../../../utils/tools";
import { useUserStore } from "../../../hooks/useUserStore";

export default ({ route, navigation }) => {
  const webViewRef = useRef(null);
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
  const { userState } = useUserStore();
  const runScript = `
  localStorage.setItem("userInfo.realName", "${userState.userInfo.realName}");
  localStorage.setItem("userInfo.phone", "${userState.userInfo.phone}");
  true`;
  return <WebView originWhitelist={["*"]}
                  userAgent={"chengxueapp"}
                  injectedJavaScript={runScript}
                  onLoadStart={() => Loading.show()}
                  onLoadEnd={() => Loading.hide()}
                  ref={webViewRef}
                  onMessage={e => handlerPostMessage(e, navigation)}
                  mixedContentMode="always"
                  allowsBackForwardNavigationGestures={true}
                  source={{
                    uri: `${getBasePageUrlByEnv()}/bankCard?${route?.params?.url}`,
                  }} />;
}
