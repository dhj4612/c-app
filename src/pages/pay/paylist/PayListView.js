import { StyleSheet, Text, View } from "react-native";
import { formatAmount, formatAmountSymbol, formatDate, multipleSum, xTd } from "../../../utils/tools";
import { PAY_VO_STATE } from "../../../const";
import PeriodItem from "../../../components/PeriodItem";

export default (props) => {
  let { dataList } = props;
  const payStateTagColorMap = [
    {
      codes: [PAY_VO_STATE.PENDING_PAY.code],
      color: "#0082E7",
      bg: "#D3E1F5",
    },
    {
      codes: [...PAY_VO_STATE.PAID.code, PAY_VO_STATE.PAY_IN.code,
        PAY_VO_STATE.COLLECT_COMPLETE.code],
      color: "#fff",
      bg: "#00A604",
    },
    {
      codes: [PAY_VO_STATE.OVERDUE.code, PAY_VO_STATE.DROP.code],
      color: "#fff",
      bg: "#FE0909",
    },
    {
      codes: [PAY_VO_STATE.PENDING_PAY.code, PAY_VO_STATE.FROZEN.code],
      bg: "#D3E1F5",
      color: "#0082E7",
    },
  ];

  const getColorSty = (code) => {
    if (!code && code !== 0) {
      return {};
    }
    const targetColor = payStateTagColorMap.find(item => item.codes.includes(code));
    return targetColor ? {
      color: targetColor.color,
      backgroundColor: targetColor.bg,
    } : {};
  };

  return dataList.map((item, index) => {
      // 学费
      const schollFee = item.amount;
      // 服务费
      const chargeFee = item.chargeBear === 0 ? multipleSum([item.chagreFee, item.corporationChargeFee])
        : item.corporationChargeFee;
      // 滞纳金
      const lateFee = item.payableLateFee ? item.payableLateFee : item.lateFee;
      // 当期总费用
      const totalFee = multipleSum([schollFee, chargeFee, lateFee]);
      return <View key={index} style={stys.layout}>
        <View style={stys.periodLayout}>
          <PeriodItem first={item.monthIndex} second={item.month2Return} />
          <Text style={[stys.payStateTxt, getColorSty(item.state)]}>{PAY_VO_STATE.getNameByCode(item.state)}</Text>
        </View>
        <View style={stys.amountLayout}>
          <Text style={stys.periodAmoutTxt}>{formatAmountSymbol(totalFee)}</Text>
          <Text style={stys.otherFeeTxt}>学费:{formatAmount(schollFee)}</Text>
          <Text style={stys.otherFeeTxt}>服务费:{formatAmount(chargeFee)}</Text>
          {item.lateFee > 0 && <Text style={stys.otherFeeTxt}>滞纳金:{formatAmount(lateFee)}</Text>}
        </View>
        <View style={stys.timeLayout}>
          <Text style={stys.payTimeTxt}>应付时间:{formatDate(new Date(item.deadline), "YYYY-MM-DD HH:mm")}</Text>
          {item.returnDate &&
            <Text
              style={[stys.payTimeTxt, item.lateFee > 0 && { color: "#FE0909" }]}>实付时间:{formatDate(new Date(item.returnDate), "YYYY-MM-DD HH:mm")}</Text>}
        </View>
      </View>;
    },
  );
}

const stys = StyleSheet.create({
  payTimeTxt: {
    fontSize: xTd(11),
    color: "black",
  },
  otherFeeTxt: {
    fontSize: xTd(10),
    marginLeft: xTd(5),
  },
  periodAmoutTxt: {
    fontSize: xTd(23),
    color: "black",
  },
  payStateTxt: {
    padding: xTd(3),
    fontSize: xTd(12),
    marginLeft: xTd(20),
    borderRadius: xTd(2),
  },
  timeLayout: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: xTd(10),
  },
  amountLayout: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingVertical: xTd(15),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
  },
  periodLayout: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  layout: {
    width: "100%",
    padding: xTd(10),
    backgroundColor: "white",
    marginBottom: xTd(10),
    borderRadius: xTd(12),
  },
});

