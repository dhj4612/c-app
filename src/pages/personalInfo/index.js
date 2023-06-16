import { ScrollView, StyleSheet } from "react-native";
import NavBar from "../../components/NavBar";
import { xTd } from "../../utils/tools";
import BaseInfo from "./BaseInfo";
import PerfectInfo from "./PerfectInfo";
import StartButton from "./SubmitAuditButton";
import { useEffect, useRef, useState } from "react";
import { handlerErr } from "../../utils/request_error_handler";
import Loading from "../../components/Loading";
import { fetchPersonalInfoApi } from "../../api";

export default function PersonalInfo({ route, navigation }) {
  const baseInfoRef = useRef(null);
  const perfectInfoRef = useRef(null);
  const [personalInfo, setPersonalInfo] = useState({});

  const initData = async () => {
    try {
      Loading.show();
      const result = await fetchPersonalInfoApi();
      setPersonalInfo(result);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };
  useEffect(() => {
    initData().catch(() => undefined);
  }, []);

  return <>
    <NavBar title={"个人信息"} handler={() => navigation.goBack()} />
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: xTd(15) }}>
      <BaseInfo ref={baseInfoRef}
                personalInfo={personalInfo} />
      <PerfectInfo ref={perfectInfoRef}
                   personalInfo={personalInfo} />
      <StartButton baseInfoRef={baseInfoRef}
                   perfectInfoRef={perfectInfoRef}
      />
    </ScrollView>
  </>;
}

const stys = StyleSheet.create({});
