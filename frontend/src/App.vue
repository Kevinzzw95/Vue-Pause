
<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <!-- <the-header /> -->
    <site-navigation :key="route.fullPath"/>
    <div className="divider m-0 bg-deep overflow-hidden"></div> 
    <router-view />
    <the-footer />
  </div>
  
</template>

<script setup lang="ts">
import SiteNavigation from './components/SiteNavigation.vue';
import TheFooter from './components/TheFooter.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style lang="scss" scoped>

</style>