import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import paingBg from "../../../assets/img/tuitionBill/paing-bg.png";
import ArrowIcon from "../../../components/ArrowIcon";
import { formatAmountSymbol, toUrlParam, xTd } from "../../../utils/tools";
import { ORDER_VO_STATE } from "../../../const";
import { navigate, Routers } from "../../../navigation";
import { useNavigation } from "@react-navigation/native";
import { img_bg_stretch } from "../../../assets/stys/const_stys";
import EmptyData from "../../../components/EmptyData";
import { getAuthorization } from "../../../utils/user";
import overdueBg from "../../../assets/img/tuitionBill/overdue-bg.png";

export default (props) => {
  let { dataList, currentTabIndex } = props;
  const nav = useNavigation();
  const stys = StyleSheet.create({
    layout: {
      width: "100%",
      minHeight: xTd(145),
      marginTop: xTd(12),
    },
    orderNumberLayout: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: xTd(10),
    },
    orderNumberRightLayout: {
      flexDirection: "row",
      alignItems: "center",
    },
    orderNumberTxt: {
      fontSize: xTd(12),
    },
    orderStateTxt: {
      fontSize: xTd(12),
      marginRight: xTd(15),
    },
    infoContentLayout: {
      marginTop: xTd(10),
      paddingHorizontal: xTd(20),
    },
    corpNameTxt: {
      color: "black",
      fontSize: xTd(13),
    },
    courseInfoLayout: {
      flexDirection: "row",
      marginTop: xTd(10),
    },
    courseNameTxt: {
      fontSize: xTd(12),
      flex: 0.5,
    },
    descTxtLayout: {
      flex: 0.5,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    cxxfTxt: {
      fontSize: 11,
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 12,
      color: "#0082e7",
      backgroundColor: "white",
      textAlign: "center",
    },
    amountTxt: {
      color: "black",
      textAlign: "right",
      fontSize: 11,
      marginLeft: 10,
    },
    periodLayout: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    enableWithholdTxt: {
      color: "white",
      backgroundColor: "#7ebfff",
      paddingVertical: 1,
      paddingHorizontal: 5,
      fontSize: 12,
      borderRadius: 10,
    },
    periodTxt: {
      fontSize: 12,
      color: "#6ca7ff",
    },
  });
  const orderStateTxtColorMap = [
    {
      codes: [
        ORDER_VO_STATE.GO_PAY.code,
        ORDER_VO_STATE.CORP_AUDIT.code,
        ...ORDER_VO_STATE.PENDING_SIGN.code,
        ORDER_VO_STATE.DROP_IN.code,
        ORDER_VO_STATE.VIDEO_AUDIT.code,
      ],
      color: "#14CF2E",
    },
    {
      codes: [
        ...ORDER_VO_STATE.HANDLER_FAIL.code,
        ORDER_VO_STATE.REVOKE_HANDLER.code,
        ORDER_VO_STATE.DROP.code,
        ORDER_VO_STATE.OVERDUE.code],
      color: "#FE0909",
    },
    {
      codes: [ORDER_VO_STATE.PLATFORM_AUDIT.code], color: "#FF7E00",
    },
    {
      codes: [ORDER_VO_STATE.PAY_FULL.code], color: "#125EFF",
    }];
  const getColorSty = (code) => {
    if (!code && code !== 0) {
      return {};
    }
    const targetColor = orderStateTxtColorMap.find(item => item.codes.includes(code));
    return targetColor ? {
      color: targetColor.color,
    } : {};
  };

  const handlerItemToPage = async (loanId) => {
    navigate(Routers.LessonExamineWebView.name, {
      url: toUrlParam({
        id: loanId,
        token: await getAuthorization(),
      }),
    });
  };
  const payItemToPage = async (state, loanId) => {
    let routeName;
    if ([ORDER_VO_STATE.GO_PAY.code, ORDER_VO_STATE.OVERDUE.code].includes(state)) {
      routeName = Routers.PayDetailWebView.name;
    }
    if (ORDER_VO_STATE.PAY_FULL.code === state) {
      routeName = Routers.Pay.name;
    }
    if ([ORDER_VO_STATE.DROP.code, ORDER_VO_STATE.DROP_IN.code].includes(state)) {
      routeName = Routers.DropOutWebView.name;
    }
    if (routeName.indexOf("WebView") !== -1) {
      navigate(routeName, { url: toUrlParam({ id: loanId, token: await getAuthorization() }) });
    } else {
      navigate(routeName, { id: loanId });
    }
  };

  const payItemToDetailPage = async (state, loanId) => {
    let routeName;
    if (state === ORDER_VO_STATE.GO_PAY.code || 16) {
      routeName = Routers.Pay.name;
    }
    if ([ORDER_VO_STATE.DROP_IN.code, ORDER_VO_STATE.DROP.code].includes(state)) {
      routeName = Routers.DropOutWebView.name;
    }
    console.log(routeName);
    if (routeName.indexOf("WebView") !== -1) {
      navigate(routeName, { url: toUrlParam({ id: loanId, token: await getAuthorization() }) });
    } else {
      navigate(routeName, { id: loanId });
    }
  };
  const dataView = dataList.length === 0 ? <EmptyData /> :
    dataList.map((item, index) => currentTabIndex === 0 ?
      <ImageBackground source={item.state === ORDER_VO_STATE.OVERDUE.code ? overdueBg : paingBg} style={stys.layout}
                       key={index}
                       imageStyle={img_bg_stretch}>
        <TouchableOpacity style={stys.orderNumberLayout}
                          activeOpacity={0.6}
                          onPress={async () => {
                            await payItemToPage(item.state, item.loanId);
                          }}>
          <Text style={stys.orderNumberTxt}>订单编号：{item.tradeNo}</Text>
          <View style={stys.orderNumberRightLayout}>
            <Text
            style={[stys.orderStateTxt, getColorSty(item.state)]}>{ORDER_VO_STATE.getNameByCode(item.state)}</Text>
          <ArrowIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={stys.infoContentLayout}
                        activeOpacity={0.6}
                        onPress={async () => {
                          await payItemToDetailPage(item.state, item.loanId);
                        }}>
        <Text style={stys.corpNameTxt}>{item.corporationName}</Text>
        <View style={stys.courseInfoLayout}>
          <Text style={stys.courseNameTxt}>{item.curriculumName}</Text>
          <View style={stys.descTxtLayout}>
            <Text style={stys.cxxfTxt}>诚学信付</Text>
            <Text style={stys.amountTxt}>{formatAmountSymbol(item.amount)}</Text>
          </View>
        </View>
        <View
          style={[stys.periodLayout, item.title !== null ? { justifyContent: "space-between" } : { justifyContent: "flex-end" }]}>
          {item.title !== null ? <Text style={stys.enableWithholdTxt}
                                       onPress={async () => {
                                         navigate(Routers.WithHoldWebView.name, {
                                           url: toUrlParam({
                                             mes: encodeURIComponent(JSON.stringify({
                                               isWithhold: item.isWithhold,
                                               flags: item.flags,
                                               heepay: item.heepay,
                                               id: item.loanId,
                                               operate: item.titleOperate,
                                             })), token: await getAuthorization(),
                                           }),
                                         });
                                       }}
          >{item.title}</Text> : <></>}

          {item.state === ORDER_VO_STATE.GO_PAY.code ?
            <Text style={stys.periodTxt}>第 {item.monthIndex}/{item.month2Return} 期</Text> : <></>}
        </View>
      </TouchableOpacity>
    </ImageBackground> : <TouchableOpacity activeOpacity={0.3}
                                           key={index}
                                           onPress={async () => {
                                             await handlerItemToPage(item.loanId);
                                           }}>
      <ImageBackground source={paingBg} style={stys.layout}
                       key={index}
                       imageStyle={img_bg_stretch}>
        <View style={stys.orderNumberLayout}
              activeOpacity={0.6}>
          <Text style={stys.orderNumberTxt}>订单编号：{item.tradeNo}</Text>
          <View style={stys.orderNumberRightLayout}>
            <Text
              style={[stys.orderStateTxt, getColorSty(item.state)]}>{ORDER_VO_STATE.getNameByCode(item.state)}</Text>
            <ArrowIcon />
          </View>
        </View>
        <View style={stys.infoContentLayout}
              activeOpacity={0.6}>
          <Text style={stys.corpNameTxt}>{item.corporationName}</Text>
          <View style={stys.courseInfoLayout}>
            <Text style={stys.courseNameTxt}>{item.curriculumName}</Text>
            <View style={stys.descTxtLayout}>
              <Text style={stys.cxxfTxt}>诚学信付</Text>
              <Text style={stys.amountTxt}>{formatAmountSymbol(item.amount)}</Text>
            </View>
          </View>
          <View
            style={[stys.periodLayout,
              item.title !== null ? { justifyContent: "space-between" } : { justifyContent: "flex-end" }]}>
            {item.title !== null ?
              <Text style={stys.enableWithholdTxt}
                    onPress={async () => {
                      navigate(Routers.WithHoldWebView.name, {
                        url: toUrlParam({
                          mes: encodeURIComponent(JSON.stringify({
                            isWithhold: item.isWithhold,
                            flags: item.flags,
                            heepay: item.heepay,
                            id: item.loanId,
                            operate: item.titleOperate,
                          })), token: await getAuthorization(),
                        }),
                      });
                    }}>{item.title}</Text> : <></>}

            {item.state === ORDER_VO_STATE.GO_PAY.code ?
              <Text style={stys.periodTxt}>第 {item.monthIndex}/{item.month2Return} 期</Text> :
              <></>}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>);
  return <>
    {dataView}
  </>;
}


