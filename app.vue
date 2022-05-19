<script setup>
    // element plus 必须在入口组件注入这个 ID_INJECTION_KEY
    import { ID_INJECTION_KEY } from 'element-plus'
    provide(ID_INJECTION_KEY, {
        prefix: 100,
        current: 0,
    })
useHead({
  title: 'Vitesse Nuxt 3',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})

</script>

<template>
  <div>
  <NuxtLayout>

      <NuxtPage />

  </NuxtLayout>
  </div>
</template>

<style>
/*@import "~element-plus/theme-chalk/index.css";*/
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
