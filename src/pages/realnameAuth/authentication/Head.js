import { xTd } from "../../../utils/tools";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../../assets/img/public/logo.png";

export default () => {
  return <View style={stys.layout}>
    <View style={stys.logoLayout}>
      <Image style={stys.logoImg} source={logo} />
      <Text style={stys.logoTxt}>诚学信付</Text>
    </View>
    <Text style={stys.tipsPrimaryTxt}>请上传你的二代身份证</Text>
    <Text>请上传你的二代身份证</Text>
  </View>;
}
const stys = StyleSheet.create({
  tipsPrimaryTxt: {
    fontSize: xTd(18),
    color: "black",
    marginTop: xTd(15),
  },
  logoTxt: {
    fontWeight: "bold",
    color: "black",
    marginLeft: xTd(5),
  },
  logoImg: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  logoLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  layout: {
    width: "100%",
    padding: xTd(15),
    paddingBottom: 0,
  },
});
