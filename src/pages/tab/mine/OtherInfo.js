import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import toRiseScoreBg from "../../../assets/img/mine/goToPromoteSource.png";
import surceNumberBg from "../../../assets/img/mine/source-number.png";
import userAuthOkIcon from "../../../assets/img/mine/source-authentication.png";
import userAuthErrIcon from "../../../assets/img/mine/source-authentication-err.png";
import { USER_AUTH_STATE } from "../../../const";
import { img_bg_cover, img_bg_stretch } from "../../../assets/stys/const_stys";
import { navigate, Routers } from "../../../navigation";

export default (props) => {
  const { score, realNameState } = props;
  const isAuthState = (state) => {
    return [USER_AUTH_STATE.PENDING.code, USER_AUTH_STATE.AUTH.code].includes(state);
  };
  const getAuthStateImg = (state) => {
    return isAuthState(state) ? userAuthOkIcon : userAuthErrIcon;
  };
  const stys = StyleSheet.create({
    layout: {
      width: "100%",
      paddingHorizontal: 16,
      flexDirection: "row",
      marginTop: 35,
    },
    leftLayout: {
      flex: 0.7,
      height: 121,
      backgroundColor: "white",
      flexDirection: "row",
      borderRadius: 12,
      paddingHorizontal: 5,
    },
    leftInnerLeftLayout: {
      flex: 0.4,
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    leftInnerRightLayout: {
      flex: 0.65,
      justifyContent: "center",
      alignItems: "center",
      marginRight: -7,
    },
    leftInnerLeftBgLayout: {
      width: "100%",
      height: 35,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    scoreTxt: {
      color: "black",
      fontSize: 14,
    },
    scoreDescTxt: {
      fontSize: 9,
      color: "#2854fd",
    },
    scoreNumberTxt: {
      fontSize: 13,
      // fontWeight: "bold",
      color: "#2854fd",
    },
    toRiseScoreTxt: {
      color: "white",
      marginTop: 5,
      fontSize: 12,
    },
    intervalLayout: {
      flex: 0.03,
    },
    rightLayout: {
      flex: 0.4,
      backgroundColor: "white",
      height: 121,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
    },
    userAuthIcon: {
      width: "60%",
      height: "30%",
      resizeMode: "cover",
    },
    userAuthTxt: {
      fontSize: 15,
      color: isAuthState(props.realNameState) ? "#35c492" : "#FF7E00",
      marginTop: 15,
    },
  });

  return <View style={stys.layout}>
    <View style={stys.leftLayout}>
      <View style={stys.leftInnerLeftLayout}>
        <Text style={stys.scoreTxt}>我的诚学分</Text>
        <ImageBackground style={stys.leftInnerLeftBgLayout}
                         source={toRiseScoreBg}
                         imageStyle={img_bg_stretch}>
          <Text style={stys.toRiseScoreTxt}>去涨分</Text>
        </ImageBackground>
      </View>
      <ImageBackground style={stys.leftInnerRightLayout}
                       source={surceNumberBg}
                       imageStyle={[img_bg_cover]}>
        <Text style={stys.scoreDescTxt}>诚学分</Text>
        <Text style={stys.scoreNumberTxt}>{score}</Text>
      </ImageBackground>
    </View>
    <View style={stys.intervalLayout}></View>
    <TouchableOpacity style={stys.rightLayout}
                      activeOpacity={6}
                      onPress={() => {
                        let routeName = "";
                        if (realNameState === USER_AUTH_STATE.AUTH.code) {
                          routeName = Routers.Certified.name;
                        } else if ([null, USER_AUTH_STATE.AUTH_FAIL.code,
                          USER_AUTH_STATE.INVALID.code].includes(realNameState)) {
                          routeName = Routers.Authentication.name;
                        } else {
                          return;
                        }
                        navigate(routeName);
                      }}>
      <Image style={stys.userAuthIcon} source={getAuthStateImg(realNameState)} />
      <Text
        style={stys.userAuthTxt}>{realNameState !== 0 && !realNameState ? "未认证" :
        USER_AUTH_STATE.getNameByCode(realNameState)}</Text>
    </TouchableOpacity>
  </View>;
}
