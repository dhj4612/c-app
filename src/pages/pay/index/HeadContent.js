import { ImageBackground, StyleSheet, Text } from "react-native";
import goPayBg from "../../../assets/img/pay/goPay-bg.png";
import { formatAmountSymbol, xTd } from "../../../utils/tools";
import { img_bg_stretch } from "../../../assets/stys/const_stys";

export default (props) => {
  const { detail } = props;
  return <ImageBackground style={stys.layout}
                          source={goPayBg}
                          imageStyle={img_bg_stretch}>
    {!detail.paidUp ? <>
        <Text style={stys.amountDescTxt}>剩余支付金额(元)</Text>
        <Text style={stys.amountTxt}>{formatAmountSymbol(detail.surplusAmount)}</Text>
      </> :
      <Text style={stys.paidUpTxt}>支付已完成</Text>
    }
  </ImageBackground>;
}
const stys = StyleSheet.create({
  paidUpTxt: {
    marginTop: xTd(20),
    color: "#C8DAFF",
    fontSize: xTd(25),
  },
  amountDescTxt: {
    fontSize: xTd(12),
    marginTop: xTd(15),
    color: "white",
  },
  amountTxt: {
    fontSize: xTd(25),
    color: "white",
    marginTop: xTd(5),
  },

  layout: {
    width: "100%",
    height: xTd(180),
    alignItems: "center",
  },
});
