import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { full_container } from "../assets/stys/const_stys";
import { xTd } from "../utils/tools";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const {
    contentText,
    cancelText = "取消",
    confirmText = "确认",
    showCancelButton = true,
    closeable = true,
    contentTextStys = {},
    actionCloseable = true,
    onCancel = async () => hideModal(),
    onConfirm = async () => hideModal(),
  } = props;
  const hideModal = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };

  const onCancelPress = async () => {
    onCancel && await onCancel();
    if (actionCloseable) {
      hideModal();
    }
  };
  const onConfirmPress = async () => {
    onConfirm && await onConfirm();
    if (actionCloseable) {
      hideModal();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      showModal,
      hideModal,
    };
  });

  return <Modal visible={visible}
                onRequestClose={() => closeable ? hideModal() : undefined}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.laytout}>
      <View style={stys.dialogLayout}>
        <View style={stys.contentLayout}>
          <Text style={[contentTextStys, { width: "70%", textAlign: "center" }]}>{contentText}</Text>
        </View>
        <View style={stys.line} />
        <View style={stys.buttonsLayout}>
          {showCancelButton &&
            <TouchableOpacity style={[stys.btnLayout, {
              borderRightWidth: StyleSheet.hairlineWidth,
              borderRightColor: "#D0D0D0",
            }]}
                              onPress={() => onCancelPress()}>
              <Text>{cancelText}</Text>
            </TouchableOpacity>}

          <TouchableOpacity style={stys.btnLayout}
                            onPress={() => onConfirmPress()}>
            <Text style={{ color: "red" }}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
});

const stys = StyleSheet.create({
  btnLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: xTd(55),
  },
  buttonsLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D0D0D0",
  },
  contentLayout: {
    paddingVertical: xTd(50),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogLayout: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: xTd(12),
  },
  laytout: {
    ...full_container,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000050",
    paddingHorizontal: xTd(15),
  },
});
