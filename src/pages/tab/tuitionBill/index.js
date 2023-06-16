import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Tabs from "./Tabs";
import CourseList from "./CourseOrderList";
import { handlerErr } from "../../../utils/request_error_handler";
import Loading from "../../../components/Loading";
import { fetchBillListApi } from "../../../api";
import { ORDER_VO_STATE } from "../../../const";
import { xTd } from "../../../utils/tools";
import { useFocusEffect } from "@react-navigation/native";

export default function TuitionBill() {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] =
    useState([{ title: "支付中的课程", records: 0 }, { title: "办理中的课程", records: 0 }]);
  const [billList, setBillList] = useState([]);
  // 支付中的订单状态
  const payInStates = [ORDER_VO_STATE.GO_PAY.code,
    ORDER_VO_STATE.DROP.code,
    ORDER_VO_STATE.DROP_IN.code,
    ORDER_VO_STATE.PAY_FULL.code,
    ORDER_VO_STATE.OVERDUE.code];
  // 支付中数量统计状态
  const payInNumberStates = [
    ORDER_VO_STATE.GO_PAY.code,
    ORDER_VO_STATE.OVERDUE.code,
  ];
  // 办理中数量统计状态
  const handlerNumberSates = [
    ORDER_VO_STATE.CORP_AUDIT.code,
    ...ORDER_VO_STATE.PENDING_SIGN.code,
    ORDER_VO_STATE.PLATFORM_AUDIT.code,
  ];
  const loadBillData = async () => {
    const result = await fetchBillListApi();
    setBillList(
      result.filter(item => tabIndex === 0 ?
        payInStates.includes(item.state) :
        !payInStates.includes(item.state)),
    );
    return result;
  };
  const refreshTabs = (dataList) => {
    if (!dataList) {
      return;
    }
    const copy = [...tabs];
    copy.forEach((tab, index) => tab.records = dataList
      .filter(item => index === 0 ? payInNumberStates.includes(item.state) :
        handlerNumberSates.includes(item.state)).length);
    setTabs(copy);
  };
  const initData = async () => {
    Loading.show();
    try {
      const dataList = await loadBillData();
      refreshTabs(dataList);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  useFocusEffect(useCallback(() => {
    initData().then();
  }, [tabIndex]));

  return <>
    <Tabs tabs={tabs} tabIndex={tabIndex} tabIndexChange={setTabIndex} />
    <ScrollView style={stys.scrollLayout}
                contentContainerStyle={{
                  paddingBottom: xTd(12),
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
      <CourseList dataList={billList} currentTabIndex={tabIndex} />
    </ScrollView>
  </>;
};

const stys = StyleSheet.create({
  scrollLayout: {
    paddingHorizontal: xTd(12),
  },
});
