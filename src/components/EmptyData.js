import { StyleSheet, Text, View } from "react-native";
import { full_container } from "../assets/stys/const_stys";

export default () => {
  return <View style={[full_container, stys.layout]}>
    <Text>暂无数据</Text>
  </View>;
}

const stys = StyleSheet.create({
  layout: {
    justifyContent: "center",
    alignItems: "center",
  },
});
