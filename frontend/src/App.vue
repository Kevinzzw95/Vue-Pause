
<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <!-- <the-header /> -->
    <site-navigation />
    <div className="divider m-0 bg-deep overflow-hidden"></div> 
    <router-view />
    <the-footer />
  </div>
  
</template>

<script setup lang="ts">
import SiteNavigation from './components/SiteNavigation.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<style lang="scss" scoped>

</style>