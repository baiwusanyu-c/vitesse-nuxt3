/*
* @test.vue
* @deprecated
* @author czh
* @update (czh 2022/5/19)
*/
<script lang="ts" setup>
import {
  // BeIcon,
  BeButton,
  // BeProgress,
  // BeEllipsis,
  // BeMsg,
  // BeMessage,
  //  BeTag,
  BePopover,
  BeTooltip,
} from '../../../components/be-ui'
/*
 import {
     ElButton,
     ElConfigProvider,
     ElDatePicker,
     ElDropdown,
     ElDropdownItem,
     ElDropdownMenu,
     ElIcon,
     ElMessage,
 } from 'element-plus' */
</script>

<template>
  <div class="test_t">
    <div class="cc">
      test_t
      <be-button type="success">
        BeButton
      </be-button>
      <client-only>
        <be-popover custom-class="header-popover" trigger="hover">
          <template #trigger>
            <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="info" bordered>
              一丝不挂
            </be-button>
          </template>
          <p>那时青丝</p>
          <p>不会用上余生来量度</p>
          <p>但我拖着躯壳</p>
          <p>发现沿途寻找的快乐</p>
        </be-popover>
      </client-only>
      <client-only>
        <be-tooltip content="那夜星空灿烂 你轻靠我的肩膀">
          <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="info" bordered>
            弹唱
          </be-button>
        </be-tooltip>
      </client-only>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test_t{
    .cc{
        /*background: red;*/
    }
}
</style>
