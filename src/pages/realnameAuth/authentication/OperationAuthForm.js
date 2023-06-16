import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { formatDate, xTd } from "../../../utils/tools";
import ArrowIcon from "../../../components/ArrowIcon";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePickerPopup from "../../../components/DatePickerPopup";

export default forwardRef((props, ref) => {
  // 手动上传表单数据
  const [authFormState, setAuthFormState] = useState({
    realName: undefined, IDNum: undefined, expirationDate: undefined, address: "",
  });
  const datePickerRef = useRef(null);
  const getFormState = () => {
    return authFormState;
  };
  useImperativeHandle(ref, () => {
    return {
      getFormState,
    };
  });

  return <>
    <View style={stys.layout}>
      <Text style={stys.titleTxt}>基本信息</Text>
      <View style={stys.formContentLayout}>
        <View style={stys.formItemLayout}>
          <Text style={stys.formItemLabelTxt}>姓名</Text>
          <TextInput placeholderTextColor={"#D0D0D0"}
                     placeholder={"请输入姓名"}
                     maxLength={16}
                     multiline={true}
                     style={stys.txtInputLayout}
                     value={authFormState.realName}
                     onChangeText={value => setAuthFormState({
                       ...authFormState, realName: value,
                     })} />
        </View>

        <View style={stys.formItemLayout}>
          <Text style={stys.formItemLabelTxt}>身份证号码</Text>
          <TextInput placeholderTextColor={"#D0D0D0"}
                     style={stys.txtInputLayout}
                     keyboardType={"default"}
                     maxLength={30}
                     value={authFormState.IDNum}
                     onChangeText={value => setAuthFormState({ ...authFormState, IDNum: value })}
                     multiline={true}
                     placeholder={"请输入身份证号码"} />
        </View>

        <TouchableOpacity style={stys.formItemLayout}
                          activeOpacity={.6}
                          onPress={() => datePickerRef.current.showPopup()}>
          <Text style={stys.formItemLabelTxt}>身份证到期时间</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: xTd(12), color: authFormState.expirationDate ? "black" : "#D0D0D0" }}>
              {formatDate(authFormState.expirationDate, "YYYY-MM-DD") || `请选择时间`}
            </Text>
            <ArrowIcon />
          </View>
        </TouchableOpacity>

        <View style={stys.formItemLayout}>
          <Text style={stys.formItemLabelTxt}>身份证地址</Text>
          <TextInput placeholderTextColor={"#D0D0D0"}
                     placeholder={"请输入身份证地址"}
                     value={authFormState.address}
                     onChangeText={value => setAuthFormState({ ...authFormState, address: value })}
                     multiline={true}
                     style={stys.txtInputLayout} />
        </View>
      </View>
    </View>

    <DatePickerPopup ref={datePickerRef} mode={"date"}
                     onConfirm={(value) => setAuthFormState({
                       ...authFormState,
                       expirationDate: value,
                     })}
                     onCancel={(value) => {
                     }} />
  </>;
});

const stys = StyleSheet.create({
  txtInputLayout: {
    fontSize: xTd(13),
    width: "50%",
    textAlign: "right",
  },
  formItemLabelTxt: {
    color: "black",
  },
  formItemLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: xTd(50),
  },
  formContentLayout: {
    padding: xTd(10),
    backgroundColor: "white",
    borderRadius: xTd(12),
    marginTop: xTd(2),
  },
  titleTxt: {
    fontSize: xTd(12),
  },
  layout: {
    paddingHorizontal: xTd(15),
  },
});
