<template>
    <div class="container p-5 flex justify-center">
        <div class="flex flex-wrap"> 
            <div class="sm:order-last sm:p-16 sm:w-[30rem]">
                <div class="overflow-x-auto space-y-2">
                    <h1 class="font-bold text-xl">Order Summary</h1>
                    <table class="table">
                        <tbody>
                            <tr v-for="(item, index) in cartItems" class="text-lg">
                                <td><img :src="item.imageUrl" class="w-16 h-12 rounded-lg"/></td>
                                <td>{{ item.name }}</td>
                                <td>C${{ item.unitPrice }}</td>
                                <td>{{ item.quantity }}</td>
                            </tr>
                        </tbody>
                    </table> 
                    <div class="divider">{{ totalQuantity }} items</div>
                    <h1 :class="[$route.name === 'chooseshipping' ? '' : 'hidden']">Shipping: calculated at next step</h1>
                    <h1 :class="[$route.name === 'pickup' ? '' : 'hidden']">Shipping: 0</h1>
                    <h1 :class="[$route.name === 'shipping' ? '' : 'hidden']">Shipping: {{ shipping }}</h1>
                    <h1 :class="[$route.name === 'confirmation' ? '' : 'hidden']">Shipping: {{ getPurchase.order?.shippingFee }}</h1>
                    <h1>Subtotal: {{ totalPrice }}</h1>
                </div>
                
                
            </div>

            <div class="flex flex-col space-y-5 sm:p-16 sm:w-[40rem]"> 
                <ul class="steps text-xs md:text-md sm:w-[25rem] self-center">
                    <li class="step step-primary">Method</li>
                    <li :class="[$route.name == 'chooseshipping' ? '' : 'step-primary', 'step']">Customer Information</li>
                    <li :class="[$route.name == 'confirmation' ? 'step-primary' : '', 'step']">Confirmation</li>
                </ul>
                <router-view @shipping="(fee: number) => shipping = fee"/>
            </div> 
            <div class="divider invisible sm:visible lg:divider-horizontal"></div>     
        </div>
    </div>
</template>

<script setup lang="ts">
import { CartItem } from '@/types/CartItem';
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store';
import type { Purchase } from '@/types/Purchase';
import { useRoute } from 'vue-router';

const store = useStore()

const shipping = ref<number>()

const getPurchase = computed((): Purchase => store.getters['purchase/getPurchase'])
const cartItems = computed((): CartItem[] => store.getters['cart/cartProducts'])
const totalPrice = computed(() => store.getters['cart/cartTotalPrice'])
const totalQuantity = computed(() => store.getters['cart/cartTotalQuantity'])

const route = useRoute();

watch(route, () => {
    if(route.name === 'chooseshipping') {
        shipping.value = undefined
    }
})
</script>
