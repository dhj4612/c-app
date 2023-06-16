import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import idCardDefaultFaceIcon from "../../../assets/img/mine/IDcard-02.png";
import idCardDefaultBackIcon from "../../../assets/img/mine/IDcard-01.png";
import { useUserStore } from "../../../hooks/useUserStore";
import { xTd } from "../../../utils/tools";
import { ID_TYPE } from "../../../const";

export default (props) => {
  const { faceUploading, backUploading, authMethodModalRef } = props;
  const { userState } = useUserStore();
  const onAuthMethodPress = (idType) => {
    if (idType === ID_TYPE.FACE) {
      if (faceUploading) {
        return;
      }
    } else if (idType === ID_TYPE.BACK) {
      if (backUploading) {
        return;
      }
    }
    authMethodModalRef.current.showModal(idType);
  };
  const getImageSource = (idType) => {
    if (idType === ID_TYPE.FACE) {
      if (userState.realNameInfo.faceUrl) {
        return { uri: userState.realNameInfo.faceUrl };
      }
      return idCardDefaultFaceIcon;
    } else if (idType === ID_TYPE.BACK) {
      if (userState.realNameInfo.backUrl) {
        return { uri: userState.realNameInfo.backUrl };
      }
      return idCardDefaultBackIcon;
    }
  };

  return <View style={stys.contentLayout}>
    <View style={stys.uploadContentLayout}>
      <TouchableOpacity style={stys.uploadItemLayout}
                        activeOpacity={.7}
                        onPress={() => onAuthMethodPress(ID_TYPE.FACE)}>
        {!faceUploading ? <Image style={stys.uploadItemIconLayout}
                                 source={getImageSource(ID_TYPE.FACE)} />
          :
          <ActivityIndicator
            color={"#5A9EEE"}
            animating={true}
            size="small"
          />}
        <Text style={stys.uploadItemTipsTxt}>
          点击上传
          <Text style={stys.tipsTxt}>
            {` 人像面`}
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={stys.interval} />
      <TouchableOpacity style={stys.uploadItemLayout}
                        activeOpacity={.7}
                        onPress={() => onAuthMethodPress(ID_TYPE.BACK)}>
        {!backUploading ? <Image style={stys.uploadItemIconLayout}
                                 source={getImageSource(ID_TYPE.BACK)} />
          :
          <ActivityIndicator
            color={"#5A9EEE"}
            animating={true}
            size="small"
          />}
        <Text style={stys.uploadItemTipsTxt}>
          点击上传
          <Text style={stys.tipsTxt}>
            {` 国徽面`}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  </View>;
}
const stys = StyleSheet.create({
  tipsTxt: {
    color: "#5A9EEE",
  },
  uploadItemTipsTxt: {
    marginTop: xTd(15),
    fontSize: xTd(12),
  },
  uploadItemIconLayout: {
    width: xTd(88),
    height: xTd(56),
    resizeMode: "cover",
  },
  uploadItemLayout: {
    flex: 1,
    paddingVertical: xTd(10),
    backgroundColor: "white",
    borderRadius: xTd(5),
    justifyContent: "center",
    alignItems: "center",
  },
  interval: {
    width: xTd(10),
  },
  uploadContentLayout: {
    paddingVertical: xTd(15),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentLayout: {
    padding: xTd(15),
  },
});
