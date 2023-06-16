/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  Platform,
  StatusBar,
  StyleSheet
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./src/pages/tab/home";
import TuitionBill from "./src/pages/tab/tuitionBill";
import Mine from "./src/pages/tab/mine";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import UserAgreementWebView from "./src/pages/webview/user/UserAgreementWebView";
import PrivacyWebView from "./src/pages/webview/user/PrivacyWebView";
import MainTab from "./src/pages/MainTab";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Routers } from "./src/navigation";
import RecordsWebView from "./src/pages/webview/pay/RecordsWebView";
import Pay from "./src/pages/pay/index";
import PayDetail from "./src/pages/pay/detail";
import DropOut from "./src/pages/dropOut/DropOut";
import PayList from "./src/pages/pay/paylist";
import AgreementCheck from "./src/pages/handler/check";
import PayRecords from "./src/pages/pay/records";
import DemoView from "./src/pages/demo/DemoView";
import SourceHistoryWebView from "./src/pages/webview/home/SourceHistoryWebView";
import MessageWebView from "./src/pages/webview/home/MessageWebView";
import PersonalCenterWebView from "./src/pages/webview/mine/PersonalCenterWebView";
import PayDetailWebView from "./src/pages/webview/pay/PayDetailWebView";
import BankCardWebView from "./src/pages/webview/bankCard/BankCardWebView";
import LessonExamineWebView from "./src/pages/webview/lessonExamine/LessonExamineWebView";
import LessonHandlerWebView from "./src/pages/webview/lessonHandler/LessonHandlerWebView";
import LessonHandleAgreementWebView from "./src/pages/webview/lessonHandler/LessonHandleAgreementWebView";
import CompletedOrderWebView from "./src/pages/webview/completedOrder/CompletedOrderWebView";
import DropOutWebView from "./src/pages/webview/dropOut/DropOutWebView";
import SetWebView from "./src/pages/webview/set/SetWebView";
import CommonWebView from "./src/pages/webview/common/CommonWebView";
import WithHoldWebView from "./src/pages/webview/agreement/WithHoldWebView";
import Certified from "./src/pages/realnameAuth/certified";
import Authentication from "./src/pages/realnameAuth/authentication";
import { Provider as StoreProvider } from "react-redux";
import { Provider as AntProvider } from "@ant-design/react-native";
import store from "./src/store/index";
import AuthenticationCamera from "./src/pages/realnameAuth/auth_camera";
import AuthSuccess from "./src/pages/realnameAuth/authsuccess";
import FaceDemo from "./src/pages/demo/FaceDemo";
import AssessmentSourceWebView from "./src/pages/webview/home/AssessmentSourceWebView";
import CodeScanner from "./src/pages/tab/home/CodeScanner";
import EvaluateScore from "./src/pages/evaluateScore";
import CreditInvestigationWebView from "./src/pages/webview/agreement/CreditInvestigationWebView";
import WebFaceDemo from "./src/pages/demo/WebFaceDemo";
import PersonalCenter from "./src/pages/personalCenter";
import { navigationRef } from "./src/navigation";
import PersonalInfo from "./src/pages/personalInfo";
import UpdatePassword from "./src/pages/updatePassword";
import UpdatePhoneNumber from "./src/pages/updatePhoneNumber";
import AvatarSet from "./src/pages/avatarSet";
import Setting from "./src/pages/set";
import ProblemWebView from "./src/pages/webview/problem/ProblemWebView";
import { initPermission } from "./src/utils/permission";
import PersonalCenterAboutWebView from "./src/pages/webview/mine/PersonalCenterAboutWebView";
import { simpleUpdate } from "react-native-update";
import _updateConfig from "./update.json";
import SplashScreen from "react-native-splash-screen";
import CommonDialog from "./src/components/CommonDialog";
import { fetchApkUpdateInfo } from "./src/utils/apk_update";
import { isDev } from "./src/utils/env";
// @ts-ignore
const { appKey } = _updateConfig[Platform.OS];
const Stack = createStackNavigator();
// https://reactnavigation.org/docs/stack-navigator
const renderScreen = (component: any, name: any, ops = {}) => {
  return <Stack.Screen component={component}
                       name={name}
                       options={{
                         headerShown: false, // 不显示默认的导航栏
                         ...TransitionPresets.SlideFromRightIOS,// 设置页面切换的动画
                         ...ops
                       }} />;
};

function App(): JSX.Element {
  // const component = require('./src/pages/avatarSet/AvatarCamera')
  // console.log(component)
  const updateDialogRef = useRef(null);
  const [appUrl, setAppUrl] = useState("");
  useEffect(() => {
    SplashScreen.hide();
    initPermission().finally(() => {
      fetchApkUpdateInfo().then(result => {
        if (!result) {
          return;
        }
        const {
          appUrl,
          versionCode,
          type,
          versionName
        } = result;
        if (versionCode !== versionName && type === 2) {
          if (appUrl) {
            setAppUrl(appUrl);
          }
          // @ts-ignore
          updateDialogRef.current?.showModal();
        }
      });
    });
  }, []);
  return (
    <StoreProvider store={store}>
      <AntProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
          <CommonDialog ref={updateDialogRef}
            // @ts-ignore
                        contentText={"检测到App版本更新，请尽快前往升级！"}
                        showCancelButton={false}
                        closeable={false}
                        actionCloseable={false}
                        onConfirm={() => Linking.openURL(appUrl || "https://wwha.lanzouj.com/iLoeq0yz8pfi")}
          />
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              // 指定默认加载的页面
              initialRouteName="MainTab"
              screenOptions={{
                // presentation: "card",
                cardStyle: {
                  elevation: 1 // 解决页面切换，页面渲染混乱的问题
                }
              }}>
              {renderScreen(Login, Routers.Login.name)}
              {renderScreen(Register, Routers.Register.name)}
              {renderScreen(UserAgreementWebView, Routers.UserAgreeWebView.name)}
              {renderScreen(PrivacyWebView, Routers.PrivacyWebView.name)}
              {renderScreen(MainTab, Routers.MainTab.name, { ...TransitionPresets.ModalTransition })}
              {renderScreen(Home, Routers.Home.name)}
              {renderScreen(TuitionBill, Routers.TuitionBill.name)}
              {renderScreen(Mine, Routers.Mine.name)}
              {renderScreen(RecordsWebView, Routers.PayRecordsWebView.name)}
              {renderScreen(Pay, Routers.Pay.name)}
              {renderScreen(PayDetail, Routers.PayDetail.name)}
              {renderScreen(DropOut, Routers.DropOut.name)}
              {renderScreen(PayList, Routers.PayList.name)}
              {renderScreen(AgreementCheck, Routers.AgreementCheck.name)}
              {renderScreen(PayRecords, Routers.PayRecords.name)}
              {renderScreen(SourceHistoryWebView, Routers.SourceHistoryWebView.name)}
              {renderScreen(MessageWebView, Routers.MessageWebView.name)}
              {renderScreen(PersonalCenterWebView, Routers.PersonalCenterWebView.name)}
              {renderScreen(PayDetailWebView, Routers.PayDetailWebView.name)}
              {renderScreen(BankCardWebView, Routers.BankCardWebView.name)}
              {renderScreen(LessonExamineWebView, Routers.LessonExamineWebView.name)}
              {renderScreen(LessonHandlerWebView, Routers.LessonHandlerWebView.name)}
              {renderScreen(LessonHandleAgreementWebView, Routers.LessonHandleAgreementWebView.name)}
              {renderScreen(CompletedOrderWebView, Routers.CompleteOrderWebView.name)}
              {renderScreen(DropOutWebView, Routers.DropOutWebView.name)}
              {renderScreen(SetWebView, Routers.SetWebView.name)}
              {renderScreen(CommonWebView, Routers.CommonWebView.name)}
              {renderScreen(WithHoldWebView, Routers.WithHoldWebView.name)}
              {renderScreen(ProblemWebView, Routers.ProblemWebView.name)}
              {renderScreen(PersonalCenterAboutWebView, Routers.PersonalCenterAboutWebView.name)}
              {renderScreen(Authentication, Routers.Authentication.name)}
              {renderScreen(Certified, Routers.Certified.name)}
              {renderScreen(AuthenticationCamera, Routers.AuthenticationCamera.name)}
              {renderScreen(AuthSuccess, Routers.AuthSuccess.name)}
              {renderScreen(AssessmentSourceWebView, Routers.AssessmentSourceWebView.name)}
              {renderScreen(EvaluateScore, Routers.EvaluateScore.name)}
              {renderScreen(CodeScanner, Routers.CodeScanner.name)}
              {renderScreen(CreditInvestigationWebView, Routers.CreditInvestigationWebView.name)}
              {renderScreen(PersonalCenter, Routers.PersonalCenter.name)}
              {renderScreen(PersonalInfo, Routers.PersonalInfo.name)}
              {renderScreen(UpdatePassword, Routers.UpdatePassword.name)}
              {renderScreen(UpdatePhoneNumber, Routers.UpdatePhoneNumber.name)}
              {renderScreen(AvatarSet, Routers.AvatarSet.name)}
              {renderScreen(Setting, Routers.Setting.name)}
              {renderScreen(FaceDemo, "FaceDemo")}
              {renderScreen(WebFaceDemo, "WebFaceDemo")}
              {renderScreen(DemoView, "DemoView")}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AntProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({});
export default simpleUpdate(App, { appKey });
