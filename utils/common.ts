import { isArray, isObject, toRawType } from "@vue/shared";
// import { BeMessage } from '../../public/be-ui/be-ui.es'

export type IOption = Record<string, any>;
/**
 * id生成方法
 * @return {string}
 */
export const getUuid = (): string => {
  const s: Array<any> = [];
  const hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 36; i++)
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);

  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
};
/**
 * 获取url参数
 */
export const getUrlkey = function (): IOption {
  const params: IOption = {};
  const url = window.location.href;
  if (url.includes("?")) {
    // 判断如果请求地址中包含参数
    const urls = url.split("?");
    const arr = urls[1].split("&");
    for (let i = 0, l = arr.length; i < l; i++) {
      const a = arr[i].split("=");
      params[a[0]] = a[1];
    }
  }
  return params;
};

// 判空
export function isEmpty(val: unknown) {
  if (
    (!val && val !== 0) ||
    (isArray(val) && !Array(val).length) ||
    (isObject(val) && !Object.keys(Object(val)).length)
  )
    return true;

  return false;
}
// 清除定时器
export const clearTimer = (timer: any) => {
  clearTimeout(timer.value);
  timer.value = null;
};

/**
 * map转数组
 * @param map
 */
export const mapToArr = (map: any): Array<any> => {
  const list = [];
  for (const key of map) list.push(key[1]);

  return list;
};

export const arrDupRemov = (arr: Array<any>, key: string): Array<any> => {
  const newObj: any = {};
  return arr.reduce((preVal, curVal) => {
    newObj[curVal[key]] ? "" : (newObj[curVal[key]] = preVal.push(curVal));
    return preVal;
  }, []);
};
/**
 * 加法
 */
export const accAdd = (arg1: number, arg2: number): number => {
  let r1: number, r2: number;
  let m = 0;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = 10 ** Math.max(r1, r2);
  return (arg1 * m + arg2 * m) / m;
};
/*
 * 获取小数位数
 */
export const getMaxDecimalLength = (val: Array<number>): number => {
  // 最大小数位长度
  let maxDecimalLength = 0;
  val.forEach((x) => {
    const strVal = x.toString();
    const dotIndex = strVal.indexOf(".");
    if (dotIndex > -1) {
      // 获取当前值小数位长度
      const curDecimalLength = strVal.length - 1 - dotIndex;

      if (curDecimalLength > maxDecimalLength)
        maxDecimalLength = curDecimalLength;
    }
  });
  return maxDecimalLength;
};
/**
 * 减法
 */
export const accSub = (arg: Array<number>): number => {
  let sum = 0;
  const maxDecimalLength: number = getMaxDecimalLength(arg);
  arg.forEach((x: number, index: number) => {
    const nurVal = Math.round(x * 10 ** maxDecimalLength);

    if (index === 0) sum = nurVal;
    else sum -= nurVal;
  });

  return sum / 10 ** maxDecimalLength;
};

/**
 * 存储
 */
export const setStore = (name: string, content: string) => {
  if (!name) return;
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name: string): string | undefined => {
  if (!name) return;
  return window.localStorage.getItem(name) as string;
};
export const removeStore = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
export const clearStore = () => {
  window.localStorage.clear();
};
/**
 * 存储
 */
export const setSession = (name: string, content: string) => {
  if (!name) return;
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取SessionStorage
 */
export const getSession = (name: string) => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
};
export const removeSession = (name: string) => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};
export const clearSession = () => {
  window.sessionStorage.clear();
};
// 简单克隆
export const jsonClone = <T>(val: T): T => JSON.parse(JSON.stringify(val));
// 判定布尔
export const isBool = (val: unknown) => typeof val === "boolean";
// 判定字符串
export const isString = (val: unknown) =>
  typeof val == "string" && val.constructor == String;
// 判定数字
export const isNumber = (val: unknown) => typeof val === "number";
// 判定HTML元素
export const isHTMLElement = (val: unknown) =>
  toRawType(val).startsWith("HTML");
// 判定 是否是方法
export const isFunction = (val: unknown) =>
  Object.prototype.toString.call(val) === "[object Function]";
// 邮箱校验
export const verEmail = (val: string) => {
  return /^(\w)+((\.\w+)|(-\w+))*@(\w|-)+((\.\w+)+)$/.test(val);
};
// 时间格式化
export const formatDate = (timestamp: string, formats?: string) => {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || "Y-m-d H:i:s";

  const zero = function (value: any) {
    if (value < 10) return `0${value}`;

    return value;
  };

  // console.log(timestamp)

  // var myDate = timestamp ? new Date(timestamp): '';
  const myDate = timestamp ? new Date(timestamp) : null;

  let date = "";
  if (myDate) {
    const year = myDate.getFullYear();
    const month = zero(myDate.getMonth() + 1);
    const day = zero(myDate.getDate());

    const hour = zero(myDate.getHours());
    const minite = zero(myDate.getMinutes());
    const second = zero(myDate.getSeconds());
    date = formats.replace(/Y|m|d|H|i|s/gi, (matches) => {
      return {
        Y: year,
        m: month,
        d: day,
        H: hour,
        i: minite,
        s: second,
      }[matches];
    });
  } else {
    date = "--";
  }

  return date;
};
export const createDate = function createDate(
  dateStr?: string | Date | number
) {
  if (dateStr instanceof Date) return dateStr;

  if (dateStr && dateStr.constructor === String) {
    // 替换成ie支持的字符串
    return ieVersion() === -1
      ? new Date(dateStr)
      : new Date(dateStr.replace(/-/g, "/").replace(".000+0000", ""));
  } else if (dateStr && dateStr.constructor === Number) {
    return new Date(dateStr);
  } else {
    return new Date();
  }
};
/**
 * 获取浏览器信息
 * @param ua
 * @return {{browser: (string|string), version: (string|string)}|{browser: string, version: (string|string)}|{browser: string, version: string}}
 */
declare interface uaMatchRes {
  browser: string;
  version: string;
}
function uaMatch(ua: string): uaMatchRes {
  const rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
  const rFirefox = /(firefox)\/([\w.]+)/;
  const rOpera = /(opera).+version\/([\w.]+)/;
  const rChrome = /(chrome)\/([\w.]+)/;
  const rSafari = /version\/([\w.]+).*(safari)/;
  let match = rMsie.exec(ua);
  if (match != null) return { browser: "IE", version: match[2] || "0" };

  match = rFirefox.exec(ua);
  if (match != null)
    return { browser: match[1] || "", version: match[2] || "0" };

  match = rOpera.exec(ua);
  if (match != null)
    return { browser: match[1] || "", version: match[2] || "0" };

  match = rChrome.exec(ua);
  if (match != null)
    return { browser: match[1] || "", version: match[2] || "0" };

  match = rSafari.exec(ua);
  if (match != null)
    return { browser: match[2] || "", version: match[1] || "0" };

  return { browser: "", version: "0" };
}
// 浏览器信息
export const browserInfo = (): { browser: any; version: any } => {
  return uaMatch(navigator.userAgent.toLowerCase());
};
// 去除空格
export const trim = (str: string): string => {
  return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, "");
};
// 去收尾看看
export function trimStr(str: string | undefined): string {
  if (str === undefined) return "";
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
// 数字转百万M 100M
export function nFormatter(num: number, digits: number) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    /* { value: 1E9, symbol: "G" },
         { value: 1E12, symbol: "T" },
         { value: 1E15, symbol: "P" },
         { value: 1E18, symbol: "E" } */
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) break;
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

/**
 * 打开窗口
 * @param strUrl
 */
export const openWindow = (strUrl: string, winName = "_blank"): void => {
  // 模拟a标签点击，实现无糖浏览器下的新开tab
  const aDom = document.createElement("a");
  aDom.href = strUrl;
  aDom.target = winName;
  document.body.appendChild(aDom);
  aDom.click();
  document.body.removeChild(aDom);
};

/**
 * 判断浏览器版本
 */
export function ieVersion() {
  const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  const isIE = userAgent.includes("compatible") && userAgent.includes("MSIE"); // 判断是否IE<11浏览器
  const isEdge = userAgent.includes("Edge") && !isIE; // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.includes("Trident") && userAgent.includes("rv:11.0");
  if (isIE) {
    // let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    // reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion === 7) return 7;
    else if (fIEVersion === 8) return 8;
    else if (fIEVersion === 9) return 9;
    else if (fIEVersion === 10) return 10;
    else return 6; // IE版本<=7
  } else if (isEdge) {
    return "edge"; // edge
  } else if (isIE11) {
    return 11; // IE11
  } else {
    return -1; // 不是ie浏览器
  }
}

/**
 * 时间转 刚刚..
 * @param dateTimeStamp
 * @param lang
 */
export function formatTimeStamp(dateTimeStamp: number, lang: string) {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  let result = "";
  const now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  let gg = " 刚刚";
  let dq = " 天前";
  let sq = " 小时前";
  let fq = " 分钟前";
  let yesterday = "昨天";
  if (lang === "en_US") {
    gg = "Just happened";
    dq = " day ago";
    sq = " hour ago";
    fq = " minutes ago";
    yesterday = "yesterday";
  }
  result = gg;
  if (diffValue < 0) return (result = gg);

  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  if (parseInt(dayC.toString()) > 30)
    result = `${formatDD(createDate(dateTimeStamp), "yyyy-MM-dd")}`;
  else if (parseInt(dayC.toString()) > 1)
    result = `${parseInt(dayC.toString())}${dq}`;
  else if (parseInt(dayC.toString()) == 1) result = yesterday;
  else if (hourC >= 1) result = `${parseInt(hourC.toString())}${sq}`;
  else if (minC >= 1) result = `${parseInt(minC.toString())}${fq}`;

  return result;
}
function formatDD(date: string | Date, format: string) {
  if (typeof date == "string") {
    if (date.includes("T")) date = date.replace("T", " ");

    date = new Date(Date.parse(date.replace(/-/g, "/")));
  }
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  const w = [
    ["日", "一", "二", "三", "四", "五", "六"],
    ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  ];
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );

  if (/(w+)/.test(format))
    format = format.replace(RegExp.$1, w[RegExp.$1.length - 1][date.getDay()]);

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      const oVal = o[k as "M+" | "d+" | "h+" | "m+" | "s+" | "q+" | "S"];
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? oVal.toString()
          : `00${oVal.toString()}`.substr(oVal.toString().length)
      );
    }
  }
  return format;
}

// 北京时间转UTC时间
export const beijing2utc = (now: number | string, formats?: string) => {
  let timestamp;
  // 处理成为时间戳
  if (typeof now == "number") timestamp = createDate(now);
  else timestamp = createDate(Date.parse(now));

  timestamp = timestamp.getTime();
  timestamp = timestamp / 1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  timestamp = timestamp + createDate().getTimezoneOffset() * 60;
  // 时间戳转为时间
  // var utc_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  const tempTime = parseInt(timestamp.toString()) * 1000;
  return formatDate(createDate(tempTime).toString(), formats);
};

export const message = (
  type: string,
  info: string,
  className?: string
): void => {
  /* BeMessage.service({
    customClass: className,
    titles: info,
    msgType: type,
    duration: 2500,
    offsetTop: 80,
    close: true,
  }) */
};
/**
 * 文本复制
 * @param copyVal
 */
export const copyAddress = function copyAddress(copyVal: string) {
  const oInput = document.createElement("input");
  oInput.value = copyVal;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand("Copy");
  oInput.style.display = "none";
  document.body.removeChild(oInput);
  message(
    "success",
    getStore("language") === "en_US" ? "copy success!" : "已复制到粘贴板"
  );
};
/**
 * 模拟tofixed 实现保留小数点功能
 * @param num 数值
 * @param decimal 保留的位置
 * @returns {*}
 */
export const simulateToFixed = (num: number, decimal = 6) => {
  if (num === undefined) return;

  if (num.toString() === "0" && decimal !== 0) return "0.000000";

  const numInner = transferToNumber(num).toString();
  const index = numInner.indexOf(".");
  if (index === -1) return numInner;

  const decimalBeforeLenght = numInner.split(".")[1].length; // 获取小数点后位数
  if (decimalBeforeLenght <= decimal) {
    return numInner;
  } else {
    const minimumStr = "0.";
    const minimum = minimumStr.padEnd(decimal + 2, "0"); // 匹配小额资金规则
    const res =
      parseFloat(numInner).toFixed(decimal) === minimum
        ? minimum.toString()
        : parseFloat(numInner).toFixed(decimal);
    return res === "-0.000000" ? "0.000000" : res;
  }
};

/**
 * 科学计数法转化成小数点
 * @param inputNumber 数值
 * @returns Number
 */
export const transferToNumber = (inputNumber: any) => {
  if (isNaN(inputNumber)) return inputNumber;

  inputNumber = `${inputNumber}`;
  inputNumber = parseFloat(inputNumber);
  const eformat = inputNumber.toExponential(); // 转换为标准的科学计数法形式（字符串）
  const tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/); // 分离出小数值和指数值
  return inputNumber.toFixed(
    Math.max(0, (tmpArray[1] || "").length - tmpArray[2])
  );
};
// 數字轉都好分隔字符串 1123 =》'1,223'
export const numberToCommaString = (nStr: number): string => {
  const text = `${nStr}`;
  const x: Array<string> = text.split("."); // 按照小数点分隔
  let x1: string = x[0]; // 整数部分
  const x2: string = x.length > 1 ? `.${x[1]}` : ""; // 小数部分
  const rgx = /(\d+)(\d{3})/; // 正则式定义
  while (rgx.test(x1)) {
    // 正则式匹配
    x1 = x1.replace(rgx, "$1" + "," + "$2"); // 正则式替换
  }
  return x1 + x2;
};

export const catchErr = (err?: any): void => {
  message("error", err.message || err);
  console.error(err);
};
export function formatMoney(n: number): string {
  const regex = /\d{1,3}(?=(\d{3})+(\.|$))/g; // 替换规则
  const num = String(Math.round(n * 10 ** 2)); // 乘100 四舍五入
  const integer = num.substr(0, num.length - 2).replace(regex, "$&,"); // 最后两位前的为整数
  const decimal = num.substr(num.length - 2); // 最后两位为小数
  return decimal === "00" ? `${integer || 0}` : `${integer || 0}.${decimal}`;
}
// 还原金额
export function restoreMoney(s: string): number {
  const regex = /[^\d.-]/g;
  return Number(String(s).replace(regex, ""));
}
