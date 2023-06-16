import { ScrollView, StyleSheet } from "react-native";
import NavBar from "../../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import PayListView from "./PayListView";
import { xTd } from "../../../utils/tools";
import { useEffect, useState } from "react";
import { handlerErr } from "../../../utils/request_error_handler";
import Loading from "../../../components/Loading";
import { fetchPayListApi } from "../../../api";

export default function PayList({ route, navigation }) {
  const nav = useNavigation();
  const { id } = route?.params;
  const [listData, setListData] = useState([]);
  const [corpName, setCorpName] = useState("");
  const initData = async () => {
    Loading.show();
    try {
      const { corporationName, list } = await fetchPayListApi({ loanId: id });
      setCorpName(corporationName);
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

  return <>
    <NavBar title={corpName} handler={() => nav.goBack()} />
    <ScrollView contentContainerStyle={stys.contentLayout}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
      <PayListView dataList={listData} />
    </ScrollView>
  </>;
};

const stys = StyleSheet.create({
  contentLayout: {
    padding: xTd(10),
    paddingBottom: 0,
  },
});
