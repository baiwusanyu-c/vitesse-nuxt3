/*
* @test.vue
* @deprecated
* @author czh
* @update (czh 2022/5/19)
*/
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestCpm',
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="test_t">
    <div class="cc">
      test
    </div>
  </div>
</template>

<style scoped lang="scss">
.test_t{
    .cc{
        background: red;
    }
}
</style>
