import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import { goBack } from "../../navigation";
import { toastMessage, xTd } from "../../utils/tools";
import { updatePhoneNumberApi, updatePhoneNumberSendCodeApi } from "../../api";
import { useSendCode } from "../../hooks/useSendCode";
import { validateUpdatePhoneNumberForm } from "../../utils/validate/UpdatePhoneNumberValidate";
import { handlerErr } from "../../utils/request_error_handler";
import { exitLogin } from "../../utils/user";
import { PHONE_NUMBER_REG } from "../../const/reg_const";
import CommonDialog from "../../components/CommonDialog";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function UpdatePhoneNumber() {
  const [formState, setFormState] = useState({
    oldPhone: "",
    newPhone: "",
    verifyCode: "",
  });
  const [readySend, setReadySend] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const commonModalRef = useRef(null);
  const {
    sendBtnTxt,
    disableState,
    sendCode,
  } = useSendCode({
    sendCodeApi: updatePhoneNumberSendCodeApi,
    text: "获取验证码",
    textProcessor: value => `${value}s`,
    sentCallBack: result => {
      toastMessage(result);
      setReadySend(false);
    },
    afterCallBack: () => setReadySend(true),
  });
  const sendCodeAction = async () => {
    if (Object.is(formState.oldPhone, formState.newPhone)) {
      toastMessage("新旧手机号不能一致");
      return;
    }
    if (!PHONE_NUMBER_REG.test(formState.oldPhone) || !PHONE_NUMBER_REG.test(formState.newPhone)) {
      toastMessage("请输入正确的手机号");
      return;
    }
    try {
      setSending(true);
      await sendCode(formState.newPhone);
    } catch (e) {
      await handlerErr(e);
    } finally {
      setSending(false);
    }
  };

  const handerlSubmit = async () => {
    const result = await validateUpdatePhoneNumberForm(formState);
    if (!result) {
      return;
    }
    setSubmitLoading(true);
    try {
      await updatePhoneNumberApi(formState);
      commonModalRef.current.showModal();
    } catch (e) {
      await handlerErr(e);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (formState.oldPhone && formState.newPhone) {
      setReadySend(true);
    } else {
      setReadySend(false);
    }
  }, [
    formState.oldPhone, formState.newPhone,
  ]);

  return <>
    <NavBar title={"修改手机号"} handler={() => goBack()} />
    <View style={stys.layout}>
      <Text>详细信息</Text>
      <View style={stys.formLayout}>
        <View style={stys.formItemLayout}>
          <Text style={{ color: "black" }}>原手机号</Text>
          <TextInput style={{ width: "50%", textAlign: "right" }}
                     placeholder={"请输入原手机号"}
                     maxLength={11}
                     value={formState.oldPhone}
                     onChangeText={value => setFormState({ ...formState, oldPhone: value })} />
        </View>
        <View style={stys.formItemLayout}>
          <Text style={{ color: "black" }}>新手机号</Text>
          <TextInput style={{ width: "50%", textAlign: "right" }}
                     placeholder={"请输入新手机号"}
                     value={formState.newPhone}
                     maxLength={11}
                     onChangeText={value => setFormState({ ...formState, newPhone: value })} />
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
                              disabled={disableState || !readySend}
                              onPress={() => sendCodeAction()}>
              {
                !sending ?
                  <Text style={{ color: readySend ? "#0082e7" : null }}>{`${sendBtnTxt}`}</Text>
                  :
                  <ActivityIndicator
                    color={"black"}
                    animating={true}
                    size="small"
                  />
              }
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
          />
        }
      </TouchableOpacity>
    </View>

    <CommonDialog ref={commonModalRef}
                  closeable={false}
                  contentText={"手机号修改成功,密码已重置为手机号后6位,请重新登录"}
                  showCancelButton={false}
                  onConfirm={() => exitLogin()}
    />
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
  titleTetx: {},
  layout: {
    width: "100%",
    padding: xTd(15),
  },
})
