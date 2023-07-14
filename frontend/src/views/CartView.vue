<template>
    <div class="h-full">
        <div class="container p-6 lg:p-20 h-screen space-y-3">
            <h1 class="text-2xl font-bold">Your Cart {{ totalQuantity === 0 ? "is Empty" : "" }}</h1>
            <div v-if="totalQuantity !== 0">
                <div class="divider">{{ totalQuantity }} Items</div>
                    <div class="flex flex-col" v-for="item in cartItems" :key="item.id">
                        <cart-card :item="item"/>
                    </div>
                    
                <div class="divider"></div>
                <div class="flex flex-col items-center space-y-2">
                    <p>Subtotal: C${{ totalPrice }}</p>
                    <router-link to="/checkout/chooseshipping">
                        <button class="btn btn-active bg-deep text-white w-[10rem]">Proceed to Checkout</button>
                    </router-link>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { CartItem } from '@/types/CartItem';
import { computed } from 'vue'
import CartCard from '../components/CartCard.vue'
import { useStore } from '@/store';

const store = useStore()

const checkoutStatus = computed(() => store.state.cart.checkoutStatus)
const cartItems = computed((): CartItem[] => store.getters['cart/cartProducts'])
const totalPrice = computed(() => store.getters['cart/cartTotalPrice'])
const totalQuantity = computed(() => store.getters['cart/cartTotalQuantity'])

</script>