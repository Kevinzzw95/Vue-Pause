<template>
    <div class="hero bg-cover bg-center items-end" :style="str">
        <div class="hero-overlay bg-opacity-10"></div>
        <div class="text-start sm:text-center text-neutral-content p-2">
            <div class="max-w-md">
            <h1 class="mb-5 text-3xl font-bold">Hello there</h1>
            <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button class="btn btn-primary">Shop Now</button>
        </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';


const props = defineProps<{
    src: string
}>();

const str = ref('background-image: url(' + props.src + ');')

const handleResize = () => {
    if(window.innerWidth < 700) {
        str.value += 'height:' + window.innerWidth * 1.333 + 'px;'
    }
 	else if(window.innerWidth < 1920) {
        str.value += 'height:' + (window.innerWidth - 256) / 1.78 + 'px;'
    }
    else {
        str.value += 'height:' + (window.innerWidth - 480) / 1.78 + 'px;'
    }
}

onBeforeMount(() => {
	handleResize();
})

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

</script>

<style scoped>

</style>