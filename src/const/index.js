/**
 * 根据 code 从指定 ref 对象中查找对应常量的公共方法
 * @param ref
 * @param code
 * @return {*|string|string}
 */
const getNameByCodeHelper = (ref, code) => {
  const stateList = ref.toList();
  if ((code || code === 0)) {
    const find = stateList.find(state => {
      const { code: codeItem } = state;
      if (Array.isArray(codeItem)) {
        return codeItem.includes(code);
      }
      return codeItem === code;
    });
    return find ? find.name : "";
  }
  return "";
};

/**
 * 用户验证码发送类型
 * @type {{REGISTER: number, LOGIN: number}}
 */
export const USER_SEND_CODE_TYPE = {
  LOGIN: 1,
  REGISTER: 2,
};

/**
 * 请求响应类型
 * @type {{OK_TYPE: string, ERR_TYPE: string}}
 */
export const RESPONSE_TYPE = {
  OK_TYPE: "OK",
  ERR_TYPE: "ERR",
};

/**
 * 工作状态
 */
export const WORK_STATE = [
  { label: "已工作", value: "0" },
  { label: "在院校就读", value: "1" },
  { label: "机构就读", value: "2" },
  { label: "时间自由", value: "3" },
];

/**
 * 学历
 */
export const EDUCATION = [
  { label: "初中及以下", value: "0" },
  { label: "高中/中专", value: "1" },
  { label: "大专", value: "2" },
  { label: "本科", value: "3" },
  { label: "硕士研究生", value: "4" },
  { label: "博士研究生以上", value: "5" },
];

/**
 * 紧急联系人关系
 */
export const CONTACT_RELATION = [
  { label: "配偶", value: "1" },
  { label: "父亲", value: "2" },
  { label: "母亲", value: "3" },
  { label: "兄弟姐妹", value: "4" },
];


/**
 * 实名认证方式
 * @type {{OPERATION: string}}
 */
export const AUTH_METHOD = {
  /**
   * 手动上传
   */
  OPERATION: "operation_upload",
  /**
   * 自动识别
   */
  AUTO_DISTINGUISH: "auto_distinguish",
};

/**
 * 身份证类型
 * @type {{}}
 */
export const ID_TYPE = {
  /**
   * 人像面
   */
  FACE: "id_face",

  /**
   * 国徽面
   */
  BACK: "id_back",
};

/**
 * 支付记录状态
 * @type {{}}
 */
export const PAY_RECORD_VO_STATE = {
  PENDING: {
    code: 0,
    name: "待支付",
  },
  PAY_IN: {
    code: 1,
    name: "支付中",
  },
  PAID: {
    code: 2,
    name: "已支付",
  },
  EXPIRED: {
    code: 3,
    name: "已失效",
  },
  CANCLE: {
    code: 4,
    name: "已撤销",
  },
  toList: function() {
    return Object.keys(this)
      .map(key => this[key])
      .filter(item => typeof item !== "function");
  },
  getNameByCode: function(code) {
    return getNameByCodeHelper(this, code);
  },
};


/**
 * 支付状态
 * @type {{}}
 */
export const PAY_VO_STATE = {
  PENDING_PAY: {
    code: 0,
    name: "待支付",
  },
  PAID: {
    code: [1, 5],
    name: "已支付",
  },
  OVERDUE: {
    code: 2,
    name: "已逾期",
  },
  DROP: {
    code: 3,
    name: "已退学",
  },
  PAY_IN: {
    code: 4,
    name: "支付中",
  },
  COLLECT_COMPLETE: {
    code: 6,
    name: "催收完成",
  },
  FROZEN: {
    code: 7,
    name: "冻结",
  },
  toList: function() {
    return Object.keys(this)
      .map(key => this[key])
      .filter(item => typeof item !== "function");
  },
  getNameByCode: function(code) {
    return getNameByCodeHelper(this, code);
  },
};


/**
 * 用户实名认证状态
 * @type {{}}
 */
export const USER_AUTH_STATE = {
  PENDING: {
    code: 0,
    name: "待审核",
  },
  AUTH_FAIL: {
    code: 1,
    name: "认证失败",
  },
  AUTH: {
    code: 2,
    name: "已认证",
  },
  INVALID: {
    code: 3,
    name: "已失效",
  },
  NO_AUTH: {
    code: null,
    name: "未认证",
  },
  toList: function() {
    return Object.keys(this)
      .map(key => this[key])
      .filter(item => typeof item !== "function");
  },
  getNameByCode: function(code) {
    return getNameByCodeHelper(this, code);
  },
  getRealNameStateText: function(state) {
    const realNameStateMap = {
      0: "待审核", 1: "认证失败", 2: "已实名", 3: "已失效", [null]: "去实名",
    };
    if (![null, 0, 1, 2, 3].includes(state)) return "-";
    return realNameStateMap[state];
  },
};

/**
 * 学员订单状态
 * @type {{}}
 */
export const ORDER_VO_STATE = {
  GO_PAY: {
    code: 1,
    name: "去支付",
  },
  HANDLER_FAIL: {
    code: [2, 5],
    name: "办理失败",
  },
  REVOKE_HANDLER: {
    code: 3,
    name: "撤销办理",
  },
  CORP_AUDIT: {
    code: 4,
    name: "机构审核中",
  },
  PENDING_SIGN: {
    code: [8, 10, 11, 12],
    name: "待签署协议",
  },
  PLATFORM_AUDIT: {
    code: 13,
    name: "平台审核中",
  },
  DROP_IN: {
    code: 14,
    name: "退学中",
  },
  DROP: {
    code: 15,
    name: "已退学",
  },
  PAY_FULL: {
    code: 16,
    name: "已付清",
  },
  OVERDUE: {
    code: 17,
    name: "已逾期",
  },
  VIDEO_AUDIT: {
    code: 23,
    name: "待录审",
  },
  toList: function() {
    return Object.keys(this)
      .map(key => this[key])
      .filter(item => typeof item !== "function");
  },
  getNameByCode: function(code) {
    return getNameByCodeHelper(this, code);
  },
};
