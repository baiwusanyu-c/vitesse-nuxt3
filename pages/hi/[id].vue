<script setup lang="ts">
import test from './components/test.vue'
const route = useRoute()
const user = useUserStore()
const name = route.params.id

watchEffect(() => {
  user.setNewName(route.params.id as string)
})

definePageMeta({
  // 定义layout
  layout: 'home',
})
</script>

<template>
  <div>
    <div />
    <h3>
      Hi,
    </h3>
    <div >
      {{ name }}!
      <test />
    </div>

    <template v-if="user.otherNames.length">
      <p >
        <span >Also as known as:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </p>
    </template>

    <Counter />

    <div>
      <NuxtLink
        class="btn m-3 text-sm"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
