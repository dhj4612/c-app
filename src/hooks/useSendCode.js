import { useState } from "react";
import { toastMessage } from "../utils/tools";

/**
 *
 * @param sendCodeApi
 * @param text
 * @param duration
 * @param textProcessor
 * @param sentCallBack
 * @param afterCallBack
 * @return {{sendCode: (function(*): Promise<unknown>), disableState: boolean, sendBtnTxt: string}}
 */
export const useSendCode = ({
                              sendCodeApi,
                              text = "发送验证码",
                              duration = 60,
                              textProcessor = value => `${value}`,
                              sentCallBack = result => undefined,
                              afterCallBack = () => undefined,
                            }) => {
  let sendCodeIntervalId;
  const [sendBtnTxt, setSendBtnTxt] = useState(text);
  const [disableState, setDisableState] = useState(false);

  function sendCode(phone) {
    if (!sendCodeApi) {
      toastMessage("验证码发送失败");
      return;
    }
    return new Promise(async (resolve, reject) => {
      try {
        if (disableState) {
          return;
        }
        setDisableState(true);
        let countDown = duration;
        const result = await sendCodeApi(phone);
        sentCallBack(result);
        setSendBtnTxt(textProcessor(`${countDown}`));
        sendCodeIntervalId = setInterval(() => {
          if (countDown === 0) {
            setDisableState(false);
            setSendBtnTxt("发送验证码");
            clearInterval(sendCodeIntervalId);
            afterCallBack();
            return;
          }
          countDown--;
          setSendBtnTxt(textProcessor(`${countDown}`));
        }, 1000);
        resolve();
      } catch (e) {
        setDisableState(false);
        setSendBtnTxt("发送验证码");
        reject(e);
      }
    });
  }

  return {
    sendBtnTxt, disableState, sendCode,
  };
};
