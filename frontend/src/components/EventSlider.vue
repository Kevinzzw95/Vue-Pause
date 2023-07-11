<template>
    <div>
        <Carousel :items-to-show="2" :autoplay="2000" :wrap-around="true">
            <slot></slot>
        </Carousel>
    </div>
</template>

<script lang="ts">
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
    })
</script>

<style scoped>

</style>