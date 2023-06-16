import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import payingDetailTagBg from "../../../assets/img/pay/paying-detail-tag.png";
import goPayBg from "../../../assets/img/pay/goPay-bg.png";
import CheckBox from "@react-native-community/checkbox";
import PeriodItem from "../../../components/PeriodItem";
import ArrowIcon from "../../../components/ArrowIcon";
import { forwardRef, useImperativeHandle, useState } from "react";
import { formatAmount, formatAmountSymbol, formatDate, multipleSum, xTd } from "../../../utils/tools";
import { useNavigation } from "@react-navigation/native";
import { navigate, Routers } from "../../../navigation";
import { img_bg_stretch } from "../../../assets/stys/const_stys";

export default forwardRef((props, ref) => {
  const { id, dataInfo, listData } = props;
  const nav = useNavigation();
  const [checks, setChecks] = useState({});
  let disableCurrent = undefined;
  const initChecks = () => {
    const temp = {};
    listData.forEach(item => temp[item.id] = false);
    return temp;
  };

  const computedAmount = (item) => {
    const schoolFee = item.amount;
    const chargeFee = item.chargeBear === 0 ? multipleSum([item.chagreFee, item.corporationChargeFee])
      : item.corporationChargeFee;
    const lateFee = item.actualLateFee;
    let totalFee = multipleSum([item.amount, chargeFee, lateFee]);

    return {
      schoolFee, // 学费
      chargeFee, // 服务费
      lateFee, // 滞纳金
      totalFee, // 总费用
    };
  };

  const checkDisable = (key) => {
    const item = listData.find(item => item.id === key);
    if (!item) {
      return;
    }
    if (computedAmount(item).totalFee === 0) {
      disableCurrent = item.deadline;
    }
    return disableCurrent && item.deadline >= disableCurrent;
  };

  const onCheckBoxChange = (val, key) => {
    if (checkDisable(key)) {
      return;
    }
    let copy = { ...checks };
    if (Object.keys(copy).length === 0) {
      copy = { ...initChecks() };
    }
    const keys = Object.keys(copy);
    if (val) {
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        copy[k] = val;
        if (k === `${key}`) {
          break;
        }
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (k === `${key}`) {
          for (let j = i; j < keys.length; j++) {
            copy[keys[j]] = false;
          }
        }
      }
    }
    setChecks(copy);
  };

  useImperativeHandle(ref, () => {
    return {
      getChecks: () => checks,
    };
  });

  return <>
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigate(Routers.PayList.name, { id: id });
      }}>
      <ImageBackground
        style={stys.headLayout}
        source={goPayBg}
        imageStyle={img_bg_stretch}>
        <Text style={stys.schoolFeeTitleTxt}>剩余支付学费(元)</Text>
        <View style={stys.amountLayout}>
          <Text style={stys.schoolFeeTxt}>{formatAmountSymbol(dataInfo.surplusAmount)}</Text>
          <ArrowIcon size={xTd(25)} color={"rgb(200, 218, 255)"} />
        </View>
        <ImageBackground source={payingDetailTagBg}
                         style={stys.payingDetailTagBgLayout}
                         imageStyle={img_bg_stretch}>
          <Text style={stys.payingDetailTxt}>请最晚在支付日当天12点前主动支付</Text>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>

    <View style={stys.listDataLayout}>
      {listData.map((item, index) => {
        const { schoolFee, chargeFee, lateFee, totalFee } = computedAmount(item);
        return <TouchableOpacity key={index}
                                 style={stys.listDataItemLayout}
                                 activeOpacity={1}
                                 onPress={() => onCheckBoxChange(!checks[item.id], item.id)}>
          <View style={stys.listItemTitleLayout}>
            <PeriodItem first={item.monthIndex} second={item.month2Return} />
            <Text style={stys.payTimeTxt}>应付时间：{formatDate(new Date(item.deadline), "YYYY-MM-DD HH:mm")}</Text>
          </View>
          <View style={stys.listItemContentLayout}>
            <View style={stys.contentLeftLayout}>
              <View style={{ flexDirection: "row" }}>
                <Text style={stys.amountTxt}>{formatAmountSymbol(totalFee)}</Text>
                {item.doneDayCount < 0 && <Text style={stys.overdueTxt}>已逾期{Math.abs(item.doneDayCount)}天</Text>}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", paddingTop: xTd(10) }}>
                <Text style={stys.amountDescTxt}>学费：{formatAmount(schoolFee)}</Text>
                <Text style={[stys.amountDescTxt, { marginLeft: xTd(5) }]}>服务费：{formatAmount(chargeFee)}</Text>
                {lateFee > 0 && <Text style={[stys.amountDescTxt, {
                  marginLeft: xTd(5), color: "#fe0909",
                }]}>滞纳金：{formatAmount(lateFee)}</Text>}
              </View>
            </View>
            <View style={stys.contentRightLayout}>
              <CheckBox
                boxType={"circle"}
                tintColor={"#5f93ef"}
                tintColors={{
                  true: "#5f93ef", false: "#5f93ef",
                }}
                value={checks[item.id]}
                onValueChange={val => onCheckBoxChange(val, item.id)}
              />
            </View>
          </View>
        </TouchableOpacity>;
      })}
    </View>
  </>;
});

const stys = StyleSheet.create({
  amountDescTxt: {
    fontSize: xTd(12),
  },
  overdueTxt: {
    marginLeft: xTd(10),
    padding: xTd(2),
    height: xTd(22),
    borderRadius: xTd(5),
    fontWeight: "bold",
    fontSize: xTd(12),
    backgroundColor: "#f5e9e9",
    color: "red",
  },
  amountTxt: {
    fontSize: xTd(22),
    // fontWeight: "bold",
    color: "black",
  },
  contentRightLayout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentLeftLayout: {
    flex: 5,
    paddingTop: xTd(12),
  },
  payTimeTxt: {
    fontSize: xTd(12),
    color: "#0082e7",
  },
  listItemContentLayout: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
  },
  listItemTitleLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  listDataItemLayout: {
    width: "100%",
    backgroundColor: "white",
    padding: xTd(10),
    borderRadius: xTd(12),
    marginTop: xTd(16),
  },
  listDataLayout: {
    paddingHorizontal: xTd(16),
  },
  payingDetailTxt: {
    fontSize: xTd(12),
    color: "#C8DAFF",
  },
  payingDetailTagBgLayout: {
    width: xTd(254),
    height: xTd(30),
    marginTop: xTd(5),
    alignItems: "center",
    justifyContent: "center",
  },
  schoolFeeTxt: {
    fontSize: xTd(26),
    color: "white",
  },
  schoolFeeTitleTxt: {
    fontSize: xTd(15),
    marginTop: xTd(43),
    color: "#C8DAFF",
  },
  amountLayout: {
    width: "100%",
    flexDirection: "row",
    marginTop: xTd(10),
    alignItems: "center",
    justifyContent: "center",
  },
  headLayout: {
    width: "100%",
    height: xTd(180),
    alignItems: "center",
  },
});

