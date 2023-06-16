import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Loading from "../../../components/Loading";
import { FormValidate } from "../../../utils/form_validate";
import { AUTH_METHOD } from "../../../const";
import { operationRealAuthenticationApi, realAuthenticationApi } from "../../../api";
import { replace, Routers } from "../../../navigation";
import { handlerErr } from "../../../utils/request_error_handler";
import { useUserStore } from "../../../hooks/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { formatDate, xTd } from "../../../utils/tools";
import { builderValidateRuleConfigByAuthMethod } from "../../../utils/validate/AuthenticationValidate";

export default (props) => {
  const { authMethod, switchOperationModalRef, operationAuthFormRef } = props;
  const { userState, saveUserInfo } = useUserStore();

  const nav = useNavigation();
  const getAuthenticationParams = () => {
    if (authMethod === AUTH_METHOD.AUTO_DISTINGUISH) {
      return {
        headPath: userState.realNameInfo.faceHalfUrl,
        nationalEmblemPath: userState.realNameInfo.backHalfUrl,
      };
    }
    // 手动上传参数
    return {
      headPath: userState.realNameInfo.faceHalfUrl,
      nationalEmblemPath: userState.realNameInfo.backHalfUrl,
      ...operationAuthFormRef.current.getFormState(),
    };
  };

  // 根据身份验证模式获取校验器
  const getValidatorByAuthMethod = (authType) => {
    return FormValidate.createValidator(builderValidateRuleConfigByAuthMethod(authType));
  };
  // 参数校验
  const paramsValidate = async (params, authType) => {
    try {
      return await getValidatorByAuthMethod(authType).validate(params);
    } catch (e) {
      // ignore
    }
  };
  const handlerNext = async () => {
    try {
      Loading.show();
      const authenticationApi = authMethod === AUTH_METHOD.AUTO_DISTINGUISH ?
        realAuthenticationApi : operationRealAuthenticationApi;
      const params = getAuthenticationParams();
      if (params.expirationDate) {
        params.expirationDate = formatDate(params.expirationDate, "YYYY-MM-DD");
      }
      const validate = await paramsValidate(params, authMethod);
      if (validate) {
        const { isSuccess, message, state } = await authenticationApi(params);
        if (isSuccess) {
          saveUserInfo({
            ...userState.userInfo,
            realNameState: state,
          });
          replace(Routers.AuthSuccess.name, { state });
        } else {
          switchOperationModalRef.current.showModal(message);
        }
      }
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  return <View style={stys.nextStepLayout}>
    <TouchableOpacity style={stys.nextStepBtnLayout}
                      activeOpacity={.6}
                      onPress={() => handlerNext()}>
      <Text style={stys.nextStepBtnTxt}>下一步</Text>
    </TouchableOpacity>
  </View>;
}

const stys = StyleSheet.create({
  nextStepBtnTxt: {
    fontSize: xTd(17),
    color: "#0082E7",
  },
  nextStepBtnLayout: {
    width: "100%",
    paddingVertical: xTd(12),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: xTd(12),
    backgroundColor: "rgb(211,225,245)",
  },
  nextStepLayout: {
    width: "100%",
    marginTop: xTd(50),
    paddingHorizontal: xTd(15),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: xTd(10),
  },
});
