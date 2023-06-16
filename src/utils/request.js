import axios from "axios";
import { getAuthorization, hasAuthorization } from "./user";
import { getBaseApiUrlByEnv } from "./env";
import { RESPONSE_TYPE } from "../const";

const instance = axios.create({
  baseURL: `${getBaseApiUrlByEnv()}/api`, timeout: 30000,
});

// 请求拦截器，主要用于携带 token
instance.interceptors.request.use(async config => {
  if (await hasAuthorization()) {
    config.headers["token"] = `${await getAuthorization()}`;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
  return handlerOkResp(response);
}, function(errResponse) {
  return handlerErrResp(errResponse);
});

export function get(url, params) {
  return instance.get(url, {
    params,
  });
}

export function post(url, data, config) {
  return instance.post(url, data, config);
}

export function postForm(url, data, config) {
  return instance.post(url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }, ...config,
  });
}

export function postFile(url, data, config) {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  return post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }, ...config,
  });
}

/**
 * 处理接口响应结果
 * @param response 响应体
 * @return {Promise<never>|Promise<unknown>}
 */
async function handlerOkResp(response) {
  return response?.data?.status ?
    Promise.resolve(response.data.data) :
    Promise.reject({ response, type: RESPONSE_TYPE.OK_TYPE });
}

/**
 * 处理请求异常结果
 * @param errResponse
 * @return {Promise<never>}
 */
async function handlerErrResp(errResponse) {
  return Promise.reject({ response: errResponse, type: RESPONSE_TYPE.ERR_TYPE });
}
