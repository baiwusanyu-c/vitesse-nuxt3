/*
 * @tesxTsx.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/5/23)
 */
import { BeMsg } from "../components/be-ui/index";
export default () => {
  /**
   * 消息提示弹窗
   * @param title
   * @param content
   * @param className
   */
  const msgBox = (title: string, content: string, className: string): void => {
    BeMsg.service({
      titles: title,
      customClass: className,
      bodyRender: () => {
        return <p>{content}</p>;
      },
      footerRender() {
        return <div></div>;
      },
      iconPreRender() {
        return <div></div>;
      },
    });
  };
  return {
    msgBox,
  };
};
