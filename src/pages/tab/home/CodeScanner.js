import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import scannerCodeBg from "../../../assets/img/home/scanner-code-bg.png";
import Loading from "../../../components/Loading";
import { toastMessage, urlParamsParse } from "../../../utils/tools";
import { handlerErr } from "../../../utils/request_error_handler";
import { bindCorporationApi } from "../../../api";
import { useNavigation } from "@react-navigation/native";
import { goBack, replace, Routers } from "../../../navigation";
import NavBar from "../../../components/NavBar";
import { URL_REG } from "../../../const/reg_const";

export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const nav = useNavigation();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions().then();
  }, []);
  const handleBarCodeScanned = async ({ type, data }) => {
    Loading.show();
    try {
      setScanned(true);
      if (!URL_REG.test(data)) {
        toastMessage("请扫描课程办理码切换机构");
        return;
      }
      const { inviter } = urlParamsParse(data);
      if (!inviter) {
        toastMessage("请扫描课程办理码切换机构");
        return;
      }
      await bindCorporationApi({ inviter });
      toastMessage("机构切换成功");
      replace(Routers.MainTab.name);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };
  if (hasPermission === null) {
    return <Text>加载相机权限...</Text>;
  }
  if (hasPermission === false) {
    return <Text>无法访问摄像头</Text>;
  }
  return <>
    <NavBar title={"扫描机构码"} handler={() => goBack()} />
    <View style={stys.layout}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject]}>
        <Image source={scannerCodeBg} style={{
          width: "100%",
          height: "100%",
          resizeMode: "stretch",
        }} />
      </BarCodeScanner>
    </View>
  </>;
}
const stys = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "black",
  },
});
