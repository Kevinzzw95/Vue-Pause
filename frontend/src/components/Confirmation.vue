<template>
    <div class="flex flex-col space-y-2 md:space-y-5 h-full">
        <h1 class="font-bold text-lg md:text-xl self-start">Confirmation</h1>
        <div class="alert alert-info bg-accent w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Please confirm your information below. 
            After submit the order, you will get an order number and a confirmation email. 
            <span class="font-bold">Please refer the order number when you choose to pay online.</span></span>
        </div>
        <div v-if="purchase.type === 'Pickup'" class="bg-base rounded-2xl p-5 space-y-4">
            <div><span class="font-bold">Email:</span> {{ purchase.customer.email }}</div>
            <div><span class="font-bold">Telephone:</span> {{ purchase.customer.phone }}</div>
            <div><span class="font-bold">Pickup Date:</span> {{ purchase.pickupDate?.split(",")[0] }}</div>
            <div><span class="font-bold">Pickup Time:</span> {{ purchase.pickupDate?.split(",")[1] }}</div>
            <div><span class="font-bold">Payment Method:</span> {{ purchase.order.payment }}</div>
        </div>
        <div v-if="purchase.type === 'Shipping'" class="bg-base rounded-2xl p-5 space-y-4">
            <div><span class="font-bold">Email:</span> {{ purchase.customer.email }}</div>
            <div><span class="font-bold">Telephone:</span> {{ purchase.customer.phone }}</div>
            <div><span class="font-bold">Name:</span> {{  purchase.customer.firstName }} {{ purchase.customer.lastName }}</div>
            <div><span class="font-bold">Address:</span> {{ purchase.shippingAddress?.street }}, {{ purchase.shippingAddress?.city }}, {{ purchase.shippingAddress?.province }}, {{ purchase.shippingAddress?.zipCode }}</div>
            <div><span class="font-bold">Payment Method:</span> {{ purchase.order.payment }}</div>
        </div>
        <div class="flex flex-row justify-between w-full">                 
            <button @click="$router.go(-1)" class="btn bg-base flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Edit
            </button>
            <button class="btn bg-base" @click="processOrder()">Place Order</button>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import router from '@/router';
import { store } from '@/store';
import { Purchase } from '@/types/Purchase';
import { computed, onMounted, ref } from 'vue';

const time = ref<string>()

const purchase = computed((): Purchase => store.getters['purchase/getPurchase']);
const checkoutStatus = computed((): string => store.getters['cart/checkoutStatus']);

const emit = defineEmits<{
  (e: 'processing', status: Boolean): void
}>()

const processOrder = async () => {
    emit('processing', true);
    const orderNumber = await store.dispatch('cart/checkout');
    if(checkoutStatus.value === "successful") {
        emit('processing', false);
        router.push(`/success/${orderNumber}`);
    }
}

onMounted( () => {
    
})

</script>