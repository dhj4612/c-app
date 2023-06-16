import QrCode from "react-native-qrcode-svg";
import { formatAmountSymbol, xTd } from "../../../utils/tools";
import closeIcon from "../../../assets/img/pay/close.png";
import logo from "../../../assets/img/public/logo.png";
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { handlerErr } from "../../../utils/request_error_handler";
import Loading from "../../../components/Loading";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { refresh } = props;
  const [payState, setPayState] = useState({});
  const [loading, setLoading] = useState(false);
  const showModal = (params) => {
    setPayState({
      ...params,
    });
    setVisible(true);
  };

  const hideModal = async () => {
    setVisible(false);
    setPayState({});
    try {
      Loading.show();
      await refresh();
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };

  const completePayAction = async () => {
    setLoading(true);
    try {
      await refresh();
    } catch (e) {
      await handlerErr(e);
    } finally {
      setLoading(false);
    }
    hideModal();
    setPayState({});
  };

  useImperativeHandle(ref, () => {
    return {
      showModal, hideModal,
    };
  });

  return <Modal visible={visible}
                onRequestClose={() => hideModal()}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.layout}>
      <View style={stys.contentLayout}>
        <View style={stys.closeIconLayout}>
          <TouchableOpacity onPress={() => hideModal()}>
            <Image style={stys.closeIcon} source={closeIcon} />
          </TouchableOpacity>
        </View>
        <View style={stys.titleLayout}>
          <Text style={stys.titleTxt}>应支付总额</Text>
          <Text style={stys.amountTxt}>{formatAmountSymbol(payState.amount)}</Text>
        </View>
        <View style={stys.qrcodeLayout}>
          <QrCode
            value={payState.url}
            size={150}
            logo={logo}
          />
        </View>
        <View style={stys.tipsLayout}>
          <Text style={stys.tipsTxt}>
            请在截图后，使用相应APP扫描或识别上方二维码进行支付
          </Text>
          <Text style={stys.retryTipsTxt}>
            若您支付时提示"商户存在异常"等字眼请点击
            <Text style={stys.retryTxt}> 重试 </Text>
            重新发起支付
          </Text>
        </View>
        <TouchableOpacity style={stys.completeBtnLayout}
                          disabled={loading}
                          onPress={() => completePayAction()}>
          {!loading ? <Text style={stys.completeTxt}>我已完成支付</Text> :
            <ActivityIndicator
              color={"#fff"}
              animating={true}
              size="small"
            />}
        </TouchableOpacity>
      </View>
    </View>
  </Modal>;
})

const stys = StyleSheet.create({
  completeTxt: {
    fontSize: xTd(16),
    color: "white",
  },
  completeBtnLayout: {
    position: "absolute",
    backgroundColor: "rgb(0,130,231)",
    left: 0,
    bottom: 0,
    right: 0,
    borderBottomLeftRadius: xTd(12),
    borderBottomRightRadius: xTd(12),
    height: xTd(60),
    justifyContent: "center",
    alignItems: "center",
  },
  retryTxt: {
    color: "#ff7e00",
    textDecorationLine: "underline",
  },
  retryTipsTxt: {
    width: "90%",
    textAlign: "center",
    padding: xTd(10),
    backgroundColor: "#edf3f5",
    borderRadius: xTd(10),
    marginTop: xTd(10),
  },
  tipsTxt: {
    textAlign: "center",
    fontSize: xTd(16),
    color: "#0082e7",
  },
  tipsLayout: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  qrcodeLayout: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: xTd(25),
  },
  amountTxt: {
    fontSize: xTd(25),
    fontWeight: "bold",
    color: "#0082e7",
    marginTop: xTd(5),
  },
  titleTxt: {
    fontSize: xTd(20),
    color: "black",
  },
  closeIconLayout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeIcon: {
    width: xTd(22),
    height: xTd(22),
    resizeMode: "stretch",
    tintColor: "#D0D0D0",
  },
  titleLayout: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentLayout: {
    width: "85%",
    flex: .65,
    borderRadius: xTd(12),
    backgroundColor: "white",
    padding: xTd(15),
  },
  layout: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000060",
  },
});
