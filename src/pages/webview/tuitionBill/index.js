import { WebView } from "react-native-webview";
import React, { useRef } from "react";
import { getBasePageUrlByEnv } from "../../../utils/env";

export const tuitionBillWebView = () => {
  const webViewRef = useRef(null);
  return <WebView ref={webViewRef}
                  originWhitelist={["*"]}
                  mixedContentMode="always"
                  allowsBackForwardNavigationGestures={true}
                  source={{
                    uri: `${getBasePageUrlByEnv()}/tuitionBill`,
                  }} />;
};
