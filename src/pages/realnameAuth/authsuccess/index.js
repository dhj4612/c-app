import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import authSuccessImg from "../../../assets/img/mine/authentication-success.png";
import NavBar from "../../../components/NavBar";
import { xTd } from "../../../utils/tools";
import { getCustomServiceLinkByEnv } from "../../../utils/env";

export default function AuthSuccess({ route, navigation }) {
  const getTipsByState = () => {
    switch (route.params.state) {
      case 0:
        return "实名信息提交成功，请耐心等待信息审核";
      case 2:
        return "恭喜您，已通过实名认证！";
      default:
        return "";
    }
  };

  return <>
    <NavBar title={"实名认证"} handler={() => navigation.goBack()} />
    <View style={stys.layout}>
      <Image source={authSuccessImg}
             style={stys.authSuccessImg}
      />
      <Text>{getTipsByState()}</Text>
    </View>
    <View style={stys.buttonContainer}>
      <Text style={stys.tipsLayout}>对此信息有疑问？
        <Text style={stys.customerServiceTxt}
              onPress={() => Linking.openURL(getCustomServiceLinkByEnv())}>联系客服</Text>
      </Text>
      <TouchableOpacity style={stys.buttonLayout}
                        activeOpacity={.5}
                        onPress={() => navigation.goBack()}>
        <Text style={{ color: "rgb(32,103,255)" }}>确认</Text>
      </TouchableOpacity>
    </View>
  </>;
}

const stys = StyleSheet.create({
  customerServiceTxt: {
    color: "rgb(90,158,238)",
  },
  tipsLayout: {
    width: "100%",
    textAlign: "center",
    fontSize: xTd(12),
  },
  buttonLayout: {
    width: "100%",
    height: xTd(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(211,225,245)",
    borderRadius: xTd(12),
    marginTop: xTd(5),
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    padding: xTd(15),
    bottom: 0,
  },
  authSuccessImg: {
    width: xTd(200),
    height: xTd(200),
    resizeMode: "stretch",
    marginTop: xTd(100),
  },
  layout: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
