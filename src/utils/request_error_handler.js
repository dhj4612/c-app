import { removeAuthorization } from "./user";
import { RESPONSE_TYPE } from "../const";
import { replace, Routers } from "../navigation";
import { toastMessage } from "./tools";

const UN_LOGIN = 401;
const UN_AUTH = 403;
const SERVICE_NOT_FOUND = 503;
const SERVER_ERR = 500;

const handlerOkResp = async response => {
  const data = response?.data?.data;
  if (data === "已注销") {
    toastMessage("当前账号已被注销");
    await removeAuthorization();
    replace(Routers.Login.name);
  } else {
    toastMessage(data || "未知错误");
  }
};
const handlerErrResp = async errResponse => {
  const response = errResponse?.response || errResponse;
  if (!response) {
    toastMessage("网络连接失败");
    return;
  }
  if (response?.status === UN_AUTH || response?.data === "未登录") {
    toastMessage("请重新登录");
    await removeAuthorization();
    replace(Routers.Login.name);
    return;
  }
  if (response?.status === SERVER_ERR) {
    toastMessage("系统繁忙，请稍后再试");
    return;
  }
  return toastMessage(JSON.stringify(errResponse?.response?.data || "未知错误")
    .replaceAll("\"", ""));
};
export const handlerErr = async (e = {}, msgKey = "data", config = {}) => {
  if (e.type === RESPONSE_TYPE.OK_TYPE) {
    await handlerOkResp(e?.response);
  } else {
    await handlerErrResp(e?.response);
  }
};
