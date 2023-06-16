import { WebView } from "react-native-webview";
import { getBasePageUrlByEnv } from "../../../utils/env";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { BackHandler, Platform } from "react-native";
import { handlerPostMessage } from "../../../utils/tools";
import { USER_AUTH_STATE } from "../../../const";
import { useUserStore } from "../../../hooks/useUserStore";
import { useFocusEffect } from "@react-navigation/native";
import { fetchMineDataApi } from "../../../api";

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
  const { userState, saveUserInfo } = useUserStore();
  const [runScript, setRunScript] = useState("");
  useFocusEffect(useCallback(() => {
    Loading.show();
    fetchMineDataApi().then(result => {
      saveUserInfo(result);
      const userStateText = USER_AUTH_STATE.getRealNameStateText(userState?.userInfo?.realNameState);
      setRunScript(`localStorage.setItem("userInfo.realNameStateText", "${userStateText}");
      true`);
      Loading.hide();
    }).catch(_ => Loading.hide());
  }, []));
  return <WebView originWhitelist={["*"]}
                  userAgent={"chengxueapp"}
                  injectedJavaScript={runScript}
                  onLoadStart={() => Loading.show()}
                  onLoadEnd={() => Loading.hide()}
                  mixedContentMode="always"
                  onMessage={e => handlerPostMessage(e, navigation)}
                  allowsBackForwardNavigationGestures={true}
                  source={{
                    uri: `${getBasePageUrlByEnv()}/assessmentSource${route.params.url}`,
                  }} />;
}
