export const isDev = false;

export const getBasePageUrlByEnv = () => isDev ? "https://userapp.wz.chengxuexinfu.com" : "https://capp.chengxuexinfu.com";
// export const getBasePageUrlByEnv = () => isDev ? "http://192.168.1.15:5820" : "https://c.chengxuexinfu.com";
// export const getBasePageUrlByEnv = () => isDev ? "http://192.168.130.220:5820" : "https://c.chengxuexinfu.com";
// export const getBasePageUrlByEnv = () => isDev ? "https://user.wz.chengxuexinfu.com" : "https://c.chengxuexinfu.com";
export const getBaseApiUrlByEnv = () => isDev ? "https://user.wz.chengxuexinfu.com" : "https://c.chengxuexinfu.com";
export const getCustomServiceLinkByEnv = () => isDev ? "https://tb.53kf.com/code/client/5d83222b892d80dafa74fd3abeae0c3c3/1" : "https://tb.53kf.com/code/client/5d83222b892d80dafa74fd3abeae0c3c3/1";
