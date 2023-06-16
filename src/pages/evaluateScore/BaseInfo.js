import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { xTd } from "../../utils/tools";
import ArrowIcon from "../../components/ArrowIcon";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PickerFormItem from "../../components/PickerFormItem";
import { useUserStore } from "../../hooks/useUserStore";
import { navigate, Routers } from "../../navigation";
import { CITY_DATA } from "../../const/city_data";
import { USER_AUTH_STATE } from "../../const";
import { CONTACT_RELATION, EDUCATION } from "../../const/index";

export default forwardRef((props, ref) => {
  const { userState, saveEvaluateFormData } = useUserStore();
  const [formState, setFormState] = useState({
    email: userState.evaluateFormData.email, // 邮箱
    currentProvince: userState.evaluateFormData.currentProvince,// 居住省份编码
    currentCity: userState.evaluateFormData.currentCity, // 居住城市编码
    currentAddress: userState.evaluateFormData.currentAddress, // 居住详细地址
    contactPerson2: userState.evaluateFormData.contactPerson2, // 紧急联系人
    contactPersonPhoneNumber2: userState.evaluateFormData.contactPersonPhoneNumber2, // 紧急联系人手机号
    relation2: userState.evaluateFormData.relation2, // 紧急联系人关系
    currentProvince2: userState.evaluateFormData.currentProvince2, // 紧急联系人居住省份编码
    currentCity2: userState.evaluateFormData.currentCity2, // 紧急联系人居住城市编码
    education: userState.evaluateFormData.education, // 最高学历
    qq: userState.evaluateFormData.qq, // qq
    weChat: userState.evaluateFormData.weChat, // 微信
  });
  const getFormData = () => {
    return {
      ...formState,
      realNameState: userState?.userInfo?.realNameState,
    };
  };

  useImperativeHandle(ref, () => {
    return {
      getFormData,
    };
  });

  const cityPickerRightTextProcessor = (value) => {
    if (!value || value.length === 0) return undefined;
    const cityCode = value[1];
    return CITY_DATA.flatMap(({ children }) => children).find(city => city.value === cityCode)?.label;
  };

  const goRealName = () => {
    if (userState?.userInfo?.realNameState === USER_AUTH_STATE.PENDING.code) return;
    if (userState?.userInfo?.realNameState === USER_AUTH_STATE.AUTH.code) {
      navigate(Routers.Certified.name);
    } else {
      navigate(Routers.Authentication.name);
    }
  };

  useEffect(() => {
    saveEvaluateFormData({ ...formState });
  }, [formState]);

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
                   multiline={false}
        />
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
                   style={stys.txtInputLayout}
        />
      </View>

      <TouchableOpacity style={stys.formItemLayout}
                        activeOpacity={.7}
                        onPress={() => goRealName()}>
        {renderFormLabel({ labelName: "实名认证" })}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontSize: xTd(13) }}>{USER_AUTH_STATE.getRealNameStateText(userState?.userInfo?.realNameState)}</Text>
          <ArrowIcon />
        </View>
      </TouchableOpacity>

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "紧急联系人姓名" })}
        <TextInput placeholder={"请输入紧急联系人姓名"}
                   value={formState.contactPerson2}
                   onChangeText={text => setFormState({ ...formState, contactPerson2: text })}
                   style={stys.txtInputLayout}
        />
      </View>

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "紧急联系人手机号" })}
        <TextInput placeholder={"请输入紧急联系人手机号"}
                   value={formState.contactPersonPhoneNumber2}
                   onChangeText={text => setFormState({ ...formState, contactPersonPhoneNumber2: text })}
                   style={stys.txtInputLayout}
        />
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
                   style={stys.txtInputLayout}
        />
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
