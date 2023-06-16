import { FormValidate, ValidateMode } from "../form_validate";
import { AUTH_METHOD } from "../../const";

/**
 * 根据身份验证模式生成校验配置
 * @param authType
 * @return {*|ReadonlyArray<RuleItem>}
 */
export const builderValidateRuleConfigByAuthMethod = (authType) => {
  let rules;
  const commonRuleCofig = FormValidate.builderRules([
    {
      key: "headPath",
      rules: [
        { mode: ValidateMode.require, errMessage: "请上传身份证人像面" },
      ],
    },
    {
      key: "nationalEmblemPath",
      rules: [
        { mode: ValidateMode.require, errMessage: "请上传身份证国徽面" },
      ],
    },
  ]);
  if (authType === AUTH_METHOD.AUTO_DISTINGUISH) {
    return commonRuleCofig;
  } else {
    const operationRules = FormValidate.builderRules([
      {
        key: "realName",
        rules: [
          { mode: ValidateMode.require, errMessage: "请输入正确的真实姓名" },
        ],
      },
      {
        key: "IDNum",
        rules: [
          { mode: ValidateMode.require, errMessage: "请输入身份证号" },
          {
            mode: ValidateMode.regex,
            regex: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            errMessage: "请输入正确的身份证号",
          },
        ],
      },
      {
        key: "expirationDate",
        rules: [
          { mode: ValidateMode.require, errMessage: "请选择身份证到期时间" },
        ],
      },
      {
        key: "address",
        rules: [
          { mode: ValidateMode.require, errMessage: "请输入身份证地址" },
        ],
      },
    ]);
    rules = [...commonRuleCofig, ...operationRules];
  }
  return rules;
};
