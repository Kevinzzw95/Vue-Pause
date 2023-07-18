<template>
    <div>
        <div class="relative flex card card-compact shadow-lg max-w-[18rem] bg-base hover:scale-105 transition duration-500 cursor-pointer object-cover">
            <button @click="showDetails()" class="self-center w-full">
                <figure><img :src=item.imageUrl[0] alt="Puzzle" class="object-cover w-full h-[13rem] md:h-[18rem] max-h-[20rem]"/></figure>
                <!-- <img v-if="!item.active" src="../assets/coming-soon.png" class="absolute top-[25%] md:left-10 w-[12rem]" /> -->
                <!-- <img v-if="item.unitsInStock === 0" src="../assets/sold-out.png" class="absolute top-[25%] md:left-10 w-[12rem]" /> -->
            </button>
            <div v-if="item.special" class="absolute box rounded-r-md w-[4.5rem] h-8 top-3 bg-gradient-to-r from-green-400 to-blue-500 shadow-xl flex items-stretch p-2">
                <h1 className="text-white text-xs self-center">{{ item.special }}</h1>
            </div>
            <div class="grid grid-rows-4 h-[4.5rem] md:h-[5rem] p-1 font-primary">
                <!-- <router-link :to="'/details/' + item.id" class="self-center"> -->
                <button @click="showDetails()" class="self-start items-center row-span-3">
                    <h2 class="text-xs md:text-md flex flex-col font-bold">
                        <p>{{ item.name.split(" ")[0] }}</p>
                        <p>{{ item.name.split(/ (.*)/)[1] }}</p>
                    <!-- <div class="badge badge-secondary">NEW</div> -->
                    </h2>
                </button>
                    
                
                <!-- </router-link> -->
                <dialog ref="detail_modal" class="modal modal-bottom sm:modal-middle">
                    <form v-if="isOpen" method="dialog" class="modal-box relative min-w-[90%] h-[75%]">
                        <product-details :item="item" :key="item.sku"/>
                        
                    </form>
                    <form v-if="isOpen" method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
			
                <div class="flex flex-row justify-end font-default text-xs space-x-1">
                    <div v-if="item.unitsInStock === 0" class="inline-flex badge badge-outline badge-sm md:badge-md text-deep">Sold Out</div>
                    <div v-if="!item.active" class="inline-flex badge badge-outline badge-sm md:badge-md text-xs text-deep">COMING SOON</div>
                    <!-- <div v-if="item.special" class="inline-flex badge badge-outline badge-sm md:badge-md text-xs">{{ item.special }}</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product';
import { onMounted, ref, onBeforeUpdate } from 'vue';
import ProductDetails from './ProductDetails.vue'

const props = defineProps<{
    item: Product
}>()

const detail_modal = ref<HTMLDialogElement>();

const isOpen = ref(false);

onMounted(() => {
  
});

onBeforeUpdate(() => {
      detail_modal.value = undefined;
});

const showDetails = () => {
    isOpen.value = true;
    detail_modal.value?.showModal()
}
</script>
