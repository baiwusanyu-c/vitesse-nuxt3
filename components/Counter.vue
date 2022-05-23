<script setup lang="ts">
const { count, inc, dec } = useCount();
</script>

<template>
  <div >
    <button  @click="dec()">
      <div  />
    </button>
    <div >
      {{ count }}
    </div>
    <button  @click="inc()">
      <div  />
    </button>
  </div>
</template>
