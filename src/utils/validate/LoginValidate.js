import { FormValidate, ValidateMode } from "../form_validate";
import { PASSWORD_REG, PHONE_NUMBER_REG, VERIFY_CODE_REG } from "../../const/reg_const";

/**
 * 根据登录方式构建登录参数校验器配置
 * @param loginType
 * @return {RuleItem[]}
 */
export const buildValidatorConfigByLoginType = (loginType) => {
  const commonConfig = FormValidate.builderRules([
    {
      key: "phone",
      name: "手机号",
      rules: [
        { mode: ValidateMode.require, errMessage: "请输入手机号" },
        { mode: ValidateMode.regex, regex: PHONE_NUMBER_REG, errMessage: "请输入正确的手机号" },
      ],
    },
  ]);
  if (loginType) {
    return [...commonConfig, ...FormValidate.builderRules([
      {
        key: "code",
        name: "验证码",
        rules: [
          { mode: ValidateMode.require, errMessage: "请输入验证码" },
          { mode: ValidateMode.regex, regex: VERIFY_CODE_REG, errMessage: "请输入6位纯数字验证码" },
        ],
      },
    ])];
  } else {
    return [...commonConfig, ...FormValidate.builderRules([
      {
        key: "password",
        name: "密码",
        rules: [
          { mode: ValidateMode.require, errMessage: "请输入密码" },
          { mode: ValidateMode.regex, regex: PASSWORD_REG, errMessage: "密码由6-13位数字和字母组成" },
        ],
      },
    ])];
  }
};
