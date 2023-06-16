import NavBar from "../../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import OrderInfo from "./OrderInfo";
import CourseInfo from "./CourseInfo";
import HandlerDetail from "./HandlerDetail";
import { StyleSheet, View } from "react-native";
import { xTd } from "../../../utils/tools";

export default function AgreementCheck() {
  const nav = useNavigation();
  return <>
    <NavBar title={"优软科技"} handler={() => nav.goBack()} />
    <View style={stys.layout}>
      <OrderInfo />
      <CourseInfo />
      <HandlerDetail />
    </View>
  </>;
};

const stys = StyleSheet.create({
  layout: {
    width: "100%",
    height: "100%",
    padding: xTd(10),
  },
});
