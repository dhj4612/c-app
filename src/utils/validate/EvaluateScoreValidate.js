import { FormValidate, ValidateMode } from "../form_validate";
import { EMAIL_REG, PHONE_NUMBER_REG, QQ_REG, WE_CHAT_REG } from "../../const/reg_const";

const validateConfig = FormValidate.builderRules([
  {
    key: "email",
    name: "邮箱",
    rules: [
      { mode: ValidateMode.require, errMessage: "请输入邮箱地址" },
      { mode: ValidateMode.regex, regex: EMAIL_REG, errMessage: "请输入正确的邮箱地址" },
    ],
  },
  {
    key: ["currentProvince", "currentCity"],
    name: "居住城市",
    rules: [
      { mode: ValidateMode.require, errMessage: "请选择居住城市" },
    ],
  },
  {
    key: "currentAddress",
    name: "居住详细地址",
    rules: [{ mode: ValidateMode.require, errMessage: "请输入居住详细地址" }],
  },
  {
    key: "contactPerson2",
    name: "紧急联系人姓名",
    rules: [{ mode: ValidateMode.require, errMessage: "请输入紧急联系人姓名" }],
  },
  {
    key: "contactPerson2",
    name: "紧急联系人姓名",
    rules: [{ mode: ValidateMode.require, errMessage: "请输入紧急联系人姓名" }],
  },
  {
    key: "contactPersonPhoneNumber2",
    name: "紧急联系人手机号",
    rules: [
      { mode: ValidateMode.require, errMessage: "请输入紧急联系人手机号" },
      { mode: ValidateMode.regex, regex: PHONE_NUMBER_REG, errMessage: "请输入正确的紧急联系人手机号" },
    ],
  },
  {
    key: "relation2",
    name: "紧急联系人关系",
    rules: [{ mode: ValidateMode.require, errMessage: "请选择紧急联系人关系" }],
  },
  {
    key: ["currentProvince2", "currentCity2"],
    name: "紧急联系人居住地址",
    rules: [{ mode: ValidateMode.require, errMessage: "请选择紧急联系人居住地址" }],
  },
  {
    key: "education",
    name: "最高学历",
    rules: [{ mode: ValidateMode.require, errMessage: "请选择最高学历" }],
  },
  {
    key: "qq",
    name: "QQ",
    rules: [
      { mode: ValidateMode.require, errMessage: "请输入QQ号" },
      { mode: ValidateMode.regex, regex: QQ_REG, errMessage: "请输入正确的QQ号" },
    ],
  },
  {
    key: "weChat",
    name: "微信",
    rules: [
      { mode: ValidateMode.require, errMessage: "请输入微信号" },
      { mode: ValidateMode.regex, regex: WE_CHAT_REG, errMessage: "请输入正确的微信号" },
    ],
  },
]);

export const validateEvaluateScoreForm = (formData) => {
  return FormValidate.createValidator(validateConfig).validate(formData);
};
