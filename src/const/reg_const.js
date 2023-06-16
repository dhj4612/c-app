/**
 * 手机号正则
 * @type {RegExp}
 */
export const PHONE_NUMBER_REG = /^1\d{10}$/;

/**
 * 验证码正则
 * @type {RegExp}
 */
export const VERIFY_CODE_REG = /^[0-9]{6}$/;

/**
 * 密码正则
 * @type {RegExp}
 */
export const PASSWORD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,13}$/;


/**
 * url正则
 * @type {RegExp}
 */
export const URL_REG = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;

/**
 * 邮箱正则
 */
export const EMAIL_REG = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

/**
 * QQ正则
 */
export const QQ_REG = /^[1-9][0-9]{4,14}$/;

/**
 * 微信正则
 */
export const WE_CHAT_REG = /^([a-zA-Z][a-zA-Z\d_-]{5,19})|((?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|3|5|8|9]))\d{8})$/;

