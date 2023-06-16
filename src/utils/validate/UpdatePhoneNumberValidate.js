import { FormValidate, ValidateMode } from "../form_validate";
import { PHONE_NUMBER_REG } from "../../const/reg_const";

const validatorConfig = FormValidate.builderRules([
  {
    key: "oldPhone",
    name: "原手机号",
    rules: [
      { mode: ValidateMode.require, errMessage: "请输入原手机号" },
      { mode: ValidateMode.regex, regex: PHONE_NUMBER_REG, errMessage: "原手机号格式错误" },
      {
        mode: ValidateMode.validator, validator: async (value, formState) => {
          if (Object.is(value, formState.newPhone)) {
            return Promise.reject("原手机号不能与新手机号一致");
          }
          return Promise.resolve();
        },
      },
    ],
  },
  {
    key: "newPhone",
    name: "新手机号",
    rules: [
      { mode: ValidateMode.require, errMessage: "请输入新手机号" },
      { mode: ValidateMode.regex, regex: PHONE_NUMBER_REG, errMessage: "新手机号格式错误" },
      {
        mode: ValidateMode.validator, validator: async (value, formState) => {
          if (Object.is(value, formState.oldPhone)) {
            return Promise.reject("新手机号不能与原手机号一致");
          }
          return Promise.resolve();
        },
      },
    ],
  },
  {
    key: "verifyCode",
    name: "验证码",
    rules: [
      { mode: ValidateMode.require, errMessage: "请输入验证码" },
      { mode: ValidateMode.regex, regex: /^\d{4}|\d{6}$/, errMessage: "验证码格式错误" },
    ],
  },
]);

export const validateUpdatePhoneNumberForm = (formState) => FormValidate.createValidator(validatorConfig).validate(formState);
