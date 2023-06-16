import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import idCardErrTipsIcon from "../../../assets/img/mine/IDcard-errTips.png";
import { forwardRef, useImperativeHandle, useState } from "react";
import { xTd } from "../../../utils/tools";
import { full_container } from "../../../assets/stys/const_stys";
import { AUTH_METHOD } from "../../../const";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { changeAuthMethod } = props;
  const [errorData, setErrorData] = useState("");
  const showModal = (message) => {
    setErrorData(message);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal, hideModal,
    };
  });

  const onAuthMethodChange = (authType) => {
    changeAuthMethod(authType);
    hideModal();
  };

  return <Modal visible={visible}
                onRequestClose={() => hideModal()}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.laytout}>
      <View style={stys.dialigLayout}>
        <View style={stys.titleLayout}>
          <Image style={stys.idCardErrTipsIcon} source={idCardErrTipsIcon} />
          <Text style={stys.titleTxt}>实名认证失败</Text>
        </View>
        <View style={stys.contentLayout}>
          <Text style={stys.contetenTxt}>原因及建议如下：</Text>
          <Text style={stys.contetenTxt}>{errorData || ""}</Text>
        </View>

        <View style={stys.buttonsLayout}>
          <TouchableOpacity style={stys.operationSwitchBtnLayout}
                            onPress={() => onAuthMethodChange(AUTH_METHOD.OPERATION)}>
            <Text style={{ color: "#0082E7" }}>切换手动上传</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stys.continueSwitchBtnLayout}
                            onPress={() => onAuthMethodChange(AUTH_METHOD.AUTO_DISTINGUISH)}>
            <Text style={{ color: "#0082E7" }}>继续认证</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
});

const stys = StyleSheet.create({
  continueSwitchBtnLayout: {
    width: xTd(120),
    borderRadius: xTd(12),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(211,225,245)",
    padding: xTd(11),
  },
  operationSwitchBtnLayout: {
    width: xTd(120),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: xTd(12),
    borderWidth: xTd(1),
    borderColor: "#0082E7",
    padding: xTd(10),
  },
  buttonsLayout: {
    marginTop: xTd(50),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  contetenTxt: {
    fontSize: xTd(13),
  },
  contentLayout: {
    paddingHorizontal: xTd(20),
    marginTop: xTd(10),
  },
  titleTxt: {
    fontSize: xTd(16),
    color: "black",
    marginLeft: xTd(5),
  },
  idCardErrTipsIcon: {
    width: xTd(17),
    height: xTd(17),
    resizeMode: "stretch",
  },
  titleLayout: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
    paddingBottom: xTd(10),
  },
  dialigLayout: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: xTd(12),
    padding: xTd(15),
  },
  laytout: {
    ...full_container,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000060",
  },
});
