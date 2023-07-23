<template>
    <div class="">
        <div class="container p-6 lg:p-32 min-h-screen space-y-3">
            <h1 class="text-xl md:text-2xl font-bold text-center">Your Cart {{ totalQuantity === 0 ? "is Empty" : "" }}</h1>
            <div v-if="totalQuantity !== 0">
                <div class="divider">{{ totalQuantity }} Items</div>
                    <div class="flex flex-col" v-for="item in cartItems" :key="item.id">
                        <cart-card :item="item" :key="item.sku"/>
                    </div>
                    
                <div class="divider"></div>
                <div class="flex flex-col items-center space-y-2">
                    <p>Savings: C${{ savings }}</p>
                    <p>Subtotal: C${{ totalPrice - savings }}</p>
                    <router-link to="/checkout/chooseshipping">
                        <button class="btn btn-active bg-deep text-white w-[10rem]">Proceed to Checkout</button>
                    </router-link>
                </div>
            </div>
            <div class="self-end md:pt-10">
                <h1 class="text-xl md:text-2xl font-bold py-5">You may also like</h1>
                <div class="container justify-items-start grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-14 md:pr-[5rem]">
                    <product-card v-for="item in recommendation" :item="item"/>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { CartItem } from '@/types/CartItem';
import { computed, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'
import CartCard from '../components/CartCard.vue'
import { useStore } from '@/store';
import axios from 'axios';
import type { GetResponseSearchView } from '../types/RestData';
import ProductCard from '../components/ProductCard.vue';
import { Product } from '../types/Product';

const recommendation = ref<Product[]>([]);

const cartItems = computed((): CartItem[] => store.getters['cart/cartProducts'])
const checkoutStatus = computed(() => store.state.cart.checkoutStatus)
const totalPrice = computed(() => store.getters['cart/cartTotalPrice'])
const totalQuantity = computed(() => store.getters['cart/cartTotalQuantity'])
const savings = computed(() => store.getters['cart/getSavings']);

const store = useStore();

onBeforeMount(() => {
    var skuList: string[] = ['0'];
    const Items = computed((): CartItem[] => store.getters['cart/cartProducts'])
    Items.value.forEach(item => {
        skuList.push(item.sku);
    }); 
    getData(skuList)

});

onBeforeUpdate(() => {
    store.dispatch('cart/calculateSavings')
})

const getData = async(skuList: string[]) => {
    try {
        await axios.get<GetResponseSearchView>(`/searchViews/search/findByTopStock?skuList=${skuList}&size=4`).then(
            (res) => recommendation.value = res.data._embedded.searchViews
        );
    } catch (error) {
        throw error
    }
}

</script>