import Loading from "../../../components/Loading";
import { WebView } from "react-native-webview";
import { getBasePageUrlByEnv } from "../../../utils/env";
import { useEffect, useRef } from "react";
import { BackHandler, Platform } from "react-native";
import { handlerPostMessage } from "../../../utils/tools";

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
  return <WebView originWhitelist={["*"]}
                  userAgent={"chengxueapp"}
                  onLoadStart={() => Loading.show()}
                  onLoadEnd={() => Loading.hide()}
                  ref={webViewRef}
                  onMessage={e => handlerPostMessage(e, navigation)}
                  mixedContentMode="always"
                  allowsBackForwardNavigationGestures={true}
                  source={{
                    uri: `${getBasePageUrlByEnv()}/mine/personalCenter/about${route?.params?.url}`,
                  }} />;
}
