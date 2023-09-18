<template>
    <div class="hero bg-center lg:items-end min-h-[calc(100vh-128px)] 2xl:min-h-[calc(120vh)] font-default" :style="str">
        <div class="hero-overlay bg-opacity-10"></div>  
        <div class="flex w-full h-[30%] sm:text-center text-neutral-content p-2 pb-[4rem] justify-center items-end self-end bg-gradient-to-t to-transparent-10 from-stone-600">
            <div class="max-w-md w-full grid justify-items-center">
                <h1 v-if="url.split('=')[1].substring(0, 5) !== 'Pixel'" class="mb-2 xl:mb-5 text-5xl text-white">New Arrival</h1>
                <h1 v-if="url.split('=')[1].substring(0, 5) === 'Pixel'" class="mb-2 xl:mb-5 text-5xl text-white">Comming Soon</h1>
                <button v-if="url.split('=')[1].substring(0, 5) !== 'Pixel'" @click="$router.push(url)" class="btn btn-sm outline-white border-2 bg-transparent rounded-full lg:btn-md max-w-[12rem] font-bold text-white"><h1 class="font-bold text-lg md:text-2xl">Shop Now</h1></button>
                <button v-if="url.split('=')[1].substring(0, 5) === 'Pixel'" @click="$router.push(url)" class="btn btn-sm outline-white border-2 bg-transparent rounded-full lg:btn-md max-w-[12rem] text-white"><h1 class="font-bold text-lg md:text-2xl">See Details</h1></button>
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