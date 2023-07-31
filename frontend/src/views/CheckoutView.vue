<template>
    <div class="min-h-[84vh] font-default text-lg">
        <div class="flex min-h-full p-2 sm:p-6 md:p-16 xl:p-20 lg:pt-32">
            <div class="container flex h-full">
                <div class="flex flex-wrap justify-center"> 
                    <div class="lg:order-last lg:pt-10 w-full lg:w-[40%] xl:w-[28rem] items-center">
                        <div class="overflow-x-auto space-y-2">
                            <h1 class="font-bold text-lg md:text-xl space-x-2">Order Summary</h1>
                            <table class="table">
                                <tbody>
                                    <tr v-for="(item, index) in cartItems" class="sm:text-lg">
                                        <td class="p-2 sm:p-8 max-w-[5rem] sm:max-w-[10rem]"><img :src="item.imageUrl" class="object-scale-down w-56 rounded-lg"/></td>
                                        <td class="p-2">
                                            <p>{{ item.name.split(" ")[0] }}</p>
                                            <p>{{ item.name.split(/ (.*)/)[1] }}</p>
                                        </td>
                                        <td class="p-2">C${{ item.unitPrice }}</td>
                                        <td class="p-2">x{{ item.quantity }}</td>
                                    </tr>
                                </tbody>
                            </table> 
                            <div class="divider">{{ totalQuantity }} items</div>
                            <div class="text-sm sm:text-md font-bold">
                                <h1 :class="[$route.name === 'chooseshipping' ? '' : 'hidden']">Shipping: calculated at next step</h1>
                                <h1 :class="[$route.name === 'pickup' ? '' : 'hidden']">Shipping: 0</h1>
                                <h1 :class="[$route.name === 'shipping' ? '' : 'hidden']">Shipping: {{ shippingFee }}</h1>
                                <h1 :class="[$route.name === 'confirmation' ? '' : 'hidden']">Shipping: {{ getPurchase.order?.shippingFee }}</h1>
                                <h1>Savings: {{ savings }}</h1>
                                <h1>Subtotal: {{ totalPrice - savings + shippingFee }}</h1>
                            </div>
                            
                        </div>
                        
                        
                    </div>

                    <div class="flex flex-col lg:p-10 w-full lg:w-[50%] xl:w-[42rem] items-center"> 
                        <ul class="steps text-xs py-5 md:text-md self-center">
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
const shippingFee = ref(0);
const savings = computed(() => store.getters['cart/getSavings'])

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
