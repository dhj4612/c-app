import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import currentCorpBg from "../../../assets/img/home/current-mechanism-bg.png";
import noticeIcon from "../../../assets/img/home/notice.png";
import React from "react";
import { toastMessage, xTd } from "../../../utils/tools";
import { navigate, navigateWebViewLoadAuthorization, Routers } from "../../../navigation";
import { useUserStore } from "../../../hooks/useUserStore";
import { img_bg_stretch } from "../../../assets/stys/const_stys";
import RollingText from "react-native-rolling-text";

export default (props) => {
  const { corpName, corporatioId, getScoreModalRef } = props;
  const { userState } = useUserStore();
  const stys = StyleSheet.create({
    layout: {
      width: "100%",
      height: "15%",
      flexDirection: "column",
    },
    titleLayout: {
      width: "100%",
      flex: 1.05,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: xTd(5),
      paddingTop: xTd(3),
    },
    corpLayout: {
      width: "100%",
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    titleTxt: {
      fontSize: xTd(16),
      fontWeight: "bold",
      color: "black",
    },
    noticeIcon: {
      // marginLeft: xTd(15),
    },
    corpInfoLayout: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: xTd(25),
    },
    titleLeftLayout: {
      flex: 1.1,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    titleRightLayout: {
      flex: 2,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    corpNameTxt: {
      fontWeight: "bold",
      color: "black",
    },
    goHandlerBtn: {
      paddingHorizontal: xTd(8),
      paddingVertical: xTd(3),
      backgroundColor: "white",
      borderRadius: 12,
    },
    goHandlerBtnTxt: {
      fontSize: xTd(12),
      color: "#2854fd",
    },
    goBindBtnTxt: {
      fontSize: xTd(12),
      color: "#2854fd",
    },
  });

  const goHandler = async () => {
    const { homeData } = userState;
    if (homeData.overdueOrder === 1) {
      toastMessage("很抱歉，您当前有逾期中的订单，暂时无法办理新的课程。");
      return;
    }
    if (homeData.isIncoming === 1) {
      toastMessage("您当前诚学分低于500分，如果继续办理需要机构确认。");
      return;
    }
    if (homeData.total === null) {
      getScoreModalRef.current.showModal();
      return;
    }
    navigateWebViewLoadAuthorization(Routers.LessonHandlerWebView.name);
  };
  const onPressByBingOrHandler = () => {
    if (corporatioId) {
      // TODO 办理课程
      goHandler();
    } else {
      navigate(Routers.CodeScanner.name);
    }
  };

  return <ImageBackground style={stys.layout}
                          imageStyle={img_bg_stretch}
                          source={currentCorpBg}>
    <View style={stys.titleLayout}>
      <View style={stys.titleLeftLayout}>
        <Text style={stys.titleTxt}>当前所在机构</Text>
      </View>
      <View style={stys.titleRightLayout}>
        <Image style={stys.noticeIcon} source={noticeIcon} />
        <View style={{ overflow: "hidden" }}>
          <RollingText durationMsPerWidth={10}
                       startDelay={100}>
            {"反诈提醒：近日有部分用户接到诚学信付返资退课等相关诈骗信息，请不要私下转账！保护好个人信息，不要相信任何第三方代理退费机构或个人微信、QQ群，如有疑问，请咨询机构老师或诚学信付官方客服，切实提高反诈意识。诚学信付祝大家新春愉快，阖家欢乐！"}
          </RollingText>
        </View>
      </View>
    </View>
    <View style={stys.corpLayout}>
      <View style={stys.corpInfoLayout}>
        <Text style={stys.corpNameTxt}>{corpName}</Text>
        <TouchableOpacity style={stys.goHandlerBtn}
                          onPress={() => onPressByBingOrHandler()}>
          {corporatioId ? <Text style={stys.goHandlerBtnTxt}>去办理</Text> :
            <Text style={stys.goBindBtnTxt}>去绑定</Text>}
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>;
}
