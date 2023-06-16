import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";
import { center_layout, full_container } from "../assets/stys/const_stys";
import DatePicker from "react-native-date-picker";
import { xTd } from "../utils/tools";

export default forwardRef((props, ref) => {
  const { mode = "datetime", onConfirm, onCancel } = props;
  const [visible, setVisible] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const showPopup = () => {
    setVisible(true);
  };
  const hidePopup = () => {
    setVisible(false);
  };
  const getDateValue = () => pickerDate;

  useImperativeHandle(ref, () => {
    return {
      showPopup,
      hidePopup,
      getDateValue,
    };
  });

  const handlerConfirm = () => {
    setVisible(false);
    onConfirm(pickerDate);
  };

  const handlerCancel = () => {
    setVisible(false);
    onCancel(pickerDate);
  };

  return <Modal visible={visible}
                onRequestClose={() => hidePopup()}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade">
    <View style={stys.layout}>
      <View style={stys.datePickerContainerLayout}>
        <View style={stys.titleLayout}>
          <TouchableOpacity style={[stys.titleItemLayout, { alignItems: "flex-start" }]}
                            onPress={() => handlerCancel()}>
            <Text>取消</Text>
          </TouchableOpacity>
          <View style={[stys.titleItemLayout, { ...center_layout }]}>
            <Text style={stys.titleTxt}>选择年月日</Text>
          </View>
          <TouchableOpacity style={[stys.titleItemLayout, { alignItems: "flex-end" }]}
                            onPress={() => handlerConfirm()}>
            <Text>确定</Text>
          </TouchableOpacity>
        </View>
        <DatePicker date={pickerDate}
                    open={pickerOpen}
                    onDateChange={date => setPickerDate(date)}
                    mode={mode}
                    locale={"zh-cn"} />
      </View>
    </View>
  </Modal>;
});
const stys = StyleSheet.create({
  titleItemLayout: {
    flex: 1,
    justifyContent: "center",
  },
  titleTxt: {
    fontSize: xTd(17),
    color: "black",
  },
  titleLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerContainerLayout: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flex: .35,
    padding: xTd(10),
    backgroundColor: "white",
  },
  layout: {
    ...full_container,
    justifyContent: "flex-end",
    backgroundColor: "#00000060",
  },
});
