<template>
    <div>
        <div class="min-h-screen p-6 lg:p-20 lg:pt-32">
            <div class="container flex justify-center h-full">
                <div class="flex flex-wrap"> 
                    <div class="sm:order-last sm:p-10 sm:w-[28rem]">
                        <div class="overflow-x-auto space-y-2">
                            <h1 class="font-bold text-xl">Order Summary</h1>
                            <table class="table">
                                <tbody>
                                    <tr v-for="(item, index) in cartItems" class="sm:text-lg">
                                        <td><img :src="item.imageUrl" class="object-scale-down w-56 rounded-lg"/></td>
                                        <td>{{ item.name }}</td>
                                        <td>C${{ item.unitPrice }}</td>
                                        <td>{{ item.quantity }}</td>
                                    </tr>
                                </tbody>
                            </table> 
                            <div class="divider">{{ totalQuantity }} items</div>
                            <h1 :class="[$route.name === 'chooseshipping' ? '' : 'hidden']">Shipping: calculated at next step</h1>
                            <h1 :class="[$route.name === 'pickup' ? '' : 'hidden']">Shipping: 0</h1>
                            <h1 :class="[$route.name === 'shipping' ? '' : 'hidden']">Shipping: {{ shippingFee }}</h1>
                            <h1 :class="[$route.name === 'confirmation' ? '' : 'hidden']">Shipping: {{ getPurchase.order?.shippingFee }}</h1>
                            <h1>Savings: {{ savings }}</h1>
                            <h1>Subtotal: {{ totalPrice - savings }}</h1>
                        </div>
                        
                        
                    </div>

                    <div class="flex flex-col space-y-5 p-5 sm:p-10 sm:w-[42rem]"> 
                        <ul class="steps text-xs md:text-md sm:w-[25rem] self-center p-5">
                            <li class="step step-primary">CHOOSE A METHOD</li>
                            <li :class="[$route.name == 'chooseshipping' ? '' : 'step-primary', 'step']">CUSTOMER INFORMATION</li>
                            <li :class="[$route.name == 'confirmation' ? 'step-primary' : '', 'step']">CONFIRMATION</li>
                        </ul>
                        <router-view @shipping="(fee: number) => shippingFee = fee" @processing="(status: boolean) => $emit('processing', status)"/>
                    </div> 
                    <div class="divider invisible sm:visible lg:divider-horizontal"></div>     
                </div>
            </div>
        </div>
        
    </div>
    
    
</template>

<script setup lang="ts">
import { CartItem } from '@/types/CartItem';
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useStore } from '@/store';
import type { Purchase } from '@/types/Purchase';
import { useRoute } from 'vue-router';
import router from '../router';

const store = useStore()

const getPurchase = computed((): Purchase => store.getters['purchase/getPurchase'])
const cartItems = computed((): CartItem[] => store.getters['cart/cartProducts'])
const totalPrice = computed(() => store.getters['cart/cartTotalPrice'])
const totalQuantity = computed(() => store.getters['cart/cartTotalQuantity'])
const shippingFee = ref();
const savings = computed(() => store.getters['cart/getSavings']).value;

const route = useRoute();

const emit = defineEmits<{
  (e: 'processing', status: Boolean): void
}>()

onBeforeMount(() => {
    if(totalQuantity.value === 0) {
        router.push('/')
    }
})
</script>
