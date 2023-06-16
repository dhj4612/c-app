import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/img/public/logo.png";
import { xTd } from "../../utils/tools";
import ArrowIcon from "../../components/ArrowIcon";
import { useUserStore } from "../../hooks/useUserStore";
import { navigate, Routers } from "../../navigation";

export default () => {
  const { userState } = useUserStore();
  return <View style={stys.layout}>
    <TouchableOpacity style={stys.avatarLayout}
                      activeOpacity={.6}
                      onPress={() => navigate(Routers.AvatarSet.name)}>
      <Text>头像</Text>
      <View style={stys.avatarRightLayout}>
        <Image source={userState.userInfo.avatarUrl && { uri: userState.userInfo.avatarUrl } || logo}
               style={stys.avatarImg} />
        <ArrowIcon size={20} color={"rgb(181,181,186)"} />
      </View>
    </TouchableOpacity>
    <View style={stys.line} />
    <View style={stys.userNameLayout}>
      <Text>用户名</Text>
      <Text>{userState.userInfo.userName}</Text>
    </View>
  </View>;
}
const stys = StyleSheet.create({
  userNameLayout: {
    width: "100%",
    padding: xTd(10),
    height: xTd(55),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
  },
  avatarImg: {
    width: xTd(34),
    height: xTd(34),
    resizeMode: "stretch",
    borderRadius: xTd(17),
    marginRight: xTd(5),
  },
  avatarRightLayout: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  avatarLayout: {
    height: xTd(55),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: xTd(10),
  },
  layout: {
    width: "100%",
    borderRadius: xTd(12),
    backgroundColor: "white",
  },
});
