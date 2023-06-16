import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Loading from "../../components/Loading";
import { toastMessage, xTd } from "../../utils/tools";
import { validateEvaluateScoreForm } from "../../utils/validate/EvaluateScoreValidate";
import { handlerErr } from "../../utils/request_error_handler";
import { assessScoreApi } from "../../api";
import { goBack } from "../../navigation";
import { USER_AUTH_STATE } from "../../const";

export default (props) => {
  const {
    check, baseInfoRef, perfectInfoRef,
  } = props;
  const startAssess = async () => {
    if (!check) {
      toastMessage("请阅读并勾选《信息查询授权书》");
      return;
    }
    Loading.show();
    try {
      const formData = {
        ...baseInfoRef.current.getFormData(), ...perfectInfoRef.current.getFormData(),
      };
      if ([USER_AUTH_STATE.NO_AUTH.code, USER_AUTH_STATE.AUTH_FAIL.code, USER_AUTH_STATE.INVALID.code].includes(formData.realNameState)) {
        toastMessage("请进行实名认证");
        return;
      }
      const validateResult = await validateEvaluateScoreForm(formData);
      if (validateResult) {
        const result = await assessScoreApi(formData);
        toastMessage(result.toString());
        goBack()
      }
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  return <TouchableOpacity style={stys.buttonLayout}
                           activeOpacity={.6}
                           onPress={() => startAssess()}>
    <Text style={{ color: "rgb(25,117,252)" }}>开始评估</Text>
  </TouchableOpacity>;
}

const stys = StyleSheet.create({
  buttonLayout: {
    width: "100%",
    paddingVertical: xTd(15),
    backgroundColor: "rgb(211,225,245)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: xTd(15),
    borderRadius: xTd(12),
  },
});
