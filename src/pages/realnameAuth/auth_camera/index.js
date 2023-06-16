import React, { useRef } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, ImageType } from "expo-camera";
import Loading from "../../../components/Loading";
import idCardFace from "../../../assets/img/mine/idCardFace.png";
import idCardBack from "../../../assets/img/mine/idCardBack.png";
import { center_layout } from "../../../assets/stys/const_stys";
import { ID_TYPE } from "../../../const";
import { navigate, Routers } from "../../../navigation";
import { xTd } from "../../../utils/tools";
import { uploadRealNameImgApi } from "../../../api";
import { handlerErr } from "../../../utils/request_error_handler";
import { useUserStore } from "../../../hooks/useUserStore";
import { createFileAndCompress, handlerUploadResult } from "../helper";

export default function AuthenticationCamera({ route, navigation }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { saveRealNameInfo, userState } = useUserStore();
  if (!permission) {
    return <View style={[styles.container, center_layout]}>
      <ActivityIndicator
        color={"#fff"}
        animating={true}
        size="small"
      />
    </View>;
  }

  if (!permission.granted) {
    // 未授权
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>尚未授予相机权限</Text>
        <Button onPress={requestPermission} title="点击授权" />
      </View>
    );
  }

  const onTakePicture = async () => {
    try {
      Loading.show("识别中...");
      const { uri } = await cameraRef.current.takePictureAsync({
        base64: false,
        imageType: ImageType.jpg,
        exif: true,
        skipProcessing: true,
        quality: 1,
      });
      const file = await createFileAndCompress({ uri });
      const result = await uploadRealNameImgApi(file);
      handlerUploadResult(result, route.params.idType, saveRealNameInfo, userState.realNameInfo);
      navigate(Routers.Authentication.name);
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  const getMaskImg = () => {
    return route.params.idType === ID_TYPE.FACE ? idCardFace : idCardBack;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headLayout} />
      <Camera style={styles.cameraLayout}
              ref={cameraRef}
              autoFocus={true}>
        <Image source={getMaskImg()}
               style={styles.maskImg} />
      </Camera>
      <View style={styles.bottomLayout}>
        <TouchableOpacity
          style={styles.takePictureBtnLayout}
          onPress={onTakePicture}>
          <View style={styles.takePictureBtnInnerLayout}>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  takePictureBtnInnerLayout: {
    width: "100%",
    height: "100%",
    borderRadius: xTd(20),
    backgroundColor: "#D0D0D0",
  },
  takePictureBtnLayout: {
    width: xTd(60),
    height: xTd(60),
    borderRadius: xTd(30),
    padding: xTd(10),
    backgroundColor: "white",
  },
  bottomLayout: {
    width: "100%",
    flex: .2,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  maskImg: {
    width: "100%",
    height: xTd(200),
    resizeMode: "stretch",
    transform: [{ scale: 1.3 }],
  },
  headLayout: {
    width: "100%",
    flex: .2,
    backgroundColor: "black",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  cameraLayout: {
    width: "100%",
    flex: .6,
    alignItems: "center",
    justifyContent: "center",
  },
});
