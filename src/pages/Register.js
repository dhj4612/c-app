import {
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import registerBg from "../assets/img/register/register-bg.png";
import logoBg from "../assets/img/public/logo.png";
import showPswdIcon from "../assets/img/login/showPassword.png";
import hidePswdIcon from "../assets/img/login/hiddenPassword.png";
import Loading from "../components/Loading";
import React, { useRef, useState } from "react";
import { useSendCode } from "../hooks/useSendCode";
import { registerApi, registerSendCodeApi } from "../api";
import { toastMessage, xTd } from "../utils/tools";
import { handlerErr } from "../utils/request_error_handler";
import { setAuthorization } from "../utils/user";
import { navigate, replace, Routers } from "../navigation";
import { validateRegisterForm } from "../utils/validate/RegisterValidate";
import OnlineCustomService from "../components/OnlineCustomService";
import { PHONE_NUMBER_REG } from "../const/reg_const";
import AgreementCheckBox from "../components/AgreementCheckBox";

export default ({ route, navgation }) => {
  const [registerState, setRegisterState] = useState({
    phone: "",
    password: "",
    verifyCode: "",
  });
  const [hidePswd, setHidePswd] = useState(true);
  const agreementRef = useRef(null);
  const { sendCode, sendBtnTxt, disableState } =
    useSendCode({ sendCodeApi: registerSendCodeApi });
  const renderHead = () => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "25%",
        marginTop: xTd(35),
      },
      logoBg: {
        width: xTd(56),
        height: xTd(56),
        resizeMode: "cover",
      },
      logoTxt: {
        fontSize: xTd(25),
        color: "black",
        marginTop: xTd(20),
      },
    });
    return <View style={stys.layout}>
      <Image style={stys.logoBg} source={logoBg} />
      <Text style={stys.logoTxt}>诚学信付</Text>
    </View>;
  };

  const renderRegisterForm = () => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        paddingHorizontal: xTd(35),
        flexDirection: "column",
      },
      inputLayout: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      },
      inputLayoutBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#D0D0D0",
      },
      showPswdIcon: {
        width: xTd(20),
        height: xTd(20),
        resizeMode: "center",
      },
      passwordInputLayout: {
        width: "90%",
      },
      codeInputLayout: {
        width: "75%",
      },
      submitButton: {
        width: "100%",
        height: xTd(50),
        backgroundColor: "#1989fa",
        borderRadius: xTd(8),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: xTd(35),
      },
      submitTxt: {
        color: "white",
        fontSize: xTd(15),
      },
      existenTipsLayout: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: xTd(15),
      },
      existenTxt: {
        fontSize: xTd(12),
      },
      loginTxt: {
        color: "#5f93ef",
      },
      codeBtnLayout: {
        justifyContent: "center",
        width: "30%",
        alignItems: "center",
      },
      codeBtnTxt: {
        fontSize: xTd(13),
        color: "#5f93ef",
      },
    });

    const phoneNumberFormat = (value) => {
      setRegisterState({
        ...registerState,
        phone: value.replace(/\D+/, ""),
      });
    };
    const passwordFormat = (value) => {
      setRegisterState({
        ...registerState,
        password: value.replace(/[^\w.\/]/ig, ""),
      });
    };

    const verifyCodeFormat = (value) => {
      setRegisterState({
        ...registerState,
        verifyCode: value.replace(/\D+/, ""),
      });
    };

    const handlerRegister = async () => {
      if (!agreementRef?.current?.checkbox) {
        toastMessage("请阅读并勾选同意注册协议");
        return false;
      }
      const validateResult = await validateRegisterForm(registerState);
      if (!validateResult) {
        return;
      }
      try {
        Loading.show("注册中");
        const { token } = await registerApi(registerState);
        console.log(token);
        await setAuthorization(token);
        toastMessage("注册成功");
        replace(Routers.MainTab.name);
      } catch (e) {
        await handlerErr(e);
      } finally {
        Loading.hide();
      }
    };
    const sendCodeAction = async () => {
      if (!PHONE_NUMBER_REG.test(registerState.phone)) {
        toastMessage("请输入正确的手机号");
        return;
      }
      try {
        Loading.show("发送中");
        await sendCode(registerState.phone);
        toastMessage("发送成功");
      } catch (e) {
        await handlerErr(e);
      } finally {
        Loading.hide();
      }
    };

    return <View style={stys.layout}>
      <View style={[stys.inputLayout, stys.inputLayoutBorder]}>
        <TextInput placeholder={"请输入手机号"}
                   maxLength={11}
                   value={registerState.phone}
                   keyboardType="phone-pad"
                   onChangeText={phoneNumberFormat}
        />
      </View>
      <View style={[stys.inputLayout, stys.inputLayoutBorder]}>
        <TextInput style={stys.codeInputLayout}
                   placeholder={"请输入短信验证码"}
                   maxLength={6}
                   keyboardType="numeric"
                   value={registerState.verifyCode}
                   onChangeText={verifyCodeFormat}
        />
        <TouchableOpacity style={stys.codeBtnLayout}
                          disabled={disableState}
                          onPress={sendCodeAction}
                          activeOpacity={0.6}>
          <Text style={stys.codeBtnTxt}>{sendBtnTxt}</Text>
        </TouchableOpacity>
      </View>
      <View style={stys.inputLayout}>
        <TextInput style={stys.passwordInputLayout}
                   placeholder={"设置密码"}
                   secureTextEntry={hidePswd}
                   maxLength={13}
                   value={registerState.password}
                   onChangeText={passwordFormat}

        />
        <TouchableOpacity onPress={() => {
          setHidePswd(!hidePswd);
        }}>
          <Image style={stys.showPswdIcon} source={hidePswd ? hidePswdIcon : showPswdIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={stys.submitButton}
                        activeOpacity={0.6}
                        onPress={handlerRegister}>
        <Text style={stys.submitTxt}>立即注册</Text>
      </TouchableOpacity>

      <View style={stys.existenTipsLayout}>
        <Text style={stys.existenTxt}>我已有账号，</Text>
        <TouchableOpacity activeOpacity={0.6}
                          onPress={() => {
                            navigate(Routers.Login.name);
                          }}>
          <Text style={[stys.existenTxt, stys.loginTxt]}>立即登录</Text>
        </TouchableOpacity>
      </View>
      <AgreementCheckBox ref={agreementRef} defaultValue={false} />
    </View>;
  };

  return <>
    <ImageBackground style={stys.layout}
                     source={registerBg}>
      <TouchableWithoutFeedback onPress={() => {
        // 任意空白处点击，隐藏键盘
        Keyboard.dismiss();
      }}>
        <View>
          {renderHead()}
          {renderRegisterForm()}
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
    <OnlineCustomService />
  </>;
}

const stys = StyleSheet.create({
  layout: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
});
