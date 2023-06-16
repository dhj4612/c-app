import { StyleSheet, Text } from "react-native";
import { xTd } from "../utils/tools";

export default (props) => {
  const { first, second } = props;
  return <Text style={stys.periodTxt}>{first}/{second}期</Text>;
}

const stys = StyleSheet.create({
  periodTxt: {
    paddingVertical: xTd(2),
    paddingHorizontal: xTd(10),
    borderRadius: xTd(10),
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#0082E7",
  },
});
