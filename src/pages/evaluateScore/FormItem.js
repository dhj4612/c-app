import { StyleSheet, Text, View } from "react-native";
import { xTd } from "../../utils/tools";

export default (props) => {
  const {renderLabel,render} = props

  const renderFormLabel = (props) => {
    const { labelName, require = true } = props;
    const stys = StyleSheet.create({
      layout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      requireMark: {
        color: "red",
      },
      labelTxt: {
        fontSize: xTd(13),
      },
    });
    return <View style={stys.layout}>
      {require && <Text style={stys.requireMark}>*</Text>}
      <Text style={stys.labelTxt}>{labelName}</Text>
    </View>;
  };



}
