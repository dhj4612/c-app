import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { toUrlParam, xTd } from "../../utils/tools";
import { navigate, Routers } from "../../navigation";
import { getAuthorization } from "../../utils/user";

export default (props) => {
  const { check, changeCheck } = props;
  const handlerCheck = () => {
    if (check) return;
    changeCheck(true);
  };
  return <View style={stys.layout}>
    <BouncyCheckbox onPress={() => handlerCheck()}
                    size={20}
                    fillColor={"rgb(25,137,250)"}
                    disableBuiltInState={true}
                    isChecked={check}
    />
    <Text style={{ marginLeft: xTd(-10) }}>
      我已阅读并同意
      <Text style={{ color: "#E6630C" }}
            onPress={async () =>
              navigate(Routers.CreditInvestigationWebView.name,
                { url: toUrlParam({ token: await getAuthorization() }) })}>
        《信息查询授权书》
      </Text>
    </Text>
  </View>;
}

const stys = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: xTd(10),
  },
});
