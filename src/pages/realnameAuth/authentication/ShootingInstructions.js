import { Image, StyleSheet, Text, View } from "react-native";
import idCardSuccessIcon from "../../../assets/img/mine/IDcard-success.png";
import idCardErrO1Icon from "../../../assets/img/mine/IDcard-error01.png";
import idCardErrO2Icon from "../../../assets/img/mine/IDcard-error-02.png";
import idCardErrO3Icon from "../../../assets/img/mine/IDcard-error03.png";
import idCardTipsIcon from "../../../assets/img/mine/IDcard-tips.png";
import idCardOkIcon from "../../../assets/img/mine/IDcard-OK.png";
import idCardFailIcon from "../../../assets/img/mine/IDcard-cancel.png";
import { img_bg_cover } from "../../../assets/stys/const_stys";
import { xTd } from "../../../utils/tools";

export default () => {
  return <>
    <Text style={stys.titleTxt}>拍摄须知</Text>
    <View style={stys.contentLayout}>
      <View style={stys.contentItemLayout}>
        <View style={stys.contentItem}>
          <Image style={img_bg_cover} source={idCardSuccessIcon} />
        </View>
        <View style={stys.imageTipsLayout}>
          <Image style={stys.idCardTipsIcon} source={idCardOkIcon} />
          <Text style={stys.idCardTipsTxt}>标准拍摄</Text>
        </View>
      </View>
      <View style={stys.interval} />

      <View style={stys.contentItemLayout}>
        <View style={stys.contentItem}>
          <Image style={img_bg_cover} source={idCardErrO1Icon} />
        </View>
        <View style={stys.imageTipsLayout}>
          <Image style={stys.idCardTipsIcon} source={idCardFailIcon} />
          <Text style={stys.idCardTipsTxt}>拍摄不全</Text>
        </View>
      </View>
      <View style={stys.interval} />

      <View style={stys.contentItemLayout}>
        <View style={stys.contentItem}>
          <Image style={img_bg_cover} source={idCardErrO2Icon} />
        </View>
        <View style={stys.imageTipsLayout}>
          <Image style={stys.idCardTipsIcon} source={idCardFailIcon} />
          <Text style={stys.idCardTipsTxt}>拍摄模糊</Text>
        </View>
      </View>
      <View style={stys.interval} />

      <View style={stys.contentItemLayout}>
        <View style={stys.contentItem}>
          <Image style={img_bg_cover} source={idCardErrO3Icon} />
        </View>
        <View style={stys.imageTipsLayout}>
          <Image style={stys.idCardTipsIcon} source={idCardFailIcon} />
          <Text style={stys.idCardTipsTxt}>闪光过渡</Text>
        </View>
      </View>
    </View>
    <View style={stys.tipsDescLayout}>
      <Image style={stys.tipDescIcon} source={idCardTipsIcon} />
      <Text style={stys.tipsDescTxt}>临时身份证、有效期小于30天的身份证无效</Text>
    </View>
  </>;
}
const stys = StyleSheet.create({
  tipsDescTxt: {
    marginLeft: xTd(5),
    color: "#0082E7",
  },
  tipDescIcon: {
    width: xTd(15),
    height: xTd(15),
    resizeMode: "stretch",
  },
  tipsDescLayout: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: xTd(25),
  },
  idCardTipsTxt: {
    fontSize: xTd(13),
    marginLeft: xTd(5),
  },
  idCardTipsIcon: {
    width: xTd(15),
    height: xTd(15),
    resizeMode: "stretch",
  },
  imageTipsLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: xTd(5),
  },
  interval: {
    flex: .1,
  },
  contentItem: {
    backgroundColor: "white",
    width: "100%",
    height: xTd(55),
    padding: xTd(5),
    borderRadius: xTd(5),
    justifyContent: "center",
    alignItems: "center",
  },
  contentItemLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentLayout: {
    flexDirection: "row",
    marginTop: xTd(15),
    paddingHorizontal: xTd(15),
  },
  titleTxt: {
    fontSize: xTd(17),
    marginTop: xTd(15),
    color: "black",
    marginLeft: xTd(15),
  },
});
