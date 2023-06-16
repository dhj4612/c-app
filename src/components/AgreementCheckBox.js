import { StyleSheet, Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { navigate, Routers } from "../navigation";
import React, { forwardRef, useImperativeHandle, useState } from "react";

export default forwardRef((props, ref) => {
  const { defaultValue } = props;
  const [checkbox, setCheckBox] = useState(!!defaultValue);

  useImperativeHandle(ref, () => {
    return {
      checkbox,
    };
  });

  return <View style={stys.checkboxLayout}>
    <CheckBox
      style={{
        transform: [{ scale: 0.9 }],
      }}
      disabled={false}
      tintColor={"#5f93ef"}
      tintColors={{
        true: "#5f93ef", false: "#5f93ef",
      }}
      value={checkbox}
      onValueChange={(newValue) => {
        if (newValue) {
          setCheckBox(true);
        }
      }}
    />
    <Text style={stys.checkboxTxt}>
      我已阅读并同意
      <Text onPress={() => {
        navigate(Routers.UserAgreeWebView.name);
      }} style={stys.agreeTxt}>《用户协议》</Text>
      与
      <Text onPress={() => {
        navigate(Routers.PrivacyWebView.name);
      }} style={stys.agreeTxt}>《隐私政策》</Text>
    </Text>
  </View>;
})

const stys = StyleSheet.create({
  checkboxLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  checkboxTxt: {
    fontSize: 12,
  },
  agreeTxt: {
    color: "#e6630c",
  },
});
