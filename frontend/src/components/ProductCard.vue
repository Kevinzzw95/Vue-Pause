<template>
    <div>
        <input type="checkbox" :id="randomId" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div v-if="isOpen" class="modal-box relative min-w-[85%] h-[82.5%] md:h-[85%] 2xl:w-[75%]">
                    <product-details :item="item" :key="item.sku"/>
                
            </div>
            <label class="modal-backdrop" :for="randomId">Close</label>
        </div>
        <label :for="randomId" @click="showDetails()" class="self-center w-full">
            <div class="relative flex card card-compact shadow-lg bg-base hover:scale-105 transition duration-500 cursor-pointer object-cover">
                
                <!-- <button @click="showDetails(item.sku)" class="self-center w-full"> -->
                    <figure><img :src="`${baseUrl}${item.imageUrl[0]}`" alt="Puzzle" class="object-fill w-full"/></figure>
                    <!-- <img v-if="!item.active" src="../assets/coming-soon.png" class="absolute top-[25%] md:left-10 w-[12rem]" /> -->
                    <!-- <img v-if="item.unitsInStock === 0" src="../assets/sold-out.png" class="absolute top-[25%] md:left-10 w-[12rem]" /> -->
                
                <!-- </button> -->
                <div v-if="item.special" class="absolute box rounded-r-md w-[5rem] h-8 top-3 bg-gradient-to-r from-green-400 to-blue-500 shadow-xl flex items-stretch p-2">
                    <h1 className="text-white text-xs self-center">{{ item.special }}</h1>
                </div>
                <div class="grid grid-rows-4 h-[4.5rem] md:h-[5rem] xl:h-[5.5rem] p-1 text-sm lg:text-md xl:text-lg">
                    <!-- <router-link :to="'/details/' + item.id" class="self-center"> -->
                    <!-- <button @click="showDetails(item.sku)" class="self-start items-center row-span-3">    -->
                        <div class="flex flex-col row-span-3 font-bold text-center font-default">
                            <p class="">{{ item.name.split(" ")[0] }}</p>
                            <p class="">{{ item.name.split(/ (.*)/)[1] }}</p>
                        <!-- <div class="badge badge-secondary">NEW</div> -->
                        </div>
                    <!-- </button>     -->
                    

                    <!-- <dialog :ref="(el) => modal = el" class="modal modal-bottom sm:modal-middle" :id="item.sku">
                        <form method="dialog" class="modal-box relative min-w-[80%] h-[75%] 2xl:min-w-[70%]">
                            <product-details :item="item" :key="item.sku"/>

                        </form>
                        <form v-if="isOpen" method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog> -->
                
                    <div class="flex flex-row justify-end font-default text-xs space-x-1">
                        <div v-if="item.unitsInStock === 0" class="inline-flex badge badge-outline badge-sm md:badge-md text-deep">Sold Out</div>
                        <div v-if="!item.active" class="inline-flex badge badge-outline badge-sm md:badge-md text-xs text-deep">COMING SOON</div>
                        <!-- <div v-if="item.special" class="inline-flex badge badge-outline badge-sm md:badge-md text-xs">{{ item.special }}</div> -->
                    </div>
                </div>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product';
import type { Ref } from 'vue';
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import ProductDetails from './ProductDetails.vue'

const props = defineProps<{
    item: Product
}>()
let randomId: string;
const baseUrl = "https://rds-pause.s3.ca-central-1.amazonaws.com/public"

const isOpen = ref(false);

onBeforeMount(() => {
    randomId = props.item.sku + '-' + Date.now().toString(36)
})

//const modal = ref();
/* onBeforeUpdate(() => {
      detail_modal.value = undefined;
}); */

const showDetails = () => {
    isOpen.value = true;
    //modal.value!.showModal();
}
</script>
