import { ScrollView, StyleSheet } from "react-native";
import Loading from "../../../components/Loading";
import NavBar from "../../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import Buttons from "./Buttons";
import { useEffect, useRef, useState } from "react";
import { handlerErr } from "../../../utils/request_error_handler";
import { xTd } from "../../../utils/tools";
import { fetchPayableListApi } from "../../../api";
import DetailList from "./DetailList";

export default ({ route, navigation }) => {
  const nav = useNavigation();
  const { id } = route?.params;
  const listRef = useRef(null);
  const [dataInfo, setDataInfo] = useState({});
  const [listData, setListData] = useState([]);
  const initData = async () => {
    Loading.show();
    try {
      const {
        corporationName,
        discountIcon,
        isLast,
        isOverdue,
        list,
        surplusAmount,
      } = await fetchPayableListApi({ loanId: id });
      // console.log(list)
      setDataInfo({
        corporationName,
        discountIcon,
        isOverdue,
        isLast,
        surplusAmount,
      });
      setListData(list);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };
  useEffect(() => {
    initData().then();
  }, []);

  const getChecks = () => {
    return listRef.current.getChecks();
  };

  return <>
    <NavBar title={dataInfo.corporationName} handler={() => nav.goBack()} />
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={stys.contentLayout}>
      <DetailList id={id} dataInfo={dataInfo} listData={listData} ref={listRef} />
    </ScrollView>
    <Buttons dataInfo={dataInfo} getChecks={getChecks} />
  </>;
}
const stys = StyleSheet.create({
  contentLayout: {
    paddingBottom: xTd(16),
  },
});
