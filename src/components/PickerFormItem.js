import { Picker } from "@ant-design/react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { xTd } from "../utils/tools";
import ArrowIcon from "./ArrowIcon";

const PickerFormItem = (props) => {
  const [pickerValue, setPickerValue] = useState([]);
  const [rightText, setRightText] = useState("");
  const {
    data,
    onValueChange,
    onConfirm,
    onCancel,
    require,
    cols = 1,
    placeholder = "请选择",
    value,
    rightTextProcessor = (value) => value,
    pickerTitle,
    labelName,
    onPress: exterOnPress,
    styles,
  } = props;

  useEffect(() => {
    setRightText(rightTextProcessor(value));
  }, [value]);

  const renderFormLabel = (props) => {
    const { labelName, require = true } = props;
    const stys = StyleSheet.create({
      layout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      requireMark: {
        color: "red",
      },
      labelTxt: {
        fontSize: xTd(13),
      },
    });
    return <View style={stys.layout}>
      {require && <Text style={stys.requireMark}>*</Text>}
      <Text style={stys.labelTxt}>{labelName}</Text>
    </View>;
  };
  const onChildPress = async (props) => {
    if (exterOnPress) {
      await exterOnPress();
    }
    props.onPress();
  };

  const CustomChildren = (props) => (
    <TouchableOpacity onPress={() => onChildPress(props)}
                      activeOpacity={.6}>
      <View
        style={styles ? styles : stys.defaultLayout}>
        <Text style={{ flex: 1 }}>{props.children}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: xTd(13) }}>{rightText || placeholder}</Text>
          <ArrowIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
  return <Picker
    title={pickerTitle}
    data={data}
    cols={cols}
    itemStyle={{
      fontWeight: "normal", fontSize: xTd(17),
    }}
    indicatorStyle={{
      height: xTd(35),
      alignItems: "center",
      justifyContent: "center",
    }}
    value={pickerValue}
    onDismiss={() => onCancel && onCancel()}
    // onChange={(value) => {
    //   onValueChange && onValueChange(value);
    //   rightTextProcessor(value);
    // }}
    onOk={(value) => {
      setPickerValue(value);
      onConfirm && onConfirm(value);
    }}>
    <CustomChildren>
      {renderFormLabel({ labelName: labelName, require })}
    </CustomChildren>
  </Picker>;
};
const stys = StyleSheet.create({
  defaultLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: xTd(50),
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#D0D0D0",
  },
});

PickerFormItem.singleColumesRightTextProcessor = (value, source) => {
  if (!value || value.length === 0) return;
  return source.find(item => item.value === `${value[0]}`)?.label;
};
export default PickerFormItem;
