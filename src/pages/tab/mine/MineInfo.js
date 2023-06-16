import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../../../assets/img/public/logo.png";
import ArrowIcon from "../../../components/ArrowIcon";
import { navigate, Routers } from "../../../navigation";
import { xTd } from "../../../utils/tools";

export default (props) => {
  const stys = StyleSheet.create({
    layout: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: xTd(20),
      marginTop: xTd(20),
    },
    leftLayout: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: xTd(60),
      height: xTd(60),
      borderRadius: xTd(30),
      resizeMode: "stretch",
    },
    userNameLayout: {
      flexDirection: "column",
      marginLeft: xTd(10),
    },
    accountTxt: {
      fontSize: xTd(17),
      color: "black",
    },
    userNameTxt: {
      fontSize: xTd(12),
      padding: xTd(2),
      borderRadius: xTd(8),
      backgroundColor: "#bfe1ff",
      marginLeft: xTd(-4),
    },
  });
  const { phone, userName, avatarUrl } = props;

  return <TouchableOpacity style={stys.layout}
                           activeOpacity={1}
                           onPress={async () => {
                             // navigate(Routers.PersonalCenterWebView.name,
                             //   { url: toUrlParam({ token: await getAuthorization() }) });
                             navigate(Routers.PersonalCenter.name)
                           }}>
    <View style={stys.leftLayout}>
      {avatarUrl ? <Image style={stys.logo} source={{ uri: avatarUrl }} /> :
        <Image style={stys.logo} source={logo} />}
      <View style={stys.userNameLayout}>
        <Text style={stys.accountTxt}>{phone}</Text>
        <Text style={stys.userNameTxt}>用户名：{userName}</Text>
      </View>
    </View>
    <ArrowIcon />
  </TouchableOpacity>;
}
