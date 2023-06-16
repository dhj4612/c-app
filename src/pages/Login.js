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
import loginBgImg from "../assets/img/login/login-bg.png";
import showPswdIcon from "../assets/img/login/showPassword.png";
import hidePswdIcon from "../assets/img/login/hiddenPassword.png";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { toastMessage, xTd } from "../utils/tools";
import { hasAuthorization, initStore, setAuthorization } from "../utils/user";
import { useSendCode } from "../hooks/useSendCode";
import { codeLoginApi, loginApi, loginSendCodeApi } from "../api";
import { handlerErr } from "../utils/request_error_handler";
import { PHONE_NUMBER_REG } from "../const/reg_const";
import AgreementCheckBox from "../components/AgreementCheckBox";
import { navigate, replace, Routers } from "../navigation";
import { FormValidate } from "../utils/form_validate";
import { buildValidatorConfigByLoginType } from "../utils/validate/LoginValidate";
import OnlineCustomService from "../components/OnlineCustomService";

export default () => {
  useEffect(() => {
    hasAuthorization().then(has => {
      if (has) {
        replace(Routers.MainTab.name);
        initStore().then();
      }
    });
  }, []);

  const [hidePswd, setHidePswd] = useState(true);
  const [titleText, setTitleText] = useState("账号密码登录");
  const [loginType, setLoginType] = useState(false);
  const [placeholder, setPlaceholder] = useState("请输入密码");
  const [loginState, setLoginState] = useState({
    phone: "", password: "", code: "",
  });
  const {
    sendCode, sendBtnTxt, disableState,
  } = useSendCode({ sendCodeApi: loginSendCodeApi });

  const renderTitle = () => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: xTd(25),
        paddingTop: xTd(45),
      },
      primaryTitleTxt: {
        fontSize: xTd(25),
        color: "black",
      },
      secondaryTitleTxt: {
        marginTop: xTd(15),
        fontSize: xTd(16),
      },
    });
    return <View style={stys.layout}>
      <Text style={stys.primaryTitleTxt}>{titleText}</Text>
      <Text style={stys.secondaryTitleTxt}>欢迎来到诚学信付</Text>
    </View>;
  };

  const renderLoginForm = () => {
    const stys = StyleSheet.create({
      layout: {
        width: "100%",
        padding: xTd(30),
      },
      contentLayout: {
        width: "100%",
        flexDirection: "column",
        borderRadius: xTd(8),
        backgroundColor: "white",
        paddingHorizontal: xTd(10),
      },
      phoneInput: {
        width: "100%",
        height: xTd(56),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#D0D0D0",
      },
      passwordInput: {
        width: loginType ? "75%" : "90%",
        height: xTd(56),
        borderBottomWidth: 0,
      },
      submitButton: {
        width: "100%",
        height: xTd(50),
        backgroundColor: "#1989fa",
        borderRadius: xTd(8),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: xTd(25),
      },
      submitTxt: {
        color: "white",
        fontSize: xTd(15),
      },
      passwordInputLayout: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      },
      showPswdIcon: {
        width: xTd(20),
        height: xTd(20),
        resizeMode: "contain",
      },
      loginTypeLayout: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: xTd(15),
        fontSize: xTd(13),
      },
      loginTypeTxt: {
        color: "#5f93ef",
      },
      checkboxLayout: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: xTd(15),
      },
      checkboxTxt: {
        fontSize: xTd(12),
      },
      agreeTxt: {
        color: "#e6630c",
      },
      codeBtnTxt: {
        fontSize: xTd(13),
        color: "#5f93ef",
      },
      codeBtnLayout: {
        justifyContent: "center",
        width: "30%",
        alignItems: "center",
      },
    });

    const phoneNumberFormat = (value) => {
      setLoginState({
        ...loginState,
        phone: value.replace(/\D+/, ""),
      });
    };
    const passwordFormat = (value) => {
      setLoginState({
        ...loginState,
        password: value.replace(/[^\w.\/]/ig, ""),
      });
    };

    const verifyCodeFormat = (value) => {
      setLoginState({
        ...loginState,
        code: value.replace(/\D+/, ""),
      });
    };

    const sendCodeAction = async () => {
      if (!PHONE_NUMBER_REG.test(loginState.phone)) {
        toastMessage("请输入正确手机号");
        return;
      }
      try {
        Loading.show("发送中");
        await sendCode(loginState.phone);
        toastMessage("发送成功，请注意查收");
      } catch (e) {
        await handlerErr(e);
      } finally {
        Loading.hide();
      }
    };

    const handlerLogin = async () => {
      const validator = FormValidate.createValidator(buildValidatorConfigByLoginType(loginType));
      const validateResult = await validator.validate(loginState);
      if (!validateResult) {
        return;
      }
      try {
        Loading.show("登录中");
        const { token } = loginType ? await codeLoginApi({
          phone: loginState.phone,
          code: loginState.code,
        }) : await loginApi({
          phone: loginState.phone,
          password: loginState.password,
        });
        await setAuthorization(token);
        replace(Routers.MainTab.name);
      } catch (e) {
        await handlerErr(e);
      } finally {
        Loading.hide();
      }
    };

    return <View style={stys.layout}>
      <View style={stys.contentLayout}>
        <TextInput value={loginState.phone}
                   keyboardType="phone-pad"
                   maxLength={11}
                   onChangeText={phoneNumberFormat}
                   style={stys.phoneInput}
                   placeholder="请输入手机号" />
        <View style={stys.passwordInputLayout}>
          <TextInput keyboardType={loginType ? "numeric" : "default"}
                     value={loginType ? loginState.code : loginState.password}
                     onChangeText={loginType ? verifyCodeFormat : passwordFormat}
                     maxLength={loginType ? 6 : 13}
                     secureTextEntry={hidePswd}
                     style={stys.passwordInput}
                     placeholder={placeholder} />
          {loginType ? <TouchableOpacity style={stys.codeBtnLayout}
                                         disabled={disableState}
                                         onPress={sendCodeAction}>
            <Text style={stys.codeBtnTxt}>{sendBtnTxt}</Text>
          </TouchableOpacity> : <TouchableOpacity onPress={() => {
            setHidePswd(!hidePswd);
          }}>
            <Image style={stys.showPswdIcon} source={hidePswd ? hidePswdIcon : showPswdIcon} />
          </TouchableOpacity>}
        </View>
        <TouchableOpacity style={stys.submitButton}
                          activeOpacity={0.6}
                          onPress={handlerLogin}>
          <Text style={stys.submitTxt}>登录</Text>
        </TouchableOpacity>

        <View style={stys.loginTypeLayout}>
          <TouchableOpacity activeOpacity={0.6}
                            onPress={() => {
                              const temp = !loginType;
                              setLoginType(temp);
                              if (temp) {
                                setTitleText("验证码登录");
                                setPlaceholder("请输入验证码");
                                setLoginState({
                                  ...loginState,
                                  password: "",
                                });
                              } else {
                                setTitleText("账号密码登录");
                                setPlaceholder("请输入密码");
                                setLoginState({
                                  ...loginState,
                                  code: "",
                                });
                              }
                            }}>
            <Text style={stys.loginTypeTxt}>{loginType ? "账号密码登录" : "验证码登录"}</Text>
          </TouchableOpacity>

          <Text style={{ height: "80%" }}> | </Text>

          <TouchableOpacity activeOpacity={0.6} onPress={() => {
            navigate(Routers.Register.name);
          }}>
            <Text style={stys.loginTypeTxt}>立即注册</Text>
          </TouchableOpacity>
        </View>
        <AgreementCheckBox defaultValue={true} />
      </View>
    </View>;
  };

  return <>
    <ImageBackground style={stys.layout}
                     source={loginBgImg}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={stys.rootContent}>
          {renderTitle()}
          {renderLoginForm()}
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
    flexDirection: "row",
  },
  rootContent: {
    width: "100%",
  },
});
