import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import payRecordBg from "../../../assets/img/pay/pay-bg.png";
import { img_bg_stretch } from "../../../assets/stys/const_stys";
import { formatAmountSymbol, formatDate, xTd } from "../../../utils/tools";
import { PAY_RECORD_VO_STATE } from "../../../const";
import { handlerErr } from "../../../utils/request_error_handler";
import Loading from "../../../components/Loading";
import { againPayApi, checkPayRecordsApi } from "../../../api";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

export default ({
                  item,
                  refresh,
                  revokeModalRef,
                  goPayModalRef,
                  confirmPayModalRef,
                }) => {
  useNavigation();
  const [loading, setLoading] = useState(false);
  const renderOrderInfo = () => {
    const payStateTagColorMap = [
      {
        codes: [PAY_RECORD_VO_STATE.PENDING.code,
          PAY_RECORD_VO_STATE.PAY_IN.code],
        color: "#0082e7",
      },
      {
        codes: [PAY_RECORD_VO_STATE.PAID.code],
        color: "#00a604",
      },
      {
        codes: [PAY_RECORD_VO_STATE.EXPIRED.code],
        color: "#ff7e00",
      },
      {
        codes: [PAY_RECORD_VO_STATE.CANCLE.code],
        color: "#fe0909",
      },
    ];

    const getColorSty = (code) => {
      if (!code && code !== 0) {
        return {};
      }
      const targetColor = payStateTagColorMap.find(item => item.codes.includes(code));
      return targetColor ? {
        color: targetColor.color,
      } : {};
    };

    const stys = StyleSheet.create({
      layout: {
        flexDirection: "row",
        flex: 1.1,
        width: "100%",
      },
      orderNumberTxt: {
        fontSize: xTd(10),
      },
      orderStateTxt: {
        fontSize: xTd(13),
      },
      orderNumberLayout: {
        flex: 6,
        height: "100%",
        justifyContent: "center",
      },
      orderStateLayout: {
        flex: 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
    });

    return <View style={stys.layout}>
      <View style={stys.orderNumberLayout}>
        <Text style={stys.orderNumberTxt}>{item.outTradeNo}</Text>
      </View>
      <View style={stys.orderStateLayout}>
        <Text
          style={[stys.orderStateTxt, getColorSty(item.state)]}>
          {PAY_RECORD_VO_STATE.getNameByCode(item.state)}
        </Text>
      </View>
    </View>;
  };

  const renderContent = () => {
    const stys = StyleSheet.create({
      layout: {
        flex: 3,
        width: "100%",
        paddingLeft: xTd(5),
        paddingRight: xTd(10),
      },
      corpNameTxt: {
        fontSize: xTd(12),
        color: "black",
      },
      amountTxt: {
        fontSize: xTd(12),
        color: "black",
      },
      courseTxt: {
        fontSize: xTd(12),
      },
      cxfTagTxt: {
        color: "#0082e7",
        fontSize: xTd(12),
        padding: xTd(2),
        backgroundColor: "#C8DAFF",
        marginLeft: xTd(10),
      },
      timeInfoTxt: {
        fontSize: xTd(12),
      },
      payBtnLayout: {
        paddingVertical: xTd(3),
        paddingHorizontal: xTd(6),
        borderRadius: xTd(12),
        justifyContent: "center",
        alignItems: "center",
      },
      btnTxt: {
        fontSize: xTd(13),
      },
      blueWhiteStyle: {
        backgroundColor: "white",
        borderWidth: xTd(1),
        borderColor: "#0082e7",
        marginRight: xTd(10),
      },
    });
    const checkPay = async (recordId) => {
      Loading.show();
      try {
        await checkPayRecordsApi({ recordId });
        await refresh();
      } catch (e) {
        await handlerErr(e);
      } finally {
        Loading.hide();
      }
    };

    const goPayAction = async (recordId) => {
      setLoading(true);
      try {
        const { outTradeNo, amount, items } = await againPayApi({ recordId });
        if (outTradeNo) {
          confirmPayModalRef.current.showModal(outTradeNo);
        } else {
          goPayModalRef.current.showModal({ amount, url: items });
        }
      } catch (e) {
        await handlerErr(e);
      } finally {
        setLoading(false);
      }
    };

    const revokeOrderAction = (recordId) => {
      revokeModalRef.current.showModal(recordId);
    };

    return <View style={stys.layout}>
      <View style={{ marginTop: xTd(10) }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Text style={stys.corpNameTxt}>{item.corporationName}</Text>
          <Text style={stys.amountTxt}>{formatAmountSymbol(item.amount)}</Text>
        </View>
        <View style={{
          flexDirection: "row",
          marginTop: xTd(5),
          alignItems: "center",
        }}>
          <Text style={stys.courseTxt}>{item.curriculumName}</Text>
          <Text style={stys.cxfTagTxt}>诚学信付</Text>
        </View>
      </View>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: xTd(7),
      }}>
        <View>
          <Text style={stys.timeInfoTxt}>支付单创建时间:</Text>
          <Text style={stys.timeInfoTxt}>{formatDate(new Date(item.createdDate))}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>

          {[PAY_RECORD_VO_STATE.EXPIRED.code, PAY_RECORD_VO_STATE.CANCLE.code].includes(item.state) &&
            <TouchableOpacity style={[
              stys.payBtnLayout,
              stys.blueWhiteStyle]}
                              onPress={() => checkPay(item.recordId)}>
              <Text style={[stys.btnTxt, { color: "#0082e7" }]}>我已支付</Text>
            </TouchableOpacity>}

          {item.state === PAY_RECORD_VO_STATE.PENDING.code && <>
            <TouchableOpacity style={[
              stys.payBtnLayout,
              stys.blueWhiteStyle]}
                              onPress={() => revokeOrderAction(item.recordId)}>
              <Text style={[stys.btnTxt, { color: "#0082e7" }]}>撤销订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[stys.payBtnLayout, { backgroundColor: "rgb(0, 130, 231)" }]}
                              onPress={() => goPayAction(item.recordId)}>
              {!loading ? <Text style={[stys.btnTxt, { color: "white" }]}>去支付</Text> :
                <ActivityIndicator
                  color={"#fff"}
                  animating={true}
                  size="small"
                />}
            </TouchableOpacity>
          </>}
        </View>
      </View>
    </View>;
  };

  return <ImageBackground style={stys.layout}
                          source={payRecordBg}
                          imageStyle={img_bg_stretch}>
    <View style={stys.contentLayout}>
      {renderOrderInfo()}
      {renderContent()}
    </View>
  </ImageBackground>;
}

const stys = StyleSheet.create({
  contentLayout: {
    padding: xTd(10),
    paddingTop: 0,
    height: "100%",
  },
  layout: {
    width: "100%",
    height: xTd(150),
    marginBottom: xTd(15),
  },
});
