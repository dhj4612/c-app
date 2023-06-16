import { ScrollView, StyleSheet } from "react-native";

import NavBar from "../../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import HeadContent from "./HeadContent";
import DetailContent from "./DetailContent";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { fetchLoanDetailApi } from "../../../api";
import { handlerErr } from "../../../utils/request_error_handler";

export default function Pay({ route, navigation }) {
  const nav = useNavigation();
  const [detailData, setDetailData] = useState({});
  const initData = async () => {
    Loading.show();
    try {
      const result = await fetchLoanDetailApi({ loanId: route?.params?.id });
      setDetailData({ ...result });
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
    <NavBar title={detailData.corporationName} handler={() => nav.goBack()} />
    <ScrollView style={stys.layout}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>

      <HeadContent detail={detailData} />
      <DetailContent detail={detailData} loanId={route?.params?.id} />
    </ScrollView>
  </>;
};
const stys = StyleSheet.create({
  layout: {
    width: "100%",
    height: "100%",
  },
});

