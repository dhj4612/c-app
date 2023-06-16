import Toast from "react-native-root-toast";
import { Dimensions } from "react-native";
import { Decimal } from "decimal.js"; // https://lixingwu.gitee.io/decimal.js_cn/cn/index.html#
import dayjs from "dayjs";
import { navigate } from "../navigation";
import { exitLogin } from "./user";

const deviceWidthDp = Dimensions.get("window").width; // 设备实际宽度dp
const deviceHeightDp = Dimensions.get("window").height; // 设备实际高度dp

/**
 * 处理 webview 通信
 * @param e
 * @param nav
 * @param callback
 */
export const handlerPostMessage = (e, nav, callback) => {
  const { message } = JSON.parse(e.nativeEvent.data);
  if (message?.type === "back") {
    nav.goBack();
  } else if (message.type === "navigate") {
    navigate(message?.routeName, message?.params);
  } else if (message.type === "exitLogin") {
    exitLogin();
  } else if (message.type === "callback") {
    callback(e, message);
  }
};

/**
 * 深度查找目标元素
 */
export function deepFind(sourceData, targetKey, childrenName = "children") {
  let result = undefined;
  for (let i = 0; i < sourceData.length; i++) {
    const current = sourceData[i];
    if (current) {
      if (current.value === targetKey) {
        return current;
      } else {
        if (current[childrenName] && current[childrenName].length > 0) {
          result = deepFind(current[childrenName], targetKey, childrenName);
        }
      }
    }
  }
  return result;
}

/**
 * 扁平化深层次树型结构
 * @param sourseData 源数据
 * @param childrenName 子层级名称
 * @return {*[]} 返回扁平化后的结果
 */
export function deepFlatTree(sourseData, childrenName = "children") {
  const result = [];
  sourseData.forEach(item => {
    const tempItem = JSON.parse(JSON.stringify(item));
    const tempChildren = tempItem[childrenName];
    delete tempItem[childrenName];
    result.push(tempItem);
    if (tempChildren && tempChildren.length > 0) {
      result.push(...deepFlatTree(tempChildren));
    }
  });
  return result;
}

/**
 * 将 url 中的参数解析为对象 ?q=123456&a=b&a=c&a=%E5%AD%97%E7%AC%A6%E4%B8%B2split%E6%96%B9%E6%B3%95
 * @param url
 * @return {{}}
 */
export const urlParamsParse = (url) => {
  let result = {};
  let urlArr = url.split("?")[1].split("&");
  if (urlArr.length) {
    urlArr.forEach((item) => {
      let key = decodeURI(item.split("=")[0]);
      let value = decodeURI(item.split("=")[1]);
      if (key in result) {
        // key 重复时，合并 value
        let values = [];
        const preValue = result[key];
        if (Array.isArray(preValue)) {
          values.push(...result[key]);
        } else {
          values.push(...[value, preValue]);
        }
        result[key] = values;
      } else {
        result[key] = value;
      }
    });
  }
  return result;
};

/**
 * 将参数对象转化为url参数字符串
 *
 * @param params
 * @return {string}
 */
export const toUrlParam = (params = {}) => {
  if (!params || JSON.stringify(params) === "{}") {
    return "";
  }
  return "?" + Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join("&");
};

/**
 * 时间格式化，默认为 YYYY-MM-DD HH:mm:ss 格式
 * @param date
 * @param format
 * @return {string}
 */
export function formatDate(date, format = "YYYY-MM-DD HH:mm:ss") {
  if (!date) {
    return "";
  }
  return dayjs(date).format(format);
}

/**
 * 多数值求和（保证精度）
 * @param values
 * @return {number}
 */
export function multipleSum(values) {
  let initVal = 0;
  values.forEach(item => {
    if (item !== 0 && item !== "0") {
      initVal = Decimal.add(initVal, item).toNumber();
    }
  });
  return initVal;
}

/**
 * 精确比较两个数值的大小
 * @param ops1
 * @param ops2
 * @return {undefined|number} 1-[ops1 > ops2],0-[ops1 === ops2],-1-[ops1 < ops2]
 */
export function numericalAccurateCompare(ops1, ops2) {
  if ((!ops1 && Number(ops1).toString() !== "0") || (!ops2 && Number(ops2).toString() !== "0")) {
    return undefined;
  }
  return Decimal.sub(ops1, ops2).comparedTo(0);
}

/**
 * 屏幕宽度适配
 * @param uiEleDp 设计稿元素 dp
 * @param uiWidthDp 设计稿宽度 dp
 * @return {number}
 */
export const xTd = (uiEleDp, uiWidthDp = 375) => {
  return (deviceWidthDp / uiWidthDp) * uiEleDp;
};

/**
 * 屏幕高度适配
 * @param uiEleDp
 * @param uiHeightDp
 * @return {number}
 */
export const yTd = (uiEleDp, uiHeightDp = 667) => {
  return (deviceHeightDp / uiHeightDp) * uiEleDp;
};

/**
 * 格式化金额
 * @param money 值
 * @param maximumFractionDigits 使用的小数位数的最大数目，可能的值是从 0 到 20
 * @param minimumFractionDigits 使用的小数位数的最小数目，可能的值是从 0 到 20
 * @param minimumIntegerDigits 使用的整数数字的最小数目.可能的值是从1到21,默认值是1
 * @param useGrouping 是否使用分组分隔符，如千位分隔符或千/万/亿分隔符，默认为 true
 * @return {string}
 */
export const formatMoney = (money, minimumIntegerDigits = 1, minimumFractionDigits = 2, maximumFractionDigits = 2, useGrouping = true) => {
  return new Intl.NumberFormat("zh-CN", {
    style: 'currency',
    currency: 'CNY',
    currencyDisplay: 'symbol',
    useGrouping,
    minimumIntegerDigits,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(money);
};

/**
 * 格式化金额（带￥符号）
 * @param money 数值金额
 * @param useGrouping 是否使用分组符号
 * @param prefix 前缀
 * @param suffix 后缀
 * @return string
 */
export function formatAmountSymbol(money, useGrouping = true, prefix = '', suffix = '') {
  if (Number.isNaN(Number(money))) {
    return ''
  }
  if (money || money === 0) {
    return `${prefix}${formatMoney(money, 1, 2, 2, useGrouping)}${suffix}`
  }
  return ''
}

/**
 * 格式化金额，无符号
 * @param money
 * @param useGrouping 是否使用分组符号
 * @param prefix 前缀
 * @param suffix 后缀
 * @return string
 */
export function formatAmount(money, useGrouping = true, prefix = '', suffix = '') {
  if (Number.isNaN(Number(money))) {
    return ''
  }
  if (money || money === 0) {
    return `${prefix}${formatMoney(money, 1, 2, 2, useGrouping)
      .replaceAll('¥', '')}${suffix}`
  }
  return ''
}

/**
 * 轻提示
 * @param msg
 * @param config
 */
export const toastMessage = (msg = "", config = {}) => {
  Toast.show(msg, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    ...config,
  });
};

/**
 * 等待指定毫秒时间
 * @param delay
 * @return {Promise<unknown>}
 */
export function wait(delay = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
