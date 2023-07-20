<template>
    <div>
        <input type="checkbox" :id="item.sku" class="modal-toggle" />
        <form class="modal modal-bottom sm:modal-middle">
            <div v-if="isOpen" class="modal-box relative min-w-[80%] h-[75%] 2xl:min-w-[70%]">
                <product-details :item="curProduct!" :key="item.sku"/>
                
            </div>
            <label class="modal-backdrop" :for="item.sku">Close</label>
        </form>
        <div class="flex flex-row space-x-3 lg:space-x-10 font-default">
            <div class="p-2 basis-1/2 max-w-[13rem] max-h-[15rem]">
                <img :src=item.imageUrl class=""/>
            </div>
            <div class="space-y-5 p-2">
                <label :for="item.sku" @click="showDetails()" class="self-center w-full">
                    <h1 class="md:text-2xl font-bold underline text-left">{{ item.name.split(" ")[0] }}</h1>
                    <h1 class="md:text-2xl font-bold underline text-left">{{ item.name.split(/ (.*)/)[1] }}</h1>
                </label>
            
			
                <p class="md:text-lg">Brand: {{ brand?.name }}</p>
                <p class="md:text-lg">Pieces: {{ item.pieces }}</p>
                <p class="md:text-lg">Unit Price: C${{ item.unitPrice }}</p>
                <div class="flex flex-row space-x-2 items-center">
                    <div class="join">
                        <button class="btn btn-xs rounded-r-sm" @click="onClickMinus()">-</button>
                        <input type="text" class="input input-bordered input-xs w-[3rem] rounded-none text-center" v-model="quantity"/>
                        <button class="btn btn-xs rounded-l-sm" @click="onClickPlus()">+</button>
                    </div>
                    <div class="btn btn-link text-black">
                        <trash-icon @click="() => quantity = 0" class="w-5 h-5"/>
                    </div>
                   
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { CartItem } from '@/types/CartItem';
import { ref, watch, onMounted, onBeforeUpdate, onBeforeMount } from 'vue'
import ProductDetails from './ProductDetails.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import type { Product } from '@/types/Product';
import axios from 'axios';
import type { Brand } from '@/types/Brand';

const props = defineProps<{
  item: CartItem
}>()

const quantity = ref(props.item.quantity)
const store = useStore();
const inStock = ref(5);
const curProduct = ref<Product>();
const brand = ref<Brand>();
const isOpen = ref(false);

const getData = async() => {
    try {
        await axios.get<Brand>(`/puzzles/${props.item.id}/brand`).then(
            (res) => brand.value = res.data
        )
        await axios.get<Product>(`/puzzles/search/findById?id=${props.item.id}`).then(
            (res) => curProduct.value = res.data
        )
    } catch (error) {
        throw error
    }
}


onBeforeMount(() => {
    getData();
})


watch(quantity, () => {
    if(quantity.value > 0) {
        store.commit('cart/setItemQuantity', { id: props.item.id, quantity: quantity.value })
    }
    else if(quantity.value === 0) {
        store.commit('cart/removeItemFromCart', props.item.id)
    }
    
})

const onClickMinus = () => {
    quantity.value--
}

const onClickPlus = () => {
    if(quantity.value < inStock.value) {
        quantity.value++
    }
}

onMounted(() => {
  
})

/* onBeforeUpdate(() => {
      detail_modal.value = undefined;
}); */

const showDetails = () => {
    isOpen.value = true;
}
</script>
