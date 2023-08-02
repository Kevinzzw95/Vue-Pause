<template>
    <div class="hero bg-center lg:items-end min-h-[calc(100vh-128px)] 2xl:max-h-[calc(100vh-128px)] font-default" :style="str">
        <div class="hero-overlay bg-opacity-10"></div>  
        <div class="flex sm:text-center text-neutral-content p-2 lg:pb-10 items-center ">
        <div class="max-w-md grid justify-items-center">
            <h1 class="mb-2 xl:mb-5 text-4xl md:text-5xl text-white">New Arrival</h1>
            <button @click="$router.push(url)" class="btn btn-sm outline-white border-2 bg-transparent rounded-full md:btn-lg font-bold text-white">Shop Now</button>
        </div> 
    </div>
</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import router from '../router';


const props = defineProps<{
    src: string;
    url: string
}>();

const str = ref('background-image: url(' + props.src + ');')

const handleResize = () => {
    if(window.innerWidth < 700) {
        str.value += 'height:' + window.innerWidth * 1.333 + 'px;'
    }
 	else if(window.innerWidth < 1536) {
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