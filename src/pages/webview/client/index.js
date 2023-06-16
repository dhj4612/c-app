import React, { useEffect, useRef } from "react";
import { BackHandler, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { getBasePageUrlByEnv } from "../../../utils/env";

export const CxfClientWebView = () => {
  const webViewRef = useRef(null);
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
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

  return <WebView ref={webViewRef}
                  originWhitelist={["*"]}
                  // userAgent={"chengxueapp"}
                  mixedContentMode="always"
                  allowsBackForwardNavigationGestures={true}
                  source={{
                    uri: `${getBasePageUrlByEnv()}`,
                  }} />;
};
