import { FormValidate, ValidateMode } from "../form_validate";
import { PASSWORD_REG, PHONE_NUMBER_REG, VERIFY_CODE_REG } from "../../const/reg_const";

const validatorConfig = FormValidate.builderRules([
  {
    key: "phone",
    name: "手机号",
    rules: [
      { mode: ValidateMode.require },
      { mode: ValidateMode.regex, regex: PHONE_NUMBER_REG, errMessage: "手机号状态异常，请重新登录后尝试" },
    ],
  },
  {
    key: "newPassword",
    name: "新密码",
    rules: [
      { mode: ValidateMode.require },
      { mode: ValidateMode.regex, regex: PASSWORD_REG, errMessage: "新密码由6-13位数字和字母组成" },
      {
        mode: ValidateMode.validator, validator: async (value, formState) => {
          if (!Object.is(value, formState.confirmPassword)) return Promise.reject("两次密码需保持一致");
          return Promise.resolve();
        },
      },
    ],
  },
  {
    key: "confirmPassword",
    name: "确认密码",
    rules: [
      { mode: ValidateMode.require },
      { mode: ValidateMode.regex, regex: PASSWORD_REG, errMessage: "确认密码由6-13位数字和字母组成" },
      {
        mode: ValidateMode.validator, validator: async (value, formState) => {
          if (!Object.is(value, formState.newPassword)) return Promise.reject("两次密码需保持一致");
          return Promise.resolve();
        },
      },
    ],
  },
  {
    key: "verifyCode",
    name: "验证码",
    rules: [
      { mode: ValidateMode.require },
      { mode: ValidateMode.regex, regex: VERIFY_CODE_REG, errMessage: "请输入6位纯数字验证码" },
    ],
  },
]);

export const validateUpdatePasswordForm = (formState) => FormValidate.createValidator(validatorConfig).validate(formState);
