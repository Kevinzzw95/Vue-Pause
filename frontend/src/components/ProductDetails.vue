<template>
    <div class="container xl:px-20 xl:pt-5 2xl:px-32 gap-5">
        <div class="grid grid-cols-1 xl:grid-cols-6 2xl:grid-cols-7 xl:gap-4 xl:space-x-16">
            <div class="row-span-2 col-span-3 max-h-[40rem]">
                <div class="relative flex flex-col-reverse xl:flex-row xl:gap-4">
                    <div class="flex flex-row w-full xl:flex-col xl:w-[5rem] justify-center gap-2 xl:gap-4 p-2">
                        <div v-for="(imgUrl, index) in item.imageUrl" :key="index" class="flex flex-col py-2 gap-3">
                            <a @click="currPic = index" class="btn btn-link w-[4rem] h-20 p-0">
                                <img :src="imgUrl" class="object-scale-down w-16 h-20 md:w-[4rem] md:h-[5rem] self-center rounded-lg"/>
                            </a> 
                        </div>
                    </div>
                    <div class="self-center md:py-5">
                        <div v-for="(imgUrl, index) in item.imageUrl" :key="index" class="items-center">
                            <div v-if="currPic === index" class="">
                                <img :src="imgUrl" class="object-cover h-[26rem] w-[25rem] rounded-xl" />
                            </div> 
                        </div>  
                    </div>
                    
                </div>
            </div>
            <div class="col-span-3 2xl:col-span-4 space-y-2 lg:space-y-8 pt-2 md:pt-[4.5rem] pl-3 font-default">
                <div>
                    <h1 class="text-xl lg:text-3xl font-bold">{{ item.name.split(" ")[0] }}</h1>
                    <h1 class="text-xl lg:text-3xl font-bold">{{ item.name.split(/ (.*)/)[1] }}</h1>
                </div>
                
                <div>
                    <h1 v-if="item.sku[0] === 'P'" class="text-xl">Brand: {{ brand?.name }}</h1>
                    <h1 v-if="item.sku[0] === 'P'" class="text-xl">Pieces: {{ item?.pieces }} Pieces</h1>
                    <h1 v-if="item.sku[0] !== 'T'" class="text-xl">Dimension(cm): {{ item.dimension }}</h1>
                    <h1 v-if="item.sku[0] === 'T'" class="text-xl">Players: {{ item.dimension }}</h1>
                </div>
                
                <h1 class="text-2xl font-bold text-deep">C$ {{ item.unitPrice }}</h1>
                <div v-if="item.active && item.unitsInStock > 0" class="relative mt-10 flex flex-wrap gap-4">
                    <div class="join outline outline-gray-300 rounded-lg">
                        <h1 class="join-item self-center text-lg px-2">Qnt.</h1>
                        <a class="join-item btn btn-ghost" @click="onClickMinus()">-</a>
                        <input v-model="quantity" class="join-item w-[2rem] text-center"/>
                        <a class="join-item btn btn-ghost" @click="onClickPlus()">+</a>
                    </div>
                
                    <a class="btn btn-active bg-deep text-white" @click="addProduct(item)">Add to Cart</a>

                    <div v-if="addToCart" class="absolute bottom-[4rem] left-[5.5rem] h-10 w-35 bg-gray-500 rounded-lg text-white animate-fade_out">
                        <h1 class="p-[0.7rem]">Add {{ quantity }} items to cart</h1>   
                    </div>

                    <div v-if="alert" class="absolute bottom-[4rem] alert alert-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Items in your cart can not exceed items in stock({{ item.unitsInStock }})!</span>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="flex flex-col w-full md:flex-row gap-4 pt-5">
            <div class="basis-1/2 bg-base rounded-lg p-5 font-default">
                <h1 class="text-lg font-bold">Shipping</h1>
                <p>Free shipping on orders over $95 in Scarborough/Markham/Richmond HIill/Vaughan/North York, over $150 Canada wide, over $180 worldwide.</p>
            </div>
            <div class="basis-1/2 bg-base rounded-lg p-5 font-default">
                <h1 class="text-lg font-bold">Return</h1>
                <p>The item can be returned within 10 days of the original shipment date.</p> 
                <p>Opened packages cannot be returned. All items must be in the original packages with all pieces and in original condition.</p> 
                <p>Original shipping charges will not be refunded.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { store } from '@/store';
import type { Brand } from '@/types/Brand';
import { Product } from '@/types/Product';
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';


const props = defineProps<{
    item: Product,

}>();

const currPic = ref(0);
const quantity = ref(1);
const addToCart = ref(false);
const alert = ref(false);
const brand = ref<Brand>();
const unitsInStock = ref<number>(props.item.unitsInStock);

const getBrand = (async() => {
    if(props.item.sku[0] === 'P') {
        try {
            await axios.get<Brand>(`/puzzles/${props.item.id}/brand`).then(
                (res) => brand.value = res.data
            )
        } catch (error) {
            throw error
        }
    }
});

const getStock = (async() => {
    try {
        await axios.get<number>(`/searchViews/search/getStock?sku=${props.item.sku}`).then(
            (res) => unitsInStock.value = res.data
        )
    } catch (error) {
        throw error
    }
});


const cartItemQauntity = computed((): number => store.getters['cart/findCartQauntity'](props.item.id))

const onClickMinus = () => {
    if(quantity.value > 1) {
        quantity.value--;
    }
    
}

const onClickPlus = () => {
    //if(quantity.value < unitsInStock.value) {
        quantity.value++;
    //}
}

const addProduct = (product: Product) => {
    getStock();
    if(quantity.value + cartItemQauntity.value > unitsInStock.value) {
        alert.value = true;
    }
    else {
        alert.value = false;
        store.dispatch('cart/addProductToCart', { product: product,  qnt: quantity.value }); 
        addToCart.value = true;
        updateSavings();
        setTimeout(() => {
            addToCart.value = false;
        }, 1000);
    }
}

onMounted(() => {
    getStock();
    getBrand();
});

const updateSavings = () => {
    store.dispatch('cart/calculateSavings')
}

</script>
