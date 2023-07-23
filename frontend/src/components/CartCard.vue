<template>
    <div>
        <input type="checkbox" :id="item.sku" class="modal-toggle" />
        <form class="modal modal-bottom sm:modal-middle">
            <div v-if="isOpen" class="modal-box relative min-w-[80%] h-[75%] 2xl:min-w-[70%]">
                <product-details :item="curProduct!" :key="item.sku"/>
                
            </div>
            <label class="modal-backdrop" :for="item.sku">Close</label>
        </form>
        <div class="flex flex-row space-x-2 md:space-x-3 lg:space-x-10 font-default">
            <div class="p-2 basis-2/3 max-w-[15rem] max-h-[18rem]">
                <img :src="item.imageUrl" class="rounded-lg"/>
            </div>
            <div class="basis-1/3 md:space-y-3 p-2">
                <label :for="item.sku" @click="showDetails()" class="text-md self-center w-full">
                    <h1 class="md:text-xl font-bold underline text-left">{{ item.name.split(" ")[0] }}</h1>
                    <h1 class="md:text-xl font-bold underline text-left">{{ item.name.split(/ (.*)/)[1] }}</h1>
                </label>
            
                <div class="text-sm">
                    <p class="md:text-lg">Brand: {{ brand?.name }}</p>
                    <p class="md:text-lg">Pieces: {{ item.pieces }}</p>
                    <p class="md:text-lg">Unit Price: C${{ item.unitPrice }}</p>
                </div>
                
                <div class="flex flex-row md:space-x-2 items-center">
                    <div class="join">
                        <button class="btn btn-xs rounded-r-sm" @click="onClickMinus()">-</button>
                        <input type="text" class="input input-bordered input-xs w-[3rem] rounded-none text-center" :input="quantity" :value="latestQnt"/>
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
import { ref, watch, onMounted, onBeforeMount, onUpdated, computed } from 'vue'
import ProductDetails from './ProductDetails.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { Product } from '@/types/Product';
import axios from 'axios';
import type { Brand } from '@/types/Brand';

const props = defineProps<{
  item: CartItem
}>()

const latestQnt = computed(() => store.getters['cart/findCartQauntity'](props.item.sku));
const quantity = ref(1)
const store = useStore();
const curProduct = ref<Product>();
const brand = ref<Brand>();
const isOpen = ref(false);
const unitsInStock = ref<number>(0);

const getBrand = async() => {
    if(props.item.sku[0] === 'P') {
        try {
            await axios.get<Brand>(`/puzzles/${props.item.id}/brand`).then(
                (res) => brand.value = res.data
            );
        } catch (error) {
            throw error
        }
    }
    
}

const getProduct = async() => {
    try {
        await axios.get<Product>(`/searchViews/search/findBySku?sku=${props.item.sku}`).then(
            (res) => curProduct.value = res.data
        );
    } catch (error) {
        throw error
    }
    
}

const getStock = (async() => {
    try {
        await axios.get<number>(`/searchViews/search/getStock?sku=${props.item.sku}`).then(
            (res) => unitsInStock.value = res.data
        )
    } catch (error) {
        throw error
    }
});

onBeforeMount(() => {
    getStock();
    getBrand();
    getProduct();
})

onMounted(() => {
    quantity.value = store.getters['cart/findCartQauntity'](props.item.sku)
})

onUpdated(() => {
    quantity.value = latestQnt.value
})

watch(quantity, () => {
    console.log("watch")
    if(quantity.value > 0) {
        store.commit('cart/setItemQuantity', { sku: props.item.sku, quantity: quantity.value })
    }
    else if(quantity.value === 0) {
        store.commit('cart/removeItemFromCart', props.item.sku)
    }
})

const onClickMinus = () => {
    quantity.value--;
    
}

const onClickPlus = async() => {
    console.log("get")
    console.log(quantity.value)
    await getStock()
    if(quantity.value < unitsInStock.value) {
        quantity.value++
    }
}

/* onBeforeUpdate(() => {
      detail_modal.value = undefined;
}); */

const showDetails = () => {
    isOpen.value = true;
}
</script>
