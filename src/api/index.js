import { get, postForm } from "../utils/request";
import { USER_SEND_CODE_TYPE } from "../const";
import axios from "axios";
import { getBaseApiUrlByEnv } from "../utils/env";
import { getAuthorization } from "../utils/user";
import { Platform } from "react-native";

/**
 * 获取app对应平台最新版本号
 * @return {Promise<unknown>}
 */
export const fetchAppLatestVersionApi = () => {
  return new Promise((resolve, reject) => {
    get("/app/version/getLatestVersion", { platformCode: Platform.OS })
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 跳过录审
 * @param params
 * @return {Promise<unknown>}
 */
export const skipVideoReviewApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    get("/loanapplicationform/updateExamine", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 用户头像上传 api
 * @param file
 * @return {Promise<unknown>}
 */
export const uploadAvatarApi = (file = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let head_config = {
        headers: { "Content-Type": "multipart/form-data", "token": await getAuthorization() }, timeout: 600000,
      };
      const formData = new FormData();
      formData.append("file", file);
      const result = await axios.post(`${getBaseApiUrlByEnv()}/api/loginInfo/uploadAvatar`, formData, head_config);
      resolve(result.data.data);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * 修改密码
 * @param params
 * @return {Promise<unknown>}
 */
export const updatePasswordApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/loginInfo/updatePassword", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 修改密码发送验证码
 * @param phone
 * @return {Promise<unknown>}
 */
export const updatePasswordSendCodeApi = (phone) => {
  return new Promise((resolve, reject) => {
    postForm("/user/sendVerifyCode", { phone, type: 1 })
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 用户手机号修改
 * @param params
 * @return {Promise<unknown>}
 */
export const updatePhoneNumberApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/loginInfo/updatePhone", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 修改手机号发送验证码
 * @param phone
 * @return {Promise<unknown>}
 */
export const updatePhoneNumberSendCodeApi = (phone) => {
  return new Promise((resolve, reject) => {
    postForm("/user/sendModifyPhoneCode", { newPhone: phone })
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};


/**
 * 获取用户个人信息
 * @return {Promise<unknown>}
 */
export const fetchPersonalInfoApi = () => {
  return new Promise((resolve, reject) => {
    get("/userInfo/showUserInfo")
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 修改用户个人信息
 * @param params
 * @return {Promise<unknown>}
 */
export const updatePersonalInfoApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/userInfo/updateUserInfo", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 评估诚学分
 * @param params
 * @return {Promise<unknown>}
 */
export const assessScoreApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/credit/getScore", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 通过邀请码绑定机构
 * @param params
 * @return {Promise<unknown>}
 */
export const bindCorporationApi = (params) => {
  return new Promise((resolve, reject) => {
    get("/loginInfo/bindInviter", params)
      .then(() => resolve())
      .catch(e => reject());
  });
};

/**
 * 手动上传填写实名认证
 */
export const operationRealAuthenticationApi = (params) => {
  return new Promise((resolve, reject) => {
    postForm("/realauthentication/handAuthentication", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 图片上传实名认证
 * @param params
 */
export const realAuthenticationApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/realauthentication", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 获取用户实名信息
 * @return {Promise<unknown>}
 */
export const fetchAuthenicationApi = () => {
  return new Promise((resolve, reject) => {
    get("/realauthentication")
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 实名认证图片上传
 * @return {Promise<unknown>}
 */
export const uploadRealNameImgApi = (file = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let head_config = {
        headers: { "Content-Type": "multipart/form-data", "token": await getAuthorization() },
        timeout: 600000,
      };
      const formData = new FormData();
      formData.append("file", file);
      const result = await axios.post(`${getBaseApiUrlByEnv()}/api/upload/uploadfile/uploadRealName`, formData, head_config);
      resolve(result.data.data);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * 确认支付
 * @param params
 * @return {Promise<unknown>}
 */
export const confirmPayApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/pay/surePayment", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 发起支付
 * @param params
 * @return {Promise<unknown>}
 */
export const againPayApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/pay/againPay", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};


/**
 * 撤销订单
 * @param params
 * @return {Promise<unknown>}
 */
export const revokeOrderApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/pay/cancel", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 检测支付记录
 * @param params
 * @return {Promise<unknown>}
 */
export const checkPayRecordsApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/pay/againChecked", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};


/**
 * 获取支付记录列表
 * @param params
 * @return {Promise<unknown>}
 */
export const fetchPayRecordsApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    get("/pay/records", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 获取可支付的列表
 * @param params
 * @return {Promise<unknown>}
 */
export const fetchPayableListApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    get("/pay/list", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 获取支付列表
 * @param params
 * @return {Promise<unknown>}
 */
export const fetchPayListApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/pay/payList", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 查询协议链接
 * @param params
 * @return {Promise<unknown>}
 */
export const fetchAgreemnetApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    get("/assistanceAgreement/getSign", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 获取分期申请详情
 * @param params
 * @return {Promise<unknown>}
 */
export const fetchLoanDetailApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    get("/loanapplicationform/detail", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

export const fetchBillListApi = () => {
  return new Promise((resolve, reject) => {
    get("/loanapplicationform/processLoanapplicationform")
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 获取用户数据
 * @return {Promise<unknown>}
 */
export const fetchMineDataApi = () => {
  return new Promise((resolve, reject) => {
    get("/loginInfo/personalInfo")
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 获取首页数据
 * @param params
 * @return {Promise<unknown>}
 */
export const fetchHomeDataApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    get("/credit/integrityScoreRecord/getIntegrityScore", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 用户登录
 * @param params
 * @return {Promise<unknown>}
 */
export const loginApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/user/login", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 验证码登录
 * @param params
 * @return {Promise<unknown>}
 */
export const codeLoginApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/user/codeLogin", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 用户登录发送验证码
 * @param phone
 * @return {Promise<unknown>}
 */
export const loginSendCodeApi = (phone = "") => {
  const params = {
    phone, type: USER_SEND_CODE_TYPE.LOGIN,
  };
  return new Promise((resolve, reject) => {
    postForm("/user/sendVerifyCode", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 用户注册发送验证码
 * @param phone
 * @return {Promise<unknown>}
 */
export const registerSendCodeApi = (phone = "") => {
  const params = {
    phone, type: USER_SEND_CODE_TYPE.REGISTER,
  };
  return new Promise((resolve, reject) => {
    postForm("/user/sendVerifyCode", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};

/**
 * 用户注册
 * @param params
 * @return {Promise<unknown>}
 */
export const registerApi = (params = {}) => {
  return new Promise((resolve, reject) => {
    postForm("/user/register", params)
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};
