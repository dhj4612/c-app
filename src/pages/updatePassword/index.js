import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { goBack } from "../../navigation";
import { useSendCode } from "../../hooks/useSendCode";
import { toastMessage, xTd } from "../../utils/tools";
import { updatePasswordApi, updatePasswordSendCodeApi } from "../../api";
import { handlerErr } from "../../utils/request_error_handler";
import { exitLogin } from "../../utils/user";
import { useUserStore } from "../../hooks/useUserStore";
import { validateUpdatePasswordForm } from "../../utils/validate/UpdatePasswordValidate";

export default function UpdatePhoneNumber() {
  const { userState } = useUserStore();
  const [formState, setFormState] = useState({
    phone: userState.userInfo.phone, newPassword: "", confirmPassword: "", verifyCode: "",
  });
  const [sending, setSending] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    sendBtnTxt, disableState, sendCode,
  } = useSendCode({
    sendCodeApi: updatePasswordSendCodeApi,
    text: "获取验证码",
    textProcessor: value => `${value}s`,
    sentCallBack: result => {
      toastMessage(result);
    },
  });
  const sendCodeAction = async () => {
    try {
      setSending(true);
      await sendCode(formState.phone);
    } catch (e) {
      await handlerErr(e);
    } finally {
      setSending(false);
    }
  };

  const handerlSubmit = async () => {
    const result = await validateUpdatePasswordForm(formState);
    if (!result) {
      return;
    }
    setSubmitLoading(true);
    try {
      const result = await updatePasswordApi({
        newPassword: formState.newPassword, verifyCode: formState.verifyCode,
      });
      toastMessage(`${result},请重新登录`);
      exitLogin().catch(() => undefined);
    } catch (e) {
      await handlerErr(e);
    } finally {
      setSubmitLoading(false);
    }
  };

  return <>
    <NavBar title={"修改登录密码"} handler={() => goBack()} />
    <View style={stys.layout}>
      <Text>详细信息</Text>
      <View style={stys.formLayout}>
        <View style={stys.formItemLayout}>
          <Text style={{ color: "black" }}>新密码</Text>
          <TextInput style={{ width: "50%", textAlign: "right" }}
                     placeholder={"请输入新密码"}
                     maxLength={11}
                     value={formState.newPassword}
                     onChangeText={value => setFormState({ ...formState, newPassword: value })} />
        </View>
        <View style={stys.formItemLayout}>
          <Text style={{ color: "black" }}>确认新密码</Text>
          <TextInput style={{ width: "50%", textAlign: "right" }}
                     placeholder={"请再次输入新密码"}
                     value={formState.confirmPassword}
                     maxLength={11}
                     onChangeText={value => setFormState({ ...formState, confirmPassword: value })} />
        </View>
        <View style={stys.formItemLayout}>
          <Text style={{ color: "black" }}>手机号</Text>
          <TextInput style={{ width: "50%", textAlign: "right", color: "black" }}
                     editable={false}
                     maxLength={11}
                     value={formState.phone}
                     onChangeText={value => setFormState({ ...formState, phone: value })} />
        </View>
        <View style={stys.formItemLayout}>
          <Text style={{ color: "black" }}>验证码</Text>
          <View style={stys.rightLayout}>
            <TextInput style={{ width: "50%", textAlign: "right" }}
                       placeholder={"请输入验证码"}
                       maxLength={6}
                       value={formState.verifyCode}
                       onChangeText={value => setFormState({ ...formState, verifyCode: value })} />
            <TouchableOpacity style={{ width: xTd(80), justifyContent: "center", alignItems: "flex-end" }}
                              disabled={disableState}
                              onPress={() => sendCodeAction()}>
              {!sending ?
                <Text style={{ color: "#0082e7" }}>{`${sendBtnTxt}`}</Text>
                :
                <ActivityIndicator
                  color={"black"}
                  animating={true}
                  size="small"
                />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    <View style={stys.confirmButtonLayout}>
      <TouchableOpacity style={stys.confirmButton}
                        activeOpacity={.5}
                        onPress={() => handerlSubmit()}
                        disabled={submitLoading}>
        {!submitLoading ?
          <Text style={{ color: "rgb(0,142,236)" }}>确定</Text>
          :
          <ActivityIndicator
            color={"rgb(0,142,236)"}
            animating={true}
            size="small"
          />}
      </TouchableOpacity>
    </View>
  </>;
}
const stys = StyleSheet.create({
  confirmButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: xTd(12),
    backgroundColor: "rgb(211,225,245)",
    paddingVertical: xTd(10),
  },
  confirmButtonLayout: {
    width: "100%",
    position: "absolute",
    bottom: xTd(10),
    paddingHorizontal: xTd(10),
  },
  rightLayout: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  formItemLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formLayout: {
    width: "100%",
    paddingHorizontal: xTd(10),
    borderRadius: xTd(12),
    backgroundColor: "white",
    marginTop: xTd(5),
  },
  layout: {
    width: "100%",
    padding: xTd(15),
  },
});
