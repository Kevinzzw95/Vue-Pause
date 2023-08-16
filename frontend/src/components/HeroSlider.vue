<template>
    <Carousel class="flex flex-col" :wrap-around="true">
        <slot></slot>
  
      <template #addons>
        <Pagination />
        <Navigation />
      </template>
    </Carousel>
    
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  export default defineComponent({
    name: 'ExamplePagination',
    components: {
      Pagination,
      Carousel,
      Slide,
      Navigation,
    },
  })
</script>