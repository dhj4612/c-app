import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toastMessage, xTd } from "../../../utils/tools";
import closeIcon from "../../../assets/img/pay/close.png";
import { handlerErr } from "../../../utils/request_error_handler";
import { revokeOrderApi } from "../../../api";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [confirmBtnDisable, setConfirmBtnDisable] = useState(true);
  const [confirmBtnTxt, setConfirmBtnTxt] = useState("确定");
  const [recordId, setRecordId] = useState(undefined);
  const [intervalId, setIntervalId] = useState(undefined);
  const { refresh } = props;
  const [loading, setLoading] = useState(false);
  const showModal = (recordId = undefined) => {
    setVisible(true);
    setRecordId(recordId);
    startCountDown();
  };
  const hideModal = () => {
    setVisible(false);
    clearInterval(intervalId);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal, hideModal,
    };
  });

  const startCountDown = () => {
    let countDown = 60;
    setConfirmBtnTxt(`确定(${countDown}s)`);
    setIntervalId(setInterval(() => {
      if (countDown === 0) {
        clearInterval(intervalId);
        setConfirmBtnTxt("确定");
        setConfirmBtnDisable(false);
        return;
      }
      countDown--;
      setConfirmBtnTxt(`确定(${countDown}s)`);
    }, 1000));
  };

  const handlerConfirm = async () => {
    setLoading(true);
    try {
      const result = await revokeOrderApi({ recordId });
      await refresh();
      setVisible(false);
      toastMessage(result);
    } catch (e) {
      await handlerErr(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  }, []);

  return <Modal visible={visible}
                onRequestClose={() => {
                  hideModal();
                }}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.layout}>
      <View style={stys.contentLayout}>
        <View style={stys.headLayout}>
          <Text style={stys.cancleTitleTxt}>撤销订单</Text>
          <TouchableOpacity onPress={() => {
            hideModal();
          }}>
            <Image source={closeIcon} style={stys.modalCloseIcon} />
          </TouchableOpacity>
        </View>
        <View style={stys.descLayout}>
          <View style={{ width: "85%", alignItems: "center" }}>
            <Text style={stys.descTxt}>若需要重新支付，请60秒后点击撤销订单。 </Text>
            <Text style={[stys.descTxt, { marginTop: xTd(5) }]}>(若已成功支付，请耐心等待几分钟)</Text>
          </View>
        </View>
        <View style={stys.buttonsLayout}>
          <TouchableOpacity style={[stys.buttonLayout, { backgroundColor: "rgb(200,218,255)" }]}
                            onPress={() => hideModal()}>
            <Text style={{ color: "#1989fa" }}>取消</Text>
          </TouchableOpacity>
          <View style={stys.interval} />
          <TouchableOpacity style={[stys.buttonLayout, { backgroundColor: "rgb(245,233,233)" }]}
                            disabled={confirmBtnDisable || loading}
                            onPress={() => handlerConfirm()}>
            {!loading ? <Text style={{ color: "#ee0a24" }}>{confirmBtnTxt}</Text> :
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
  buttonLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    backgroundColor: "red",
    borderRadius: xTd(12),
  },
  interval: {
    flex: .1,
  },
  buttonsLayout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: xTd(60),
    marginTop: xTd(15),
  },
  descTxt: {
    fontSize: xTd(13),
  },
  descLayout: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseIcon: {
    width: xTd(22),
    height: xTd(22),
    resizeMode: "stretch",
    tintColor: "#D0D0D0",
  },
  cancleTitleTxt: {
    fontSize: xTd(16),
    color: "black",
  },
  headLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: xTd(10),
  },
  contentLayout: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: xTd(12),
    padding: xTd(10),
  },
  layout: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000060",
    paddingHorizontal: xTd(16),
  },
});
