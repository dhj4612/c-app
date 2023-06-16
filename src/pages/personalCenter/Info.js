import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toastMessage, xTd } from "../../utils/tools";
import { useUserStore } from "../../hooks/useUserStore";
import ArrowIcon from "../../components/ArrowIcon";
import { useRef } from "react";
import { navigate, Routers } from "../../navigation";
import { USER_AUTH_STATE } from "../../const";
import CommonDialog from "../../components/CommonDialog";

export default (props) => {
  const { userState } = useUserStore();
  const commonDialogRef = useRef(null);
  const onAuthenticationPress = () => {
    let routeName;
    if (userState.userInfo.realNameState === USER_AUTH_STATE.PENDING.code) return;
    if (userState.userInfo.realNameState === USER_AUTH_STATE.AUTH.code) {
      routeName = Routers.Certified.name;
    } else if ([USER_AUTH_STATE.NO_AUTH.code,
      USER_AUTH_STATE.AUTH_FAIL.code,
      USER_AUTH_STATE.INVALID.code].includes(userState.userInfo.realNameState)) {
      routeName = Routers.Authentication.name;
    }
    routeName && navigate(routeName);
  };

  const onPersonInfoPress = () => {
    if (userState.homeData.total == null) {
      commonDialogRef.current.showModal();
      return;
    }
    if (userState.userInfo.modifyState === 0) {
      toastMessage("信息审核中，请耐心等待审核结果");
      return;
    }
    navigate(Routers.PersonalInfo.name);
  };

  return <>
    <View style={stys.layout}>
      <TouchableOpacity style={stys.itemLayout}
                        activeOpacity={.6}
                        onPress={onPersonInfoPress}>
        <Text>个人信息</Text>
        <ArrowIcon size={20} color={"rgb(181,181,186)"} />
      </TouchableOpacity>
      <View style={stys.line} />
      <TouchableOpacity style={stys.itemLayout}
                        activeOpacity={.6}
                        onPress={onAuthenticationPress}>
        <Text>实名认证</Text>
        <View style={stys.rightLayout}>
          <Text style={{ marginRight: xTd(5), color: "rgb(0,197,120)" }}>
            {USER_AUTH_STATE.getRealNameStateText(userState.userInfo.realNameState)}
          </Text>
          <ArrowIcon size={20} color={"rgb(181,181,186)"} />
        </View>
      </TouchableOpacity>
    </View>

    <CommonDialog contentTextStys={{ fontSize: xTd(16) }}
                  contentText={"请先获取您的诚学分"}
                  confirmText={"前往获取"}
                  ref={commonDialogRef}
                  onConfirm={() => navigate(Routers.EvaluateScore.name)} />
  </>;
}

const stys = StyleSheet.create({
  rightLayout: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  line: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
  },
  itemLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: xTd(10),
    height: xTd(55),
  },
  layout: {
    width: "100%",
    marginTop: xTd(15),
    backgroundColor: "white",
    borderRadius: xTd(12),
  },
});
