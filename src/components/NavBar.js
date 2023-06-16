import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { xTd } from "../utils/tools";
import ArrowIcon from "./ArrowIcon";

export default (props) => {
  const { title, handler } = props;
  const stys = StyleSheet.create({
    layout: {
      width: "100%",
      height: xTd(40),
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: xTd(16),
    },
    titleLayout: {
      flexDirection: "row",
      justifyContent: "center",
      flex: 5,
    },
    titleTxt: {
      fontSize: xTd(16),
      color: "black",
    },
  });
  return <View style={stys.layout}>
    <TouchableOpacity onPress={handler}>
      <ArrowIcon deg={90} size={18} />
    </TouchableOpacity>
    <View style={stys.titleLayout}>
      <Text style={stys.titleTxt}>{title}</Text>
    </View>
  </View>;
}
