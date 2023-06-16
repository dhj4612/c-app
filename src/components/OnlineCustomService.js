import { Linking, Text, View } from "react-native";
import { getCustomServiceLinkByEnv } from "../utils/env";
import React from "react";

export default () => {
  return <View style={{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    bottom: 10,
  }}>
    <Text onPress={() => Linking.openURL(getCustomServiceLinkByEnv())} style={{ color: "#5f93ef" }}>在线客服</Text>
  </View>;
}
