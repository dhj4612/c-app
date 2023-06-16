import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import scoreBg from "../../../assets/img/home/source-bg.png";
import messageIcon from "../../../assets/img/home/message-icon.png";
import LinearGradient from "react-native-linear-gradient";
import { navigate, navigateWebViewLoadAuthorization, Routers } from "../../../navigation";
import { getAuthorization } from "../../../utils/user";
import { toUrlParam, xTd } from "../../../utils/tools";
import { img_bg_stretch } from "../../../assets/stys/const_stys";
import scannerCodeIcon from "../../..//assets/img/home/scanner-code.png";
import { useUserStore } from "../../../hooks/useUserStore";

export default (props) => {
  const { score, assess } = props;
  const { saveUserInfo } = useUserStore();
  const renderHead = () => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: xTd(20),
        paddingVertical: xTd(16),
        alignItems: "flex-start",
        flex: .94,
      },
      primartyTxt: {
        fontSize: xTd(16),
        fontWeight: "bold",
        color: "black",
      },
      secondyTxt: {
        marginTop: xTd(3),
        fontSize: xTd(12),
        color: "#2f3c67",
      },
      messageIconLayout: {
        justifyContent: "center",
        alignItems: "center",
      },
      scannerCodeIconLayout: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: xTd(10),
      },
      scannerCodeIcon: {
        width: xTd(22.5),
        height: xTd(22.5),
        resizeMode: "cover",
        tintColor: "rgb(66,144,203)",
      },
      messageIcon: {
        width: xTd(22.5),
        height: xTd(22.5),
        resizeMode: "cover",
      },
    });

    return <View style={stys.layout}>
      <View>
        <Text style={stys.primartyTxt}>诚学信付</Text>
        <Text style={stys.secondyTxt}>让教育因诚信而更美好</Text>
      </View>
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <TouchableOpacity style={stys.messageIconLayout}
                          onPress={async () => {
                            const token = await getAuthorization();
                            navigate(Routers.MessageWebView.name, { url: toUrlParam({ token }) });
                          }}
                          activeOpacity={0.6}>
          <Image style={stys.messageIcon} source={messageIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={stys.scannerCodeIconLayout}
                          onPress={async () => {
                            const token = await getAuthorization();
                            navigate(Routers.CodeScanner.name, { url: toUrlParam({ token }) });
                          }}
                          activeOpacity={0.6}>
          <Image style={stys.scannerCodeIcon} source={scannerCodeIcon} />
        </TouchableOpacity>
      </View>
    </View>;
  };

  const renderContent = () => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 3,
      },
      titleViewLayout: {
        flex: 1.2,
        width: "100%",
        paddingHorizontal: xTd(30),
        paddingVertical: xTd(5),
      },
      titleViewTxtLayout: {
        flexDirection: "row",
        alignItems: "center",
      },
      scoreViewLayout: {
        flex: 3,
        width: "100%",
        alignItems: "center",
      },
      scoreTitleTxt: {
        fontWeight: "bold",
        fontSize: xTd(17),
        color: "white",
      },
      scoreTitleDescTxt: {
        fontSize: xTd(12),
        marginLeft: xTd(3),
        color: "white",
      },
      scoreDescTxt: {
        fontSize: xTd(12),
        color: "#2854fd",
      },
      scoreTxt: {
        color: "#2854fd",
        fontSize: xTd(25),
        fontWeight: "bold",
      },
      descLayout: {
        width: "100%",
        flex: 1,
      },
      showScoreViewLayout: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      showScoreLinearGradientLayout: {
        width: "75%",
        borderRadius: xTd(12),
        height: xTd(50),
      },
      showScoreButtonLayout: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      showScoreButtonTxt: {
        color: "#673500",
        fontSize: xTd(16),
      },
      descViewLayout: {
        flex: 1.2,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      descTxt: {
        fontSize: xTd(10),
        color: "#888",
      },
    });

    const getBtnTxt = () => {
      switch (assess) {
        case 0:
          return "获取我的诚学分";
        case 1:
          return "查看诚学分详情";
        default:
          return "";
      }
    };

    const handlerScoreBtnOnPress = async () => {
      let routeName;
      if (assess === 0) {
        routeName = Routers.EvaluateScore.name;
      } else if (assess === 1) {
        routeName = Routers.SourceHistoryWebView.name;
      }
      navigateWebViewLoadAuthorization(routeName);
    };

    return <View style={stys.layout}>
      <View style={stys.titleViewLayout}>
        <View style={stys.titleViewTxtLayout}>
          <Text style={stys.scoreTitleTxt}>诚学分</Text>
          <Text style={stys.scoreTitleDescTxt}>满500可享先学后付</Text>
        </View>
      </View>
      <View style={stys.scoreViewLayout}>
        <Text style={stys.scoreDescTxt}>当前诚学分</Text>
        <Text style={stys.scoreTxt}>{score || "未评测"}</Text>
        <View style={stys.descLayout}>
          <View style={stys.descViewLayout}>
            <Text style={stys.descTxt}>告别培训预付费，告别学费贷款</Text>
          </View>
          <View style={stys.showScoreViewLayout}>
            <LinearGradient style={stys.showScoreLinearGradientLayout} colors={["#ffe886", "#ff8100"]}>
              <TouchableOpacity
                style={stys.showScoreButtonLayout}
                onPress={() => handlerScoreBtnOnPress()}
                activeOpacity={0.6}>
                <Text style={stys.showScoreButtonTxt}>{getBtnTxt()}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  };

  return <ImageBackground style={stys.layout}
                          imageStyle={img_bg_stretch}
                          source={scoreBg}>
    {renderHead()}
    {renderContent()}
  </ImageBackground>;
}

const stys = StyleSheet.create({
  layout: {
    width: "100%",
    height: xTd(450), // 在 ScrollView 中, 元素的高度需要指定一个确定值
    flexDirection: "column",
  },
});
