import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatAmountSymbol, toUrlParam, xTd } from "../../../utils/tools";
import ArrowIcon from "../../../components/ArrowIcon";
import { handlerErr } from "../../../utils/request_error_handler";
import { fetchAgreemnetApi } from "../../../api";
import Loading from "../../../components/Loading";
import { navigate, Routers } from "../../../navigation";
import { useNavigation } from "@react-navigation/native";
import { getAuthorization } from "../../../utils/user";

export default (props) => {
  const { detail, loanId } = props;
  const nav = useNavigation();
  const showAgreement = async () => {
    Loading.show();
    try {
      const result = await fetchAgreemnetApi({ loanId });
      await Linking.openURL(result.toString());
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };
  const renderButton = () => {
    const stys = StyleSheet.create({
      layout: {
        paddingHorizontal: xTd(16),
        marginTop: xTd(35),
      },
      goPayBtn: {
        width: "100%",
        height: xTd(45),
        backgroundColor: "rgb(211,225,245)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: xTd(12),
      },
      goPayTxt: {
        fontSize: 16,
        color: "#0082E7",
      },
    });
    return <View style={stys.layout}>
      <TouchableOpacity style={stys.goPayBtn}
                        onPress={async () => {
                          const token = await getAuthorization();
                          navigate(Routers.PayDetailWebView.name, { url: toUrlParam({ id: loanId, token }) });
                        }}>
        <Text style={stys.goPayTxt}>去支付</Text>
      </TouchableOpacity>
    </View>;
  };
  return <View style={stys.layout}>
    <View style={stys.innerLayout}>
      <Text style={stys.title1Txt}>支付明细</Text>
      <View style={stys.infoItemLayout}>
        <Text style={stys.infoTxt}>课程名称</Text>
        <Text style={stys.infoTxt}>{detail.curriculumName}</Text>
      </View>
      <View style={stys.infoItemLayout}>
        <Text style={stys.infoTxt}>学费</Text>
        <Text style={stys.infoTxt}>{formatAmountSymbol(detail.amount)}</Text>
      </View>
      <View style={stys.infoItemLayout}>
        <Text style={stys.infoTxt}>服务费</Text>
        <Text style={stys.infoTxt}>{formatAmountSymbol(detail.chargeFee)}</Text>
      </View>
      <View style={[stys.infoItemLayout, { borderBottomWidth: 0 }, { paddingBottom: 0 }]}>
        <Text style={stys.infoTxt}>合同期限</Text>
        <Text style={stys.infoTxt}>{detail.term}</Text>
      </View>
    </View>

    <View style={stys.innerLayout}>
      <Text style={stys.title1Txt}>已支付明细</Text>
      <View style={stys.infoItemLayout}>
        <Text style={stys.infoTxt}>已支付学费</Text>
        <Text style={stys.infoTxt}>{formatAmountSymbol(detail.paidAmount)}</Text>
      </View>
      <View style={stys.infoItemLayout}>
        <Text style={stys.infoTxt}>已支付服务费</Text>
        <Text style={stys.infoTxt}>{formatAmountSymbol(detail.paidChargeFee)}</Text>
      </View>
      <View style={[stys.infoItemLayout, { borderBottomWidth: 0 }, { paddingBottom: 0 }]}>
        <Text style={stys.infoTxt}>支付记录</Text>
        <TouchableOpacity style={stys.showDetailLayout}
                          onPress={() => navigate(Routers.PayList.name, { id: loanId })}>
          <Text style={[stys.infoTxt, { color: "#0082E7" }]}>
            查看详情
          </Text>
          <ArrowIcon color={"#0082E7"} />
        </TouchableOpacity>
      </View>
    </View>

    <View style={stys.innerLayout}>
      <Text style={stys.title1Txt}>相关协议查看</Text>
      <View style={[stys.infoItemLayout, { borderBottomWidth: 0 }, { paddingBottom: 0 }]}>
        <Text style={stys.infoTxt}>培训学费支付协议</Text>
        <TouchableOpacity style={stys.showDetailLayout}
                          onPress={() => showAgreement().then()}>
          <Text style={[stys.infoTxt, { color: "#0082E7" }]}>
            查看详情
          </Text>
          <ArrowIcon color={"#0082E7"} />
        </TouchableOpacity>
      </View>
    </View>
    {!detail.paidUp && renderButton()}
  </View>;
}

const stys = StyleSheet.create({
  showDetailLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTxt: {
    fontSize: xTd(12),
  },
  infoItemLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
    paddingVertical: xTd(10),
  },
  title1Txt: {
    fontWeight: "bold",
    color: "black",
  },
  innerLayout: {
    width: "100%",
    borderRadius: xTd(12),
    backgroundColor: "white",
    padding: xTd(10),
    marginTop: xTd(10),
  },
  layout: {
    width: "100%",
    marginTop: xTd(-80),
    paddingHorizontal: xTd(16),
    paddingVertical: xTd(16),
  },
});
