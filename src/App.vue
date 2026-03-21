<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="site-root">
    <SiteHeader />
    <RouterView />
  </div>
</template>
