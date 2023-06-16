import { StyleSheet, Text, TextInput, View } from "react-native";
import { xTd } from "../../utils/tools";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PickerFormItem from "../../components/PickerFormItem";
import { CITY_DATA } from "../../const/city_data";
import { CONTACT_RELATION, EDUCATION } from "../../const/index";

export default forwardRef((props, ref) => {
  const { personalInfo } = props;
  const [formState, setFormState] = useState({
    email: "", // 邮箱
    currentProvince: undefined,// 居住省份编码
    currentCity: undefined, // 居住城市编码
    currentAddress: "", // 居住详细地址
    contactPerson2: "", // 紧急联系人
    contactPersonPhoneNumber2: "", // 紧急联系人手机号
    relation2: undefined, // 紧急联系人关系
    currentProvince2: undefined, // 紧急联系人居住省份编码
    currentCity2: undefined, // 紧急联系人居住城市编码
    education: undefined, // 最高学历
    qq: "", // qq
    weChat: "", // 微信
    twoElements: "", // 二要素
  });
  const getFormData = () => {
    return {
      ...formState,
    };
  };

  useImperativeHandle(ref, () => {
    return {
      getFormData,
    };
  });

  useEffect(() => {
    const copy = { ...formState };
    if (Object.keys(personalInfo).length === 0) {
      return;
    }
    Object.keys(copy).forEach(key => copy[key] = personalInfo[key]);
    setFormState(copy)
  }, [personalInfo]);
  const cityPickerRightTextProcessor = (value) => {
    if (!value || value.length === 0) return undefined;
    const cityCode = value[1];
    return CITY_DATA.flatMap(({ children }) => children).find(city => city.value === cityCode)?.label;
  };

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

  return <>
    <Text style={stys.titleTxt}>基本信息评估（必填）</Text>
    <View style={stys.layout}>
      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "邮箱" })}
        <TextInput placeholder={"请输入您的邮箱"}
                   value={formState.email}
                   onChangeText={text => setFormState({ ...formState, email: text })}
                   style={stys.txtInputLayout}
                   multiline={false} />
      </View>

      <PickerFormItem data={CITY_DATA}
                      cols={2}
                      pickerTitle={null}
                      value={[formState.currentProvince, formState.currentCity]}
                      onConfirm={(value) => setFormState({
                        ...formState, currentProvince: value[0], currentCity: value[1],
                      })}
                      rightTextProcessor={cityPickerRightTextProcessor}
                      labelName={"居住城市"} />

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "详细地址" })}
        <TextInput placeholder={"请输入详细地址"}
                   value={formState.currentAddress}
                   onChangeText={text => setFormState({ ...formState, currentAddress: text })}
                   style={stys.txtInputLayout} />
      </View>

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "紧急联系人姓名" })}
        <TextInput placeholder={"请输入紧急联系人姓名"}
                   value={formState.contactPerson2}
                   onChangeText={text => setFormState({ ...formState, contactPerson2: text })}
                   style={stys.txtInputLayout} />
      </View>

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "紧急联系人手机号" })}
        <TextInput placeholder={"请输入紧急联系人手机号"}
                   value={formState.contactPersonPhoneNumber2}
                   onChangeText={text => setFormState({ ...formState, contactPersonPhoneNumber2: text })}
                   style={stys.txtInputLayout} />
      </View>

      <PickerFormItem data={CONTACT_RELATION}
                      pickerTitle={null}
                      cols={1}
                      value={[formState.relation2]}
                      onConfirm={(value) => setFormState({ ...formState, relation2: value[0] })}
                      rightTextProcessor={value => PickerFormItem.singleColumesRightTextProcessor(value, CONTACT_RELATION)}
                      labelName={"紧急联系人关系"} />

      <PickerFormItem data={CITY_DATA}
                      cols={2}
                      pickerTitle={null}
                      value={[formState.currentProvince2, formState.currentCity2]}
                      onConfirm={(value) => setFormState({
                        ...formState,
                        currentProvince2: value[0],
                        currentCity2: value[1],
                      })}
                      rightTextProcessor={cityPickerRightTextProcessor}
                      labelName={"紧急联系人居住地址"} />

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "QQ" })}
        <TextInput placeholder={"请输入您的QQ号码"}
                   style={stys.txtInputLayout}
                   value={formState.qq}
                   onChangeText={text => setFormState({ ...formState, qq: text })}
        />
      </View>

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "微信" })}
        <TextInput placeholder={"请输入您的微信号码"}
                   value={formState.weChat}
                   onChangeText={text => setFormState({ ...formState, weChat: text })}
                   style={stys.txtInputLayout} />
      </View>

      <PickerFormItem data={EDUCATION}
                      pickerTitle={null}
                      cols={1}
                      styles={[stys.formItemLayout, { borderBottomWidth: 0 }]}
                      value={[formState.education]}
                      onConfirm={(value) => setFormState({ ...formState, education: value[0] })}
                      rightTextProcessor={value => PickerFormItem.singleColumesRightTextProcessor(value, EDUCATION)}
                      labelName={"最高学历"} />
    </View>
  </>;
});

const stys = StyleSheet.create({
  txtInputLayout: {
    fontSize: xTd(13),
    width: "50%",
    textAlign: "right",
  },
  formItemLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: xTd(50),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#D0D0D0",
  },
  titleTxt: {
    fontSize: xTd(12),
    fontWeight: "bold",
    marginBottom: xTd(2),
  },
  layout: {
    width: "100%",
    paddingHorizontal: xTd(10),
    backgroundColor: "white",
    borderRadius: xTd(12),
  },
});
