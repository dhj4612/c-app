import { BackHandler, Platform } from "react-native";
import Loading from "../../../components/Loading";
import { useEffect } from "react";
import { WebView } from "react-native-webview";
import { handlerPostMessage } from "../../../utils/tools";

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
  console.log(route.params.url);
  return <WebView originWhitelist={["*"]}
                  onLoadStart={() => Loading.show()}
                  onLoadEnd={() => Loading.hide()}
                  onMessage={e => handlerPostMessage(e, navigation)}
                  mixedContentMode="always"
                  allowsBackForwardNavigationGestures={true}
                  source={{
                    uri: `${route?.params?.url}`,
                  }} />;
}
