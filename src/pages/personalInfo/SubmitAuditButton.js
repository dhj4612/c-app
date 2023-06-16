import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Loading from "../../components/Loading";
import { toastMessage, xTd } from "../../utils/tools";
import { validateEvaluateScoreForm } from "../../utils/validate/EvaluateScoreValidate";
import { handlerErr } from "../../utils/request_error_handler";
import { updatePersonalInfoApi } from "../../api";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../hooks/useUserStore";

export default (props) => {
  const { baseInfoRef, perfectInfoRef } = props;
  const { userState, saveUserInfo } = useUserStore();
  const nav = useNavigation();
  const startAssess = async () => {
    Loading.show();
    try {
      const formData = {
        ...baseInfoRef.current.getFormData(), ...perfectInfoRef.current.getFormData(),
      };
      const validateResult = await validateEvaluateScoreForm(formData);
      if (validateResult) {
        const result = await updatePersonalInfoApi(formData);
        saveUserInfo({ ...userState, modifyState: 0 });
        toastMessage(result);
        nav.goBack();
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
    <Text style={{ color: "rgb(25,117,252)" }}>提交审核</Text>
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
