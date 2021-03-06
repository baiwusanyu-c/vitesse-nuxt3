import { computed, defineComponent, getCurrentInstance } from "vue";
import { isObject } from "@vue/shared";
import type { PropType } from "vue";
import type {
  IProgressColor,
  IProgressInst,
  IProgressSuccess,
} from "./be-progress-type";

type IOption = Record<string, any>;
export default defineComponent({
  name: "BeProgress",
  props: {
    type: {
      type: String,
      default: "line",
    },
    trailColor: {
      type: String,
      default: "",
    },
    color: {
      type: [String, Object] as PropType<IProgressColor>, // 漸變支支持line
      default: "" as IProgressColor,
    },
    showInfo: {
      type: Boolean,
      default: true,
    },
    percent: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "normal", // error | normal | success
    },
    strokeLinecap: {
      type: String,
      default: "round", // square | round
    },
    strokeWidth: {
      type: Number,
      default: 6,
    },
    success: {
      type: Object as PropType<IProgressSuccess>,
    },

    width: {
      type: Number,
      default: 132,
    },
    gap: {
      type: Number,
      default: 75,
    },
    gapPosition: {
      type: String,
      default: "bottom", // top | bottom | left | right
    },
  },
  setup(props) {
    // 當前實例
    const internalInstance = getCurrentInstance() as IProgressInst;
    const innerStrokeWidth = computed(() => {
      // type="line"
      if (
        props.type === "line" &&
        !props.strokeWidth &&
        props.strokeWidth !== 0
      )
        return 10;

      // type="circle"
      if (
        (props.type === "circle" || props.type === "dashboard") &&
        !props.strokeWidth &&
        props.strokeWidth !== 0
      )
        return 6;

      return props.strokeWidth;
    });

    /** ***************************** type="line" *************************/
    // 根据props 设置相关样式
    const innerStyleTypeLine = computed(() => {
      return setStyleTypeLine();
    });
    const setStyleTypeLine = (): IOption => {
      const styleIns: IOption = {
        backgroundImage: "",
        backgroundColor: "",
        width: "",
        height: "",
      };
      if (isObject(props.color))
        styleIns.backgroundImage = `linear-gradient(to right, ${props.color.from} 0%, ${props.color.to} 100%)`;
      else styleIns.backgroundColor = props.color;

      styleIns.width = `${props.percent >= 100 ? 100 : props.percent}%`;
      styleIns.height = `${innerStrokeWidth.value}px`;
      return styleIns;
    };
    /**
     * 超过一百显示为 success 的status
     */
    const innerStyleStatus = computed(() => {
      if (props.percent >= 100) return "success";
      else return props.status;
    });

    /** ***************************** type="circle"  | type="dashboard" *************************/
    /**
     * 設置畫布大小
     */
    const setCircleContainerStyle = computed(() => {
      if (props.type === "circle" || props.type === "dashboard") {
        return {
          width: `${props.width}px`,
          height: `${props.width}px`,
        };
      }
      return {};
    });
    const relativeStrokeWidth = computed(() => {
      //
      return ((innerStrokeWidth.value! / props.width) * 100).toFixed(1);
    });
    const radius = computed(() => {
      if (props.type === "circle" || props.type === "dashboard")
        return parseInt(
          `${50 - parseFloat(relativeStrokeWidth.value) / 2}`,
          10
        );
      else return 0;
    });

    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      const pathM = "M 50 50";
      const pathA = `a ${r} ${r} 0 1 1`;
      if (isDashboard) {
        if (props.gapPosition === "bottom")
          return `${pathM} m 0 ${r} ${pathA} 0 -${r * 2} ${pathA} 0 ${r * 2}`;

        if (props.gapPosition === "left")
          return `${pathM} m -${r} 0 ${pathA} ${r * 2} 0 ${pathA} -${r * 2} 0`;

        if (props.gapPosition === "right")
          return `${pathM} m ${r} 0 ${pathA} -${r * 2} 0 ${pathA} ${r * 2} 0`;
      }
      return `${pathM} m 0 -${r} ${pathA} 0 ${r * 2} ${pathA} 0 -${r * 2}`;
    });
    // 计算周长
    const perimeter = computed(() => {
      return 2 * Math.PI * radius.value;
    });

    const rate = computed(() => {
      return props.type === "dashboard" ? props.gap / 100 : 1;
    });

    const strokeDashoffset = computed(() => {
      const offset = (-1 * perimeter.value * (1 - rate.value)) / 2;
      return `${offset}px`;
    });
    /**
     * 設置軌道樣式
     */
    const trailPathStyle = computed(() => {
      return {
        strokeDasharray: `${perimeter.value * rate.value}px, ${
          perimeter.value
        }px`,
        strokeDashoffset: strokeDashoffset.value,
      };
    });
    /**
     * 設置環形樣式
     */
    const circlePathStyle = computed(() => {
      return createCirclePathStyle(props.percent);
    });
    /**
     * 生成環形樣式
     */
    const createCirclePathStyle = (percent: number): IOption => {
      return {
        strokeDasharray: `${
          perimeter.value * rate.value * (percent / 100)
        }px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value,
        transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease",
      };
    };
    const circlePathColor = computed(() => {
      if ((props.status === "normal" && !props.color) || isObject(props.color))
        return "rgba(64, 158, 255, .94)";

      if (props.status === "error" && !props.color) return "#F14E53FF";

      if (props.status === "success" && !props.color) return "#22C416FF";

      return props?.color || "rgba(64, 158, 255, .94)";
    });
    /** ***************************** success配置进度条部分 *************************/
    /**
     * 渲染success配置进度条部分
     */
    const renderSuccess = (): JSX.Element | undefined => {
      if (
        isObject(props.success) &&
        props.success.color &&
        props.success.percent &&
        props.type === "line"
      ) {
        return (
          <div
            class={`
                                             be-progress-line-path
                                             be-progress-line-path__success
                                             ${
                                               props.strokeLinecap === "round"
                                                 ? "be-progress-line-path__round"
                                                 : ""
                                             }
                                             `}
            style={innerStyleTypeLineSuccess.value}
          ></div>
        );
      }
      if (
        isObject(props.success) &&
        props.success.color &&
        props.success.percent &&
        (props.type === "circle" || props.type === "dashboard")
      ) {
        return (
          <path
            class="be-progress-circle__success"
            d={trackPath.value}
            stroke={innerStyleTypeLineSuccess.value.color}
            fill="none"
            strokeLinecap={props.strokeLinecap as "round" | "square"}
            strokeWidth={relativeStrokeWidth.value}
            style={circleSuccessPathStyle.value}
          ></path>
        );
      }
    };
    /**
     * 设置环形 Success 样式
     */
    const circleSuccessPathStyle = computed(() => {
      return createCirclePathStyle(props.success?.percent!);
    });
    /**
     * 设置success配置进度条部分样式
     */
    const innerStyleTypeLineSuccess = computed(() => {
      const styleIns: IOption = {
        color: "",
        backgroundColor: "",
        width: "",
        height: "",
      };
      // type="line"
      if (props.type === "line") {
        styleIns.backgroundColor = props.success?.color;
        styleIns.width = `${
          props.success?.percent! >= 100 ? 100 : props.success?.percent
        }%`;
        styleIns.height = `${innerStrokeWidth.value}px`;
        return styleIns;
      }
      // type="circle" | type="dashboard"
      styleIns.color = props.success?.color;
      return styleIns;
    });
    return () => {
      const rightRender = internalInstance?.slots.default ? (
        internalInstance?.slots.default()
      ) : (
        <span class="percent">{`${props.percent}%`}</span>
      );
      const centerRender = internalInstance?.slots.center ? (
        internalInstance?.slots.center()
      ) : (
        <span class="percent">{`${props.percent}%`}</span>
      );
      return (
        <div
          class={`${
            props.type === "line"
              ? "be-progress"
              : "be-progress be-progress-circle-dashboard"
          }`}
        >
          {props.type === "line" ? (
            <div class="be-progress-body be-progress-line">
              <div
                class={`
                                        be-progress-line--track
                                        ${
                                          props.strokeLinecap === "round"
                                            ? "be-progress-line-path__round"
                                            : ""
                                        }`}
                style={`background-color:${props.trailColor}`}
              >
                <div
                  class={`
                                            be-progress-line-path  
                                            ${
                                              props.strokeLinecap === "round"
                                                ? "be-progress-line-path__round"
                                                : ""
                                            }  
                                            be-progress__${
                                              innerStyleStatus.value
                                            }`}
                  style={innerStyleTypeLine.value}
                ></div>
                {/*
                                    传入了success配置时渲染
                                    分段success部分颜色不受color、status控制，根据percent的显示独立。100时也不用变色
                                    */}
                {renderSuccess()}
              </div>
              {/* slot - right */}
              {props.showInfo ? rightRender : ""}
            </div>
          ) : (
            ""
          )}
          {props.type === "circle" || props.type === "dashboard" ? (
            <div
              class="be-progress-body be-progress-circle"
              style={setCircleContainerStyle.value}
            >
              <svg viewBox="0 0 100 100">
                <path
                  class="be-progress-circle__track"
                  d={trackPath.value}
                  strokeLinecap={props.strokeLinecap as "round" | "square"}
                  stroke={props.trailColor ? props.trailColor : "#f5f5f5"}
                  strokeWidth={relativeStrokeWidth.value}
                  fill="none"
                  style={trailPathStyle.value}
                ></path>
                <path
                  class="be-progress-circle__path"
                  d={trackPath.value}
                  stroke={circlePathColor.value}
                  fill="none"
                  strokeLinecap={props.strokeLinecap as "round" | "square"}
                  strokeWidth={relativeStrokeWidth.value}
                  style={circlePathStyle.value}
                ></path>
                {/*
                                    传入了success配置时渲染
                                    分段success部分颜色不受color、status控制、根据percent的显示独立。100时也不用变色
                                    */}
                {renderSuccess()}
              </svg>
              <div class="be-progress-circle--text">
                {/* slot - center */}
                {props.showInfo ? centerRender : ""}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    };
  },
});
