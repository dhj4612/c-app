import { toastMessage } from "./tools";

/**
 * 表单校验模式枚举
 */
export enum ValidateMode {
  require = "require_mode",
  regex = "regex_mode",
  validator = "validator_mode"
}

/**
 * 校验结果非法时对应处理器的类型定义
 */
type IllegalProcessorType = (value: any, errMessage: string) => void
/**
 * 自定义校验器的类型定义（异步校验将返回 Promise，否则直接返回布尔类型）
 */
type ValidatorType = (value: any) => Promise<boolean | string> | boolean

/**
 * 具体校验规则的类型定义
 */
type ValidateRule = {
  mode: ValidateMode,
  errMessage?: string,
  regex?: RegExp,
  validator?: ValidatorType,
  errProcessor?: IllegalProcessorType,
}

/**
 * 表单校验规则项类型定义
 */
type RuleItem = {
  key: string,
  name?: string,
  rules: ReadonlyArray<ValidateRule>
}

/**
 * 表单校验规则配置集类型定义
 */
type RulesConfig = ReadonlyArray<RuleItem>

/**
 * 表单校验辅助类
 */
export class FormValidate {
  #validateRules: RulesConfig = [];

  constructor(config: RulesConfig) {
    this.#validateRules = config;
  }

  /**
   * 校验结果非法时的默认处理器
   * @param value
   * @param errMessage
   * @private
   */
    // @ts-ignore
  static #defaultIllegalProcessor: IllegalProcessorType = (value: any, errMessage: string) => {
    toastMessage(errMessage);
  };

  /**
   * 不同表单校验模式对应的默认校验策略
   * @private
   */
  static #ValidateStrategyMap = {
    [ValidateMode.require]: (value: any): boolean => !!value,
    [ValidateMode.regex]: (value: any, reg: RegExp): boolean => reg.test(value),
    [ValidateMode.validator]: async (value: any, formState: any, validator: Function): Promise<boolean | string> => await validator(value, formState)
  };

  /**
   * 不同校验模式校验结果非法时，提供默认错误消息
   * @private
   */
  static #ValidateIIllegaMessageMap = {
    [ValidateMode.require]: (name: string | []) => `${Array.isArray(name) ? name.join("-") : name}不能为空`,
    [ValidateMode.regex]: (name: string | []) => `${Array.isArray(name) ? name.join("-") : name}格式不正确`,
    [ValidateMode.validator]: (name: string | []) => `${Array.isArray(name) ? name.join("-") : name}校验非法`
  };

  /**
   * 创建一个校验规则配置
   * @param config
   */
  static builderRules(config: RulesConfig) {
    return config;
  }

  /**
   * 根据自定义校验规则，创建一个校验器
   * @param config
   */
  static createValidator(config: RulesConfig) {
    return new FormValidate(config);
  }

  /**
   * 根据属性名称，查找对应的校验规则项
   * @param fieldName
   * @private
   */
  #findTargetRule = (fieldName: string): RuleItem | undefined => {
    return this.#validateRules.find(rule => Array.isArray(rule.key) ? rule.key.includes(fieldName) : rule.key === fieldName);
  }

  /**
   * 根据 fieldName 从指定源查找对应的值
   * @param fieldName
   * @param source
   * @private
   */
  #findTargetValue = (fieldName: string, source: any): any | undefined => {
    // TODO 方便后续拓展深度属性的查找，例如 user.realNameInfo.idCard 形式的 fieldName
    return source[fieldName];
  }

  /**
   * 校验目标数据
   * @param formState
   */
  async validate(formState: any): Promise<boolean> {
    try {
      if (this.#validateRules.length === 0) {
        return false;
      }
      const formStateKeys = Object.keys(formState);
      for (let i = 0; i < formStateKeys.length; i++) {
        const fieldKey = formStateKeys[i];
        const targetRule = this.#findTargetRule(fieldKey);
        if (!targetRule) {
          continue;
        }
        const value = this.#findTargetValue(fieldKey, formState);
        const rules = targetRule.rules;
        let result = false;
        for (let r = 0; r < rules.length; r++) {
          const rule = rules[r];
          const mode = rule.mode;
          const validateStrategy = FormValidate.#ValidateStrategyMap[mode];
          // TODO 应该按照校验模式分组校验（如先校验完所有 require 模式后再进行 regex 模式校验，以此类推）
          switch (mode) {
            case ValidateMode.require:
              // @ts-ignore
              result = validateStrategy(value);
              break;
            case ValidateMode.regex:
              if (!rule.regex) {
                console.warn("rule.regex cannot be undefined => form_validate.ts 130 line");
                break;
              }
              // @ts-ignore
              result = validateStrategy(value, rule.regex);
              break;
            case ValidateMode.validator:
              if (!rule.validator) {
                console.warn("rule.validator cannot be undefined => form_validate.ts 138 line");
                break;
              }
              try {
                // @ts-ignore
                await validateStrategy(value, formState, rule.validator);
                result = true;
              } catch (e: any) {
                // ignore
                rule.errMessage = rule.errMessage || e;
                result = false;
              }
              break;
          }
          if (!result) {
            const defaultErrMessage = FormValidate.#ValidateIIllegaMessageMap[mode](targetRule.name || targetRule.key);
            if (rule.errProcessor) {
              rule.errProcessor(value, rule.errMessage || defaultErrMessage);
            } else {
              FormValidate.#defaultIllegalProcessor(value, rule.errMessage || defaultErrMessage);
            }
            return false;
          }
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 根据参数类型，对其置空
   * @param value
   * @private
   */
  #emptying = (value: any) => {
    const type = typeof value;
    switch (type) {
      case "string":
        return "";
      case "function":
        return undefined;
      case "number":
        return undefined;
      case "object":
        return {};
      default:
        return undefined;
    }
  }

  /**
   * 返回一个新的目标数据，所有属性都被置空
   * @param formState
   * @private
   */
  resetFormState(formState: any): any {
    const copy = { ...formState };
    Object.keys(copy).forEach(key => copy[key] = this.#emptying(copy[key]));
    return copy;
  }
}
