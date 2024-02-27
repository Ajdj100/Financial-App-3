<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navmenu from './components/navmenu.vue';
</script>

<template>
  <div class="flex flex-row p-5 h-dvh">
    <navmenu class="mr-5"></navmenu>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </div>
</template>
