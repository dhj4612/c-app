import { getAuthorization, hasAuthorization, removeAuthorization } from "../utils/user";
import { rn_navigation } from "./rn_navigation";
import { web_view_navigation } from "./webview_navigation";
import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { toUrlParam } from "../utils/tools";

export const Routers = {
  ...rn_navigation,
  ...web_view_navigation,
};

export const navigationRef = createNavigationContainerRef();

const authCheck = (name) => {
  const page = Routers[name];
  if (!page || !page.meta) {
    return Promise.resolve();
  }
  return new Promise(async (resolve, reject) => {
    if (Routers[name].meta.auth) {
      await hasAuthorization() ? resolve() : reject();
      return;
    }
    resolve();
  });
};
const handlerNotAuth = async () => {
  await removeAuthorization();
  navigationRef.dispatch(StackActions.replace(Routers.Login.name));
};
export const push = (name, params) => {
  authCheck(name)
    .then(() => navigationRef.dispatch(StackActions.push(name, params)))
    .catch(() => handlerNotAuth());
};
export const replace = (name, params) => {
  authCheck(name)
    .then(() => navigationRef.dispatch(StackActions.replace(name, params)))
    .catch(() => handlerNotAuth());
};

export const navigate = (name, params) => {
  authCheck(name)
    .then(() => navigationRef.navigate(name, params))
    .catch(() => handlerNotAuth());
};
export const goBack = () => navigationRef.goBack();
export const popToTop = () => navigationRef.dispatch(StackActions.popToTop);

export const jump = (nav, name, params) => {
  nav.jumpTo(nav, params);
};

export const navigateWebViewLoadAuthorization = async (name, parmas = {}) => navigate(name, {
  ...parmas,
  url: toUrlParam({ token: await getAuthorization() }),
});
