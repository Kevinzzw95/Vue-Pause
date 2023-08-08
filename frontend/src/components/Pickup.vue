<template>
    <div class="flex flex-col lg:text-lg">
        <h1 class="font-bold text-lg lg:text-2xl self-start">Pickup Infomation</h1>
        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Choose a Date*</span>
            </label>
            <div class="alert alert-info bg-accent w-full max-w-full py-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Only <span class="font-bold">Wednesdays</span> and <span class="font-bold">Saturdays</span> within <span class="font-bold">2</span> months are avaliable</span>
            </div>
            <div class="flex flex-row space-x-2 items-center py-2">
                <vue-tailwind-datepicker v-model="dateValue" :start-from="today" :disable-date="dDate" :formatter="formatter" as-single class="w-full light h-12"/>
            </div>
        </div>
        <div v-if="dateValue != undefined && dateValue != null"> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Choose A Time*</span>
            </label>
            <select v-model="time" class="select select-bordered w-full max-w-full">
                <option disabled selected>Please choose a time</option>
                <option v-if="!isSat">7PM at 330 Hwy 7, Richmond Hill</option>
                <option v-if="isSat">4PM at 3255 Hwy 7, Markham</option>
                <option v-if="isSat">6PM at 330 Hwy 7, Richmond Hill</option>
            </select>
            
        </div>
        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Name*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" v-model="name"/> 
            </div>
            
        </div>
        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Email Address*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" v-model="email"/> 
                <CheckCircleIcon v-if="validEmail && email" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validEmail && email" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
            
        </div>
        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Telephone*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" v-model="phone"/>
                <CheckCircleIcon v-if="validPhone && phone" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validPhone && phone" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
            
        </div>

        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Payment Method*</span>
            </label>
            <select class="select select-bordered w-full max-w-full max-h-[40px]" v-model="payment">
                <option disabled selected>Select A Method</option>
                <option>Cash</option>
                <option>e-Transfer</option>
                <option>WeChat</option>
                <option>Alipay</option>
            </select>
        </div>
        <div class="flex flex-row justify-between pt-4"> 
            <button @click="$router.go(-1)" class="btn bg-base flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
            </button>
            <button class="btn bg-base" @click="!validEmail || !validPhone || !dateValue || !time || !payment? null : createPurchase() " :disabled="!validEmail || !validPhone || !dateValue || !time || !payment || !name ? true : false">Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
        
        
    </div>
</template>

<script setup lang="ts">
import { Customer } from '@/types/Customer';
import { Order } from '@/types/Order';
import { Purchase } from '@/types/Purchase';
import { ref, watch } from 'vue';
import { computed } from 'vue'
import { useStore } from '@/store';
import { OrderItem } from '@/types/OrderItem';
import type { CartItem } from '@/types/CartItem';
import { PickupTime } from '@/types/PickupTime';
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import router from '@/router';
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const formatter = ref({
    date: 'YYYY-MM-DD',
    month: 'MMM'
})
const today = new Date()
const dDate = (date: Date) => {
    return date < new Date() || date > new Date(today.getFullYear(), today.getMonth() + 2, today.getDate()) || (date.getDay() !== 3 && date.getDay() !== 6);
}

const store = useStore()
const purchaseInfo = computed((): Purchase => store.getters['purchase/getPurchase']).value;

const dateValue = ref(purchaseInfo.pickupDate?.split(",")[0]);
const time = ref(purchaseInfo.pickupDate?.split(",")[1]);
const email = ref(purchaseInfo.customer?.email);
const phone = ref(purchaseInfo.customer?.phone);
const payment = ref(purchaseInfo.order?.payment);
const name = ref(purchaseInfo.customer?.firstName);

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/;

const validEmail = ref(USER_REGEX.test(email.value));
const validPhone = ref(PHONE_REGEX.test(phone.value));

const isSat = ref(false);

watch( [() => email.value, () => phone.value], () => {
    validEmail.value = USER_REGEX.test(email.value);
    validPhone.value = PHONE_REGEX.test(phone.value);
})

watch( () => dateValue.value, () => {
    const dateList: string[] = dateValue.value![0].split("-");
    const year = Number(dateList[0]);
    const month = Number(dateList[1]) - 1;
    const day = Number(dateList[2]);
    var date = new Date(year, month, day);
    if(date.getDay() === 3) {
        isSat.value = false;
    }
    else {
        isSat.value = true;
    }
})

const createPurchase = () => {
    console.log(dateValue.value)
    const customer = new Customer();
    customer.firstName = name.value;
    customer.email = email.value;
    customer.phone = phone.value!;

    const order = new Order();
    order.payment = payment.value
    order.totalPrice = computed(() => store.getters['cart/cartTotalPrice']).value;
    order.totalQuantity = computed(() => store.getters['cart/cartTotalQuantity']).value;
    order.savings = computed(() => store.getters['cart/getSavings']).value;

    const orderItems: OrderItem[] = [];
    const cartItems = computed((): CartItem[] => store.getters['cart/cartProducts']).value;
    cartItems.forEach((item) => {
        orderItems.push(new OrderItem(item));
    });

    const pickupTime = new PickupTime();
    pickupTime.pTime = time.value!;
    pickupTime.pDate = dateValue.value!

    const purchase = new Purchase();
    purchase.customer = customer;
    purchase.order = order;
    purchase.orderItems = orderItems;
    purchase.pickupDate = dateValue.value![0] + "," + time.value;
    purchase.type = "Pickup"

    store.commit('purchase/setPurchase', purchase);
    router.push("/checkout/confirmation");
}
</script>
