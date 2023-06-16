import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import paymentRecordIcon from "../../../assets/img/mine/payment-record.png";
import completeOrderIcon from "../../../assets/img/mine/completed-order.png";
import bankCardIcon from "../../../assets/img/mine/bank-card.png";
import customerServiceIcon from "../../../assets/img/mine/customer-service.png";
import { getCustomServiceLinkByEnv } from "../../../utils/env";
import ArrowIcon from "../../../components/ArrowIcon";
import { navigate, Routers } from "../../../navigation";
import { getAuthorization } from "../../../utils/user";
import { toUrlParam } from "../../../utils/tools";

export default () => {
  const renderFunctionItem = (props) => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      leftLayout: {
        flexDirection: "row",
        alignItems: "center",
      },
      leftIcon: {
        width: 20,
        height: 20,
        resizeMode: "stretch",
      },
      leftTxt: {
        marginLeft: 15,
      },
    });
    const { title, icon, handler } = props;
    return <TouchableOpacity style={stys.layout}
                             activeOpacity={0.6}
                             onPress={() => handler()}>
      <View style={stys.leftLayout}>
        <Image style={stys.leftIcon}
               source={icon} />
        <Text style={stys.leftTxt}>{title}</Text>
      </View>
      <ArrowIcon />
    </TouchableOpacity>;
  };

  const functionList = [
    {
      title: "支付记录",
      icon: paymentRecordIcon,
      handler: async () => {
        navigate(Routers.PayRecordsWebView.name, { url: toUrlParam({ token: await getAuthorization() }) });
      },
    },
    {
      title: "已完成订单",
      icon: completeOrderIcon,
      handler: async () => {
        navigate(Routers.CompleteOrderWebView.name, { url: toUrlParam({ token: await getAuthorization() }) });
      },
    },
    {
      title: "银行卡",
      icon: bankCardIcon,
      handler: async () => {
        navigate(Routers.BankCardWebView.name, { url: toUrlParam({ token: await getAuthorization() }) });
      },
    },
    {
      title: "我的客服",
      icon: customerServiceIcon,
      handler: async () => {
        await Linking.openURL(getCustomServiceLinkByEnv());
      },
    },
  ];

  return <View style={stys.layout}>
    {functionList.map((funProp, index) =>
      <View style={{ flex: 1 }} key={index}>
        {renderFunctionItem(funProp)}
      </View>,
    )}
  </View>;
}

const stys = StyleSheet.create({
  layout: {
    height: 300,
    marginHorizontal: 16,
    marginTop: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
  },
});
