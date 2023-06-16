import { ScrollView, StyleSheet } from "react-native";
import CorpView from "./CorpView";
import ScoreView from "./ScoreView";
import ServiceDescView from "./ServiceDescView";
import { useCallback, useRef, useState } from "react";
import { fetchHomeDataApi } from "../../../api";
import { handlerErr } from "../../../utils/request_error_handler";
import { xTd } from "../../../utils/tools";
import { useUserStore } from "../../../hooks/useUserStore";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../../components/Loading";
import GetScoreModal from "./modal/GetScoreModal";

export default function Home() {
  const [homeData, setHomeData] = useState({});
  const { userState, saveScore, saveHomeData } = useUserStore();
  const getScoreModalRef = useRef(null);
  const initHomeData = async () => {
    Loading.show();
    try {
      const result = await fetchHomeDataApi();
      saveScore(result.total || "未评测");
      setHomeData(result);
      saveHomeData(result);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };
  useFocusEffect(useCallback(() => {
    initHomeData().catch(_ => undefined);
  }, []));

  return <>
    <ScrollView style={stys.layout}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={stys.containerLayout}>
      <ScoreView assess={homeData.assess} score={homeData.total} />
      <ServiceDescView corpTotal={userState.homeData.corporationTotal}
                       userTotal={userState.homeData.userTotal}
                       currentUserNumber={userState.homeData.currentUserNum} />
    </ScrollView>
    <CorpView corpName={userState.homeData.corporationName}
              corporatioId={userState.homeData.corporatioId}
              getScoreModalRef={getScoreModalRef}
    />
    <GetScoreModal ref={getScoreModalRef} />
  </>;
};

const stys = StyleSheet.create({
  layout: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#e7f3fd",
  },
  containerLayout: {
    paddingBottom: xTd(5),
  },
  interval: {
    width: "100%",
    height: xTd(10),
  },
});
