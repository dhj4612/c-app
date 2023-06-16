import { ScrollView, StyleSheet } from "react-native";
import NavBar from "../../components/NavBar";
import { xTd } from "../../utils/tools";
import BaseInfo from "./BaseInfo";
import PerfectInfo from "./PerfectInfo";
import InformationQueryAuth from "./InformationQueryAuth";
import StartButton from "./StartButton";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../hooks/useUserStore";
import { fetchMineDataApi } from "../../api";
import Loading from "../../components/Loading";

export default function EvaluateScore({ route, navigation }) {
  const [check, setCheck] = useState(false);
  const baseInfoRef = useRef(null);
  const perfectInfoRef = useRef(null);
  const { saveUserInfo } = useUserStore();
  useEffect(() => {
    Loading.show();
    fetchMineDataApi()
      .then(result => {
        Loading.hide();
        saveUserInfo(result);
      })
      .catch(_ => Loading.hide());
  }, []);
  return <>
    <NavBar title={"诚学分评估"} handler={() => navigation.goBack()} />
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: xTd(15) }}>
      <BaseInfo ref={baseInfoRef} />
      <PerfectInfo ref={perfectInfoRef} />
      <InformationQueryAuth check={check} changeCheck={setCheck} />
      <StartButton check={check}
                   baseInfoRef={baseInfoRef}
                   perfectInfoRef={perfectInfoRef}
      />
    </ScrollView>
  </>;
}

const stys = StyleSheet.create({});
