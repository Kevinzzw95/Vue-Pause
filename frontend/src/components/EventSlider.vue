<template>
    <div>
        <Carousel v-bind="settings" :autoplay="3000" :wrap-around="true" :breakpoints="breakpoints">
            <slot></slot>
        </Carousel>
    </div>
</template>

<script>
    import EventCard from './EventCard.vue';   
    import { defineComponent } from 'vue'
    import { Carousel } from 'vue3-carousel'

    import 'vue3-carousel/dist/carousel.css'

    export default defineComponent({
        name: 'EventSlider',
        components: {
            Carousel,
            EventCard,
        },
        data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 4,
        snapAlign: 'start',
      },
    },
  }),
    })
</script>

<style scoped>

</style>