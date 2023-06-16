import CommonDialog from "../../components/CommonDialog";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import personal_icon from "../../assets/img/set/personal.png";
import feedback_icon from "../../assets/img/set/feedback.png";
import check_update_icon from "../../assets/img/set/check_update.png";
import agreement_icon from "../../assets/img/set/agreement.png";
import privacy_icon from "../../assets/img/set/privacy.png";
import about_icon from "../../assets/img/set/about.png";
import NavBar from "../../components/NavBar";
import { xTd } from "../../utils/tools";
import { goBack, navigate, navigateWebViewLoadAuthorization, Routers } from "../../navigation";
import ArrowIcon from "../../components/ArrowIcon";
import { exitLogin } from "../../utils/user";
import { useRef } from "react";
import { useUserStore } from "../../hooks/useUserStore";

export default function Setting() {
  const commonDialogModalRef = useRef(null);
  const { clearUserStore } = useUserStore();
  return <>
    <NavBar title={"设置"} handler={() => goBack()} />
    <View style={stys.layout}>
      <View style={stys.itemLayout}>
        <TouchableOpacity style={stys.itemEleLayout}
                          onPress={() => navigate(Routers.PersonalCenter.name)}>
          <View style={stys.itemEleRightLayout}>
            <Image source={personal_icon}
                   style={stys.rightIconLayout} />
            <Text style={{ marginLeft: xTd(5) }}>个人中心</Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
        <View style={stys.line} />

        <TouchableOpacity style={stys.itemEleLayout}
                          onPress={_ => navigateWebViewLoadAuthorization(Routers.ProblemWebView.name)}>
          <View style={stys.itemEleRightLayout}>
            <Image source={feedback_icon}
                   style={stys.rightIconLayout} />
            <Text style={{ marginLeft: xTd(5) }}>问题反馈</Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
        <View style={stys.line} />

        <TouchableOpacity style={stys.itemEleLayout}
                          onPress={() => {
                          }}>
          <View style={stys.itemEleRightLayout}>
            <Image source={check_update_icon}
                   style={stys.rightIconLayout} />
            <Text style={{ marginLeft: xTd(5) }}>检查更新</Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
      </View>

      <View style={[stys.itemLayout, { marginTop: xTd(15) }]}>
        <TouchableOpacity style={stys.itemEleLayout}
                          onPress={_ => navigateWebViewLoadAuthorization(Routers.UserAgreeWebView.name)}>
          <View style={stys.itemEleRightLayout}>
            <Image source={agreement_icon}
                   style={stys.rightIconLayout} />
            <Text style={{ marginLeft: xTd(5) }}>用户协议</Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
        <View style={stys.line} />

        <TouchableOpacity style={stys.itemEleLayout}
                          onPress={_ => navigateWebViewLoadAuthorization(Routers.PrivacyWebView.name)}>
          <View style={stys.itemEleRightLayout}>
            <Image source={privacy_icon}
                   style={stys.rightIconLayout} />
            <Text style={{ marginLeft: xTd(5) }}>隐私政策</Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
      </View>

      <View style={[stys.itemLayout, { marginTop: xTd(15) }]}>
        <TouchableOpacity style={stys.itemEleLayout}
                          onPress={_ => navigateWebViewLoadAuthorization(Routers.PersonalCenterAboutWebView.name)}>
          <View style={stys.itemEleRightLayout}>
            <Image source={about_icon}
                   style={stys.rightIconLayout} />
            <Text style={{ marginLeft: xTd(5) }}>关于我们</Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
      </View>

    </View>
    <View style={stys.buttonLayout}>
      <TouchableOpacity style={stys.exitLoginButton}
                        onPress={() => commonDialogModalRef.current.showModal()}>
        <Text style={{ color: "red" }}>退出登录</Text>
      </TouchableOpacity>
    </View>

    <CommonDialog contentText={"确认退出登录吗？"}
                  ref={commonDialogModalRef}
                  onConfirm={() => {
                    clearUserStore();
                    exitLogin().catch(e => undefined);
                  }} />
  </>;
}

const stys = StyleSheet.create({
  line: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#D0D0D0",
    marginTop: xTd(5),
  },
  rightIconLayout: {
    width: xTd(15),
    height: xTd(15),
    resizeMode: "stretch",
  },
  itemEleRightLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  itemEleLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: xTd(10),
  },
  itemLayout: {
    width: "100%",
    padding: xTd(10),
    borderRadius: xTd(12),
    backgroundColor: "white",
  },
  exitLoginButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(245,233,233)",
    paddingVertical: xTd(15),
    borderRadius: xTd(12),
  },
  buttonLayout: {
    width: "100%",
    position: "absolute",
    padding: xTd(15),
    left: 0,
    bottom: 0,
  },
  layout: {
    width: "100%",
    padding: xTd(15),
  },
});
