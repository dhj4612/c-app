import { ImageBackground, StyleSheet, Text, View } from "react-native";
import payBg from "../../../assets/img/pay/pay-bg.png";
import { img_bg_stretch } from "../../../assets/stys/const_stys";
import { formatAmountSymbol, xTd } from "../../../utils/tools";

export default () => {

  return <ImageBackground source={payBg}
                          style={stys.layout}
                          imageStyle={img_bg_stretch}>
    <View style={stys.orderInfoLayout}>
      <View style={stys.orderNumberLayout}>
        <Text style={stys.orderInfoTxt}>订单编号:CX20230516562965</Text>
      </View>
      <View style={stys.orderStateLayout}>
        <Text style={stys.orderInfoTxt}>已提交</Text>
      </View>
    </View>
    <View style={stys.contentLayout}>
      <View style={stys.amountLayout}>
        <Text style={stys.amountTxt}>办理诚信付总金额</Text>
        <Text style={stys.amountTxt}>{formatAmountSymbol(20000)}</Text>
      </View>
      <View style={stys.courseLayout}>
        <View style={{ flex: 1.5 }}><Text style={stys.courseTxt}>测试录审课程</Text></View>
        <View style={{ flex: 1 }}><Text style={stys.courseTxt}>诚学信付</Text></View>
        <View style={{ flex: 2, alignItems: "flex-end" }}><Text style={stys.courseTxt}>2023-05-16 10:54:16</Text></View>
      </View>
      <Text style={stys.tipsTxt}>请先完成培训支付协议的签署，谢谢</Text>
    </View>
  </ImageBackground>;
}

const stys = StyleSheet.create({
  tipsTxt: {
    color: "#ff7e00",
    fontSize: xTd(10),
  },
  courseTxt: {
    fontSize: xTd(12),
  },
  courseLayout: {
    flexDirection: "row",
    paddingVertical: xTd(15),
  },
  amountTxt: {
    fontSize: xTd(13),
    color: "black",
  },
  amountLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderStateLayout: {
    flex: 1.2,
    alignItems: "center",
    marginTop: xTd(10),
  },
  orderInfoTxt: {
    fontSize: xTd(13),
  },
  orderNumberLayout: {
    flex: 3,
    marginTop: xTd(10),
  },
  contentLayout: {
    flex: 3,
    width: "100%",
    padding: xTd(20),
  },
  orderInfoLayout: {
    flex: 1.25,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: xTd(10),
  },
  layout: {
    width: "100%",
    height: xTd(150),
  },
});
