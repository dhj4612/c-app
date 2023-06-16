import { StyleSheet, Text, TextInput, View } from "react-native";
import { xTd } from "../../utils/tools";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PickerFormItem from "../../components/PickerFormItem";
import { WORK_STATE } from "../../const";

export default forwardRef((props, ref) => {
  const { personalInfo } = props;
  const [formState, setFormState] = useState({
    currentAddress2: "", // 紧急联系人详细地址
    workCondition: undefined, // 工作状态
    studentPurposeString: "", // 学习意向
  });

  const getFormData = () => formState;

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

  const renderFormLabel = (props) => {
    const { labelName, require = true } = props;
    const stys = StyleSheet.create({
      layout: {
        flexDirection: "row", alignItems: "center", justifyContent: "center",
      }, requireMark: {
        color: "red",
      }, labelTxt: {
        fontSize: xTd(13),
      },
    });
    return <View style={stys.layout}>
      {require && <Text style={stys.requireMark}>*</Text>}
      <Text style={stys.labelTxt}>{labelName}</Text>
    </View>;
  };

  return <>
    <Text style={stys.titleTxt}>
      完善评估信息（选填）
    </Text>
    <View style={stys.layout}>
      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "紧急联系人详细地址", require: false })}
        <TextInput placeholder={"请输入详细地址"}
                   value={formState.currentAddress2}
                   onChangeText={text => setFormState({ ...formState, currentAddress2: text })}
                   style={stys.txtInputLayout}
        />
      </View>

      <PickerFormItem data={WORK_STATE}
                      pickerTitle={null}
                      cols={1}
                      require={false}
                      value={[formState.workCondition]}
                      onConfirm={(value) => setFormState({ ...formState, workCondition: value[0] })}
                      rightTextProcessor={value => PickerFormItem.singleColumesRightTextProcessor(value, WORK_STATE)}
                      labelName={"工作状态"} />

      <View style={stys.formItemLayout}>
        {renderFormLabel({ labelName: "近期学习意向", require: false })}
        <TextInput placeholder={"近期学习意向"}
                   value={formState.studentPurposeString}
                   onChangeText={text => setFormState({ ...formState, studentPurposeString: text })}
                   style={stys.txtInputLayout}
        />
      </View>
    </View>
  </>;
});


const stys = StyleSheet.create({
  txtInputLayout: {
    fontSize: xTd(13), width: "50%", textAlign: "right",
  }, formItemLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: xTd(50),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#D0D0D0",
  }, titleTxt: {
    fontSize: xTd(12), fontWeight: "bold", marginTop: xTd(15),
  }, layout: {
    width: "100%", paddingHorizontal: xTd(10), backgroundColor: "white", marginTop: xTd(2), borderRadius: xTd(12),
  },
});
