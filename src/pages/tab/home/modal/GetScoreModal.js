import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import closeIcon from "../../../../assets/img/pay/close.png";
import tipWarnIcon from "../../../../assets/img/home/tips.png";
import { forwardRef, useImperativeHandle, useState } from "react";
import { navigate, Routers } from "../../../../navigation";
import { xTd } from "../../../../utils/tools";
import { full_container } from "../../../../assets/stys/const_stys";

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal,
      hideModal,
    };
  });
  const hideModal = () => setVisible(false);

  return <Modal visible={visible}
                onRequestClose={() => hideModal()}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.laytout}>
      <View style={stys.dialogLayout}>
        <View style={stys.contentLayout}>
          <View style={stys.headLayout}>
            <TouchableOpacity activeOpacity={.6}
                              onPress={() => hideModal()}>
              <Image source={closeIcon} style={stys.closeIconImg} />
            </TouchableOpacity>
          </View>
          <View style={stys.tipsLayout}>
            <Image style={stys.warnIconImg} source={tipWarnIcon} />
            <Text style={{ marginLeft: xTd(5) }}>为了评估您的先学后付资格</Text>
          </View>
          <View>
            <Text style={{ textAlign: "center" }}>请先更新您的诚学分</Text>
          </View>
          <TouchableOpacity style={stys.buttonLayout}
                            onPress={() => {
                              hideModal();
                              navigate(Routers.EvaluateScore.name);
                            }}>
            <Text style={{ color: "rgb(19,139,233)" }}>立即评估</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
});
const stys = StyleSheet.create({
  buttonLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: xTd(35),
    paddingVertical: xTd(10),
    backgroundColor: "rgb(200,218,255)",
    borderRadius: xTd(12),
  },
  warnIconImg: {
    width: xTd(16),
    height: xTd(16),
  },
  tipsLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIconImg: {
    width: xTd(20),
    height: xTd(20),
    tintColor: "#D0D0D0",
  },
  headLayout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  contentLayout: {
    width: "100%",
    padding: xTd(16),
    backgroundColor: "white",
    borderRadius: xTd(12),
  },
  dialogLayout: {
    paddingHorizontal: xTd(15),
  },
  laytout: {
    ...full_container,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000050",
  },
});
