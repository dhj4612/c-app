import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../../../assets/img/public/logo.png";
import authenticationIcon from "../../../assets/img/mine/realName-authentication-status.png";
import Loading from "../../../components/Loading";
import NavBar from "../../../components/NavBar";
import { xTd } from "../../../utils/tools";
import { getCustomServiceLinkByEnv } from "../../../utils/env";
import { useEffect, useState } from "react";
import { handlerErr } from "../../../utils/request_error_handler";
import { fetchAuthenicationApi } from "../../../api";
import { useUserStore } from "../../../hooks/useUserStore";

export default function Certified({ route, navigation }) {
  const [authInfo, setAuthInfo] = useState({});
  const { userState } = useUserStore();

  const initData = async () => {
    Loading.show();
    try {
      const result = await fetchAuthenicationApi();
      setAuthInfo(result);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  const getAvatarImgSource = () => {
    if (userState.userInfo.avatarUrl) {
      return { uri: `${userState.userInfo.avatarUrl}` };
    }
    return logo;
  };

  useEffect(() => {
    initData().then();
  }, []);

  return <>
    <NavBar title={"实名认证"} handler={() => navigation.goBack()} />
    <View style={stys.layout}>
      <View style={stys.contentLayout}>
        <View style={stys.contentHeadLayout}>
          <View>
            <Text style={stys.infoTxt}>姓名：{authInfo.realName}</Text>
            <Text style={[stys.infoTxt, { marginTop: xTd(5) }]}>身份证：{authInfo.idNumber}</Text>
          </View>
          <Image source={getAvatarImgSource()}
                 style={stys.headImg}
          />
        </View>
        <View style={stys.authenticationIconLayout}>
          <Image source={authenticationIcon}
                 style={stys.authenticationIcon} />
          <Text style={stys.authenticationTxt}>您已通过实名认证</Text>
        </View>
      </View>

      <TouchableOpacity style={stys.confirmBtnLayout}
                        onPress={() => navigation.goBack()}>
        <Text style={stys.confirmBtnTxt}>确定</Text>
      </TouchableOpacity>
    </View>
    <View style={stys.tipsLayout}>
      <Text style={stys.tipsTxt}>对此信息有疑问？
        <Text style={stys.contactCustomServiceTxt}
              onPress={() => {
                Linking.openURL(getCustomServiceLinkByEnv()).then();
              }}>
          联系客服
        </Text>
      </Text>
    </View>
  </>;
}

const stys = StyleSheet.create({
  contactCustomServiceTxt: {
    color: "#5A9EEE",
  },
  tipsTxt: {
    fontSize: xTd(11),
  },
  tipsLayout: {
    width: "100%",
    position: "absolute",
    bottom: xTd(50),
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtnTxt: {
    fontSize: xTd(16),
    color: "rgb(30,102,255)",
  },
  confirmBtnLayout: {
    width: "100%",
    backgroundColor: "rgb(211,225,245)",
    borderRadius: xTd(12),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: xTd(10),
    marginTop: xTd(15),
  },
  authenticationTxt: {
    fontSize: xTd(16),
    fontWeight: "bold",
    marginLeft: xTd(10),
    color: "#69CF77",
  },
  authenticationIcon: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  authenticationIconLayout: {
    width: "100%",
    paddingTop: xTd(15),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTxt: {
    fontSize: xTd(15),
  },
  headImg: {
    width: 50,
    height: 50,
    borderRadius: xTd(25),
    resizeMode: "stretch",
  },
  contentHeadLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#D0D0D0",
    paddingBottom: xTd(15),
  },
  contentLayout: {
    width: "100%",
    padding: xTd(15),
    backgroundColor: "white",
    borderRadius: xTd(12),
  },
  layout: {
    padding: xTd(15),
  },
});
