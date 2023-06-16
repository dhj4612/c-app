import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { full_container } from "../../../assets/stys/const_stys";
import { xTd } from "../../../utils/tools";
import { confirmPayApi } from "../../../api";
import { handlerErr } from "../../../utils/request_error_handler";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [confirmPayState, setConfirmPayState] = useState({
    outTradeNo: "", payVerificationCode: "",
  });
  const [loading, setLoading] = useState(false);
  const { refresh } = props;
  const hideModal = () => {
    setVisible(false);
  };

  const showModal = (outTradeNo) => {
    setConfirmPayState({
      ...confirmPayState,
      outTradeNo,
    });
    setVisible(true);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal,
      hideModal,
    };
  });

  const confirmPayAction = async () => {
    setLoading(true);
    try {
      await confirmPayApi({ ...confirmPayState });
      await refresh();
    } catch (e) {
      await handlerErr(e);
    } finally {
      setLoading(false);
    }
  };

  return <Modal visible={visible}
                onRequestClose={() => {
                  hideModal();
                }}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.layout}>
      <View style={stys.contentLayout}>
        <Text style={{ color: "black", marginBottom: xTd(5) }}>确认支付</Text>
        <TextInput style={stys.codeInputLayout}
                   placeholder="请输入验证码"
                   value={confirmPayState.payVerificationCode}
                   onChangeText={value => setConfirmPayState({
                     ...confirmPayState,
                     payVerificationCode: value,
                   })}
                   placeholderTextColor={"#D0D0D0"}
        />
        <View style={stys.buttonsLayout}>
          <TouchableOpacity style={[stys.btnLayout, { backgroundColor: "rgb(200,218,255)" }]}
                            onPress={() => hideModal()}>
            <Text style={{ color: "#44A0EF" }}>取消</Text>
          </TouchableOpacity>
          <View style={stys.interval} />
          <TouchableOpacity style={[stys.btnLayout, { backgroundColor: "rgb(245,233,233)" }]}
                            onPress={() => confirmPayAction()}
                            disabled={loading}>
            {!loading ? <Text style={{ color: "#FF8484" }}>确认</Text> :
              <ActivityIndicator
                color={"#fff"}
                animating={true}
                size="small"
              />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
});
const stys = StyleSheet.create({
  buttonsLayout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: xTd(10),
  },
  btnLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: xTd(35),
    borderRadius: xTd(12),
  },
  interval: {
    flex: .2,
  },
  codeInputLayout: {
    marginTop: xTd(5),
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingVertical: xTd(5),
    paddingHorizontal: xTd(10),
    borderRadius: xTd(12),
    width: "100%",
    height: xTd(40),
  },
  contentLayout: {
    width: "90%",
    padding: xTd(15),
    borderRadius: xTd(12),
    backgroundColor: "white",
  },
  layout: {
    ...full_container,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000060",
  },
});
