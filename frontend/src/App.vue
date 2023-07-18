
<template>
  <div class="flex relative flex-col min-h-screen bg-base-100">
    <!-- <the-header /> -->
    <site-navigation :key="route.fullPath"/>
    <div className="divider m-0 bg-deep overflow-hidden"></div> 
    <router-view @processing="(status: boolean) => isLoading = status"/>
    <the-footer />
    <div v-if="isLoading" class="grid absolute top-0 left-0 items-center justify-items-center h-full w-screen opacity-80 bg-zinc-200 z-50">
          <div class="flex self-center">
                <span class="loading loading-ball loading-xs bg-deep"></span>
                <span class="loading loading-ball loading-sm bg-deep"></span>
                <span class="loading loading-ball loading-md bg-deep"></span>
                <span class="loading loading-ball loading-lg bg-deep"></span>
          </div>
          
      </div>
  </div>
  
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SiteNavigation from './components/SiteNavigation.vue';
import TheFooter from './components/TheFooter.vue';
import { useRoute } from 'vue-router';
import { store } from './store';

const route = useRoute();

const isLoading = ref(false);

onMounted(() => {
  store.commit('cart/updateCartFromLocalStorage');
})
</script>

<style lang="scss" scoped>

</style>