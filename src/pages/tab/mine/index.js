import { Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import mineBg from "../../../assets/img/mine/mine-bg.png";
import MineInfo from "./MineInfo";
import OtherInfo from "./OtherInfo";
import FunctonList from "./FunctonList";
import { useCallback, useState } from "react";
import { handlerErr } from "../../../utils/request_error_handler";
import { fetchMineDataApi } from "../../../api";
import { navigate, Routers } from "../../../navigation";
import { xTd } from "../../../utils/tools";
import { img_bg_stretch } from "../../../assets/stys/const_stys";
import { useUserStore } from "../../../hooks/useUserStore";
import settiongIcon from "../../../assets/img/mine/setting-btn.png";
import Loading from "../../../components/Loading";

export default function Mine() {
  const [mineData, setMineData] = useState({});
  const { userState, saveUserInfo } = useUserStore();
  const initData = async () => {
    Loading.show();
    try {
      const result = await fetchMineDataApi();
      setMineData({
        ...result,
      });
      saveUserInfo(result);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  useFocusEffect(useCallback(() => {
    initData().then();
  }, []));

  const renderSetting = () => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        height: xTd(20),
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: xTd(20),
        marginTop: xTd(20),
      },
      settiongIcon: {
        width: xTd(20),
        height: xTd(20),
        resizeMode: "stretch",
      },
    });
    return <TouchableOpacity style={stys.layout}
                             activeOpacity={0.6}
                             onPress={async () => navigate(Routers.Setting.name)}>
      <Image style={stys.settiongIcon} source={settiongIcon} />
    </TouchableOpacity>;
  };

  return <ImageBackground source={mineBg}
                          style={stys.layout}
                          imageStyle={img_bg_stretch}>
    {renderSetting()}
    <MineInfo phone={mineData.phone}
              userName={mineData.userName}
              avatarUrl={mineData.avatarUrl}
    />
    <OtherInfo score={userState.score} realNameState={userState.userInfo.realNameState} />
    <FunctonList />
    {/*<View style={{ marginTop: xTd(15) }}>*/}
    {/*  <Button title={"test"} onPress={async () => {*/}
    {/*    // navigate(nav, "DemoWebView");*/}
    {/*    // exitLogin(nav);*/}
    {/*    // navigate(nav, "DemoWebView");*/}
    {/*    // const token = await getAuthorization();*/}
    {/*    // console.log(token)*/}
    {/*    navigate("DemoView");*/}
    {/*    // checkApkUpdate();*/}
    {/*  }} />*/}
    {/*</View>*/}
  </ImageBackground>;
};
const stys = StyleSheet.create({
  layout: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
});
