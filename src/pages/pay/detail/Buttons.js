import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toastMessage, xTd } from "../../../utils/tools";

export default (props) => {
  const { dataInfo, getChecks } = props;

  const onePay = () => {
    if (dataInfo.isLast) {
      toastMessage("最后一期无法操作提前结清，请直接支付");
      return;
    }
    if (dataInfo.isOverdue) {
      toastMessage("当前存在逾期未支付，不能进行一次性支付");
      return;
    }
  };

  const goPay = () => {
    const checks = getChecks();
    if (Object.keys(checks).map(key => checks[key]).filter(isCheck => isCheck).length === 0) {
      toastMessage("请勾选需要支付的期数");
      return;
    }
    if (checks.length === 1) {

    }
    console.log(checks);
  };
  return <View style={stys.layout}>
    <TouchableOpacity style={stys.onePayButtonLayout}
                      onPress={() => onePay()}
    >
      <Text style={stys.onePay}>一次性付清</Text>
      {dataInfo.discountIcon && <Text style={stys.discountTxt}>优惠</Text>}
    </TouchableOpacity>
    <View style={stys.interval}></View>
    <TouchableOpacity style={stys.goPayButtonLayout}
                      onPress={() => goPay()}>
      <Text style={stys.goPayTxt}>去支付所选</Text>
    </TouchableOpacity>
  </View>;
}

const stys = StyleSheet.create({
  discountTxt: {
    fontSize: xTd(12),
    backgroundColor: "#0082e7",
    color: "white",
    marginLeft: xTd(5),
    paddingHorizontal: xTd(2),
    paddingVertical: xTd(1),
    borderRadius: xTd(1),
  },
  onePay: {
    color: "#0082e7",
  },
  goPayTxt: {
    color: "white",
  },
  goPayButtonLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: xTd(45),
    borderRadius: xTd(12),
    backgroundColor: "rgb(0,130,231)",

  },
  interval: {
    flex: .1,
  },
  onePayButtonLayout: {
    flex: 1,
    flexDirection: "row",
    height: xTd(45),
    borderRadius: xTd(12),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(200,218,255)",
  },
  layout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: xTd(15),
    backgroundColor: "white",
  },
});
