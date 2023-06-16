import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { xTd } from "../../utils/tools";
import ArrowIcon from "../../components/ArrowIcon";
import { navigate, Routers } from "../../navigation";

export default (props) => {
  return <>
    <View style={stys.layout}>
      <TouchableOpacity style={stys.itemLayout}
                        activeOpacity={.6}
                        onPress={() => navigate(Routers.UpdatePhoneNumber.name)}>
        <Text>修改登录手机号</Text>
        <ArrowIcon size={20} color={"rgb(181,181,186)"} />
      </TouchableOpacity>
      <View style={stys.line} />
      <TouchableOpacity style={stys.itemLayout}
                        activeOpacity={.6}
                        onPress={() => navigate(Routers.UpdatePassword.name)}>
        <Text>修改登录密码</Text>
        <ArrowIcon size={20} color={"rgb(181,181,186)"} />
      </TouchableOpacity>
    </View>
  </>;
}

const stys = StyleSheet.create({
  line: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
  },
  itemLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: xTd(10),
    height: xTd(55),
  },
  layout: {
    width: "100%",
    marginTop: xTd(15),
    backgroundColor: "white",
    borderRadius: xTd(12),
  },
});
