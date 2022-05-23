/*
 * @be-popover-type.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/9/8)
 */
import type { ComponentInternalInstance } from "vue";

export interface TPopoverStyle {
  left?: string;
  top?: string;
  width?: string;
}

export interface IPopover extends ComponentInternalInstance {
  uid: number;
}

export interface VirtualElement {
  getBoundingClientRect: () => ClientRect | DOMRect;
  contextElement?: Element;
}
