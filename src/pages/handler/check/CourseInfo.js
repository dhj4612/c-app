import { StyleSheet, Text, View } from "react-native";
import { xTd } from "../../../utils/tools";

export default () => {
  return <>
    <View style={stys.titleLayout}>
      <Text style={stys.titleTxt}>课程名称</Text>
    </View>
    <View style={stys.contentLayout}>
      <Text style={{ color: "black" }}>测试录审课程</Text>
    </View>
  </>;
}
const stys = StyleSheet.create({
  contentLayout: {
    width: "100%",
    backgroundColor: "white",
    padding: xTd(15),
    marginTop: xTd(5),
    borderRadius: xTd(12),
  },
  titleTxt: {
    fontSize: xTd(12),
  },
  titleLayout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: xTd(15),
  },
});
