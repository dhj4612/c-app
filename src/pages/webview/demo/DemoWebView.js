import { WebView } from "react-native-webview";
import { getBasePageUrlByEnv } from "../../../utils/env";
import React from "react";

export default () => {
  return <WebView originWhitelist={["*"]}
                  userAgent={"chengxueapp"}
                  mixedContentMode="always"
                  onMessage={(event) => {
                    console.log(event.nativeEvent.data);
                  }}
                  allowsBackForwardNavigationGestures={true}
                  source={{
                    uri: `${getBasePageUrlByEnv()}/demo`,
                  }} />;
}
