/* * @test.vue * @deprecated * @author czh * @update (czh 2022/5/19) */
<script lang="ts" setup>
import { h, onMounted } from "vue";
import {
  BeButton,
  BeEllipsis,
  BeIcon,
  BeMessage,
  BeMsg,
  BePopover,
  BeProgress,
  BeTag,
  BeTooltip,
} from "../../../components/be-ui";
import useTextTsx from "../../../composables/tesxTsx";
const message = BeMessage.service;
const { msgBox } = useTextTsx();
const test = (): void => {
  message({
    customClass: "className",
    titles: "info",
    duration: 2500,
    offsetTop: 80,
    close: true,
    iconPreRender: undefined,
    closeRender: undefined,
    compType: "",
  });
  msgBox("testmsgBox", "testmsgBox", "testmsgBox");
};
onMounted(() => {
  test();
});
</script>

<template>
  <div class="test_t">
    <div class="cc">
      <be-icon icon="search" />
      <be-icon icon="iconHecoEagleG" />
      <be-progress :percent="30" status="normal" />
      <be-tag size="mini" custom-class="mr-4"> 杨柳乱成丝 </be-tag>
      <be-ellipsis
        text="清平乐·年年雪里 年年雪里，常插梅花醉。挼尽梅花无好意"
        content="年年雪里，常插梅花醉。挼尽梅花无好意，赢得满衣清泪。今年海角天涯，萧萧两鬓生华。看取晚来风势，故应难看梅花。"
      />
      <be-button type="success" @click="test"> BeButton </be-button>
      <client-only>
        <be-popover custom-class="header-popover" trigger="hover">
          <template #trigger>
            <be-button
              style="margin-right: 5px"
              custom-class="sm:mb-4"
              type="info"
              bordered
            >
              一丝不挂
            </be-button>
          </template>
          <p>那时青丝</p>
          <p>不会用上余生来量度</p>
          <p>但我拖着躯壳</p>
          <p>发现沿途寻找的快乐</p>
        </be-popover>
      </client-only>

      <be-tooltip content="那夜星空灿烂 你轻靠我的肩膀">
        <be-button
          style="margin-right: 5px"
          custom-class="sm:mb-4"
          type="info"
          bordered
        >
          弹唱
        </be-button>
      </be-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test_t {
  .cc {
    /*background: red;*/
  }
}
</style>
