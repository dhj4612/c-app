import { ImageBackground, StyleSheet, Text, View } from "react-native";
import serviceDescBg from "../../../assets/img/home/service-description-bg.png";
import descBg1 from "../../../assets/img/home/description-bg1.png";
import descBg2 from "../../../assets/img/home/description-bg2.png";
import descBg3 from "../../../assets/img/home/description-bg3.png";
import { xTd } from "../../../utils/tools";
import { img_bg_stretch } from "../../../assets/stys/const_stys";

export default (props) => {
  const { corpTotal, userTotal, currentUserNumber } = props;
  const renderTitle = () => {
    const stys = StyleSheet.create({
      layout: {
        flex: 1,
        width: "100%",
      },
      serviceDescTxt: {
        fontWeight: "bold",
        color: "white",
        marginLeft: xTd(25),
        marginTop: xTd(10),
      },
    });
    return <View style={stys.layout}>
      <Text style={stys.serviceDescTxt}>服务说明</Text>
    </View>;
  };

  const renderContent = () => {
    const stys = StyleSheet.create({
      layout: {
        flex: 11,
        width: "100%",
        marginTop: xTd(2),
      },
      bgLayout: {
        flex: .85,
        width: "100%",
        flexDirection: "row",
      },
      leftBgLayout: {
        flex: 1.07,
        paddingLeft: xTd(15),
      },
      leftBg: {
        width: "100%",
        height: "100%",
      },
      rightBgLayout: {
        flex: 1,
        paddingLeft: xTd(5),
        paddingRight: xTd(12),
      },
      rightBg: {
        flex: 1,
        height: "100%",
      },
      leftTxtLayout: {
        paddingHorizontal: xTd(10),
        paddingVertical: xTd(15),
      },
      leftTitleTxt: {
        fontSize: xTd(17),
        height: "35%",
        color: "black",
      },
      leftTitleDescTxt: {
        fontSize: xTd(12),
        height: "35%",
      },
      payModeTxt: {
        fontSize: xTd(11),
        padding: xTd(5),
        backgroundColor: "#2854fd",
        color: "white",
        borderRadius: xTd(12),
        width: "57%",
      },
      rightTextLayout: {
        paddingHorizontal: xTd(10),
        paddingVertical: xTd(15),
      },
    });
    return <View style={stys.layout}>
      <View style={stys.bgLayout}>
        <View style={stys.leftBgLayout}>
          <ImageBackground source={descBg1}
                           style={stys.leftBg}
                           imageStyle={img_bg_stretch}>
            <View style={stys.leftTxtLayout}>
              <Text style={stys.leftTitleTxt}>支持边学边付</Text>
              <Text style={stys.leftTitleDescTxt}>先学后付，结果付</Text>
              <Text style={stys.payModeTxt}>
                新型付费模式
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={stys.rightBgLayout}>
          <ImageBackground source={descBg2}
                           style={stys.rightBg}
                           imageStyle={img_bg_stretch}>
            <View style={stys.rightTextLayout}>
              <Text style={{ color: "#e32a3f", fontSize: xTd(17) }}>培训学习</Text>
              <Text style={{ fontSize: xTd(12) }}>无需全额预付费</Text>
            </View>
          </ImageBackground>
          <ImageBackground source={descBg3}
                           style={stys.rightBg}
                           imageStyle={img_bg_stretch}>
            <View style={stys.rightTextLayout}>
              <Text style={{ color: "#d67d01", fontSize: xTd(17) }}>第三方监管</Text>
              <Text style={{ fontSize: xTd(12) }}>学费支付</Text>
              <Text style={{ fontSize: xTd(12) }}>更有保障</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
      {renderSysMessage()}
    </View>;
  };

  const renderSysMessage = () => {
    const stys = StyleSheet.create({
      layout: {
        flex: 1,
        width: "100%",
      },
      messageTitleLayout: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
      },
      messageTitleTxt: {
        fontSize: xTd(12),
        color: "#999",
      },
      messageContentLayout: {
        flex: 5,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      messageItemLayout: {
        paddingVertical: xTd(5),
        width: "70%",
        backgroundColor: "#f0f5fd",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: xTd(15),
        borderRadius: xTd(12),
      },
      messageItemTxt: {
        color: "#0b2a87",
      },
    });
    return <View style={stys.layout}>
      <View style={stys.messageTitleLayout}>
        <Text style={stys.messageTitleTxt}>系统消息</Text>
      </View>
      <View style={stys.messageContentLayout}>
        <View style={stys.messageItemLayout}><Text
          style={stys.messageItemTxt}>累计入驻教育服务商家{corpTotal || "~"}家</Text></View>
        <View style={stys.messageItemLayout}><Text
          style={stys.messageItemTxt}>累计注册用户数量{userTotal || "~"}位</Text></View>
        <View style={stys.messageItemLayout}><Text
          style={stys.messageItemTxt}>感谢您成为第{currentUserNumber || "~"}位用户</Text></View>
      </View>
    </View>;
  }

  return <ImageBackground style={stys.layout}
                          imageStyle={img_bg_stretch}
                          source={serviceDescBg}>
    {renderTitle()}
    {renderContent()}
  </ImageBackground>;
}
const stys = StyleSheet.create({
  layout: {
    width: "100%",
    height: xTd(450),
    flexDirection: "column",
    marginTop: xTd(10),
  },
});
