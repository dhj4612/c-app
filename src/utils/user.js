import { loadStore, removeStore, saveStore } from "./async_store";
import { replace, Routers } from "../navigation";

const auth_key = "token";
const syncStore = {};

export const initStore = async () => {
  syncStore[auth_key] = await getAuthorization();
};

export const setAuthorization = async (token) => {
  await saveStore(auth_key, token);
  syncStore[auth_key] = token;
};

export const removeAuthorization = async () => {
  await removeStore(auth_key);
  syncStore[auth_key] = undefined;
};

export const getAuthorization = async () => {
  return await loadStore(auth_key);
};

/**
 * 同步获取令牌，仅在登录成功后使用
 * @return {*}
 */
export const getAuthorizationSync = () => {
  return syncStore[auth_key];
}

export const hasAuthorization = async () => {
  const auth = await loadStore(auth_key);
  return !!auth;
};

export const exitLogin = async () => {
  await removeAuthorization();
  replace(Routers.Login.name);
};
