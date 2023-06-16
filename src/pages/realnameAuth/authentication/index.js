import { ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { xTd } from "../../../utils/tools";
import { AUTH_METHOD } from "../../../const";
import AuthMethodModal from "./AuthMethodModal";
import SwitchOperationAuthModal from "./SwitchOperationAuthModal";
import OperationAuthForm from "./OperationAuthForm";
import NavBar from "../../../components/NavBar";
import Head from "./Head";
import ShootingInstructions from "./ShootingInstructions";
import NextButton from "./NextButton";
import ContentLayout from "./ContentLayout";

export default function Authentication({ route, navigation }) {
  // 图片上传加载状态
  const [faceUploading, setFaceUploading] = useState(false);
  const [backUploading, setBackUploading] = useState(false);

  // 实名方式（手动上传，自动识别）
  const [authMethod, setAuthMethod] = useState(AUTH_METHOD.AUTO_DISTINGUISH);

  // refs
  const authMethodModalRef = useRef(null);
  const switchOperationModalRef = useRef(null);
  const operationAuthFormRef = useRef(null);

  return <>
    <NavBar title={"实名认证"} handler={() => navigation.goBack()} />
    <ScrollView
      showsVerticalScrollIndicator={faceUploading}
      showsHorizontalScrollIndicator={faceUploading}
      contentContainerStyle={{ paddingBottom: xTd(15) }}>
      <Head />
      <ContentLayout faceUploading={faceUploading}
                     backUploading={backUploading}
                     authMethodModalRef={authMethodModalRef} />
      {authMethod === AUTH_METHOD.OPERATION && <OperationAuthForm ref={operationAuthFormRef} />}
      <ShootingInstructions />
    </ScrollView>
    <NextButton switchOperationModalRef={switchOperationModalRef}
                authMethod={authMethod}
                operationAuthFormRef={operationAuthFormRef} />
    <AuthMethodModal setFaceUploading={setFaceUploading}
                     setBackUploading={setBackUploading}
                     ref={authMethodModalRef} />

    <SwitchOperationAuthModal ref={switchOperationModalRef}
                              changeAuthMethod={setAuthMethod} />
  </>;
};
