import NavBar from "../../components/NavBar";
import { StyleSheet, View } from "react-native";
import { xTd } from "../../utils/tools";
import Head from "./Head";
import Info from "./Info";
import Operation from "./Operation";

export default function PersonalCenter({ route, navigation }) {
  return <>
    <NavBar title={"个人中心"} handler={() => navigation.goBack()} />
    <View style={stys.layout}>
      <Head />
      <Info />
      <Operation />
    </View>
  </>;
}

const stys = StyleSheet.create({
  layout: {
    width: "100%", height: "100%", padding: xTd(15),
  },
});
