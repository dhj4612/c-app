import NavBar from "../../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Tabs from "../../../components/Tabs";
import PayRecordList from "./PayRecordList";

export default function PayRecords(props) {
  const nav = useNavigation();
  const tabs = [
    { title: "全部", code: -1 },
    { title: "待支付", code: 0 },
    { title: "已支付", code: 2 },
    { title: "已过期", code: 3 },
    { title: "已取消", code: 4 }];
  const [tabIndex, setTabIndex] = useState(-1);
  return <>
    <NavBar title={"支付记录"} handler={() => nav.goBack()} />
    <Tabs
      tabs={tabs}
      currentTabIndex={tabIndex}
      changeTabIndex={setTabIndex}>
    </Tabs>
    <PayRecordList state={tabIndex} />
  </>;
};
