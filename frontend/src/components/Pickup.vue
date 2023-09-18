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
                <VueDatePicker :enable-time-picker="false" v-model="dateValue" :min-date=minDate :max-date=endDate :allowed-dates="allowedDates" :format="format" :start-date="startDate" input-class-name="dp-custom-input" position="left" disable-year-select auto-apply :close-on-auto-apply="false" :highlight="highlightedDates" prevent-min-max-navigation/>
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
                <input type="text" placeholder="" class="input border-green-800 input-primary w-full max-w-full max-h-[42px] text-lg" v-model="name"/> 
            </div>
            
        </div>
        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Email Address*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input type="text" placeholder="" class="input border-green-800 input-primary text-lg w-full max-w-full max-h-[42px]" v-model="email"/> 
                <CheckCircleIcon v-if="validEmail && email" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validEmail && email" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
            
        </div>
        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Telephone*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input type="text" placeholder="" class="input border-green-800 input-primary w-full max-w-full max-h-[42px] text-lg" v-model="phone"/>
                <CheckCircleIcon v-if="validPhone && phone" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validPhone && phone" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
            
        </div>

        <div> 
            <label class="label font-bold">
                <span class="label-text lg:text-lg">Payment Method*</span>
            </label>
            <select class="select select-bordered w-full max-w-full max-h-[40px] text-lg border-green-800" v-model="payment">
                <option disabled selected>Select A Method</option>
                <option>Cash</option>
                <option>e-Transfer</option>
                <option>WeChat</option>
                <option>Alipay</option>
            </select>
        </div>
        <div class="flex flex-row justify-between pt-4"> 
            <button @click="$router.go(-1)" class="btn bg-base flex text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
            </button>
            <button class="btn bg-base text-lg" @click="!validEmail || !validPhone || !dateValue || !time || !payment? null : createPurchase() " :disabled="!validEmail || !validPhone || !dateValue || !time || !payment || !name ? true : false">Next
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
import { onMounted, ref, watch } from 'vue';
import { computed } from 'vue'
import { useStore } from '@/store';
import { OrderItem } from '@/types/OrderItem';
import type { CartItem } from '@/types/CartItem';
import { PickupTime } from '@/types/PickupTime';
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import router from '@/router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { all } from 'axios';


const minDate = new Date()
const startDate = ref(new Date())
const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate());
/* const dDate = (date: Date) => {
    return date < new Date() || date > new Date(today.getFullYear(), today.getMonth() + 2, today.getDate()) || (date.getDay() !== 3 && date.getDay() !== 6);
} */
const highlightedDates = ref<Date[]>([])
const format = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Selected: ${day}/${month}/${year}`;
}

const allowedDates = computed(() => {
    var allowed = []
    let curDate = new Date()
    while(curDate <= new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())) {
        if(curDate.getDay() === 3 || curDate.getDay() === 6) {
            allowed.push(new Date(curDate))
            highlightedDates.value.push(new Date(curDate))
        }
        curDate.setDate(curDate.getDate() + 1)
    }
    return [...allowed]
});

const store = useStore()
const purchaseInfo = computed((): Purchase => store.getters['purchase/getPurchase']).value;

const dateValue = ref();
const time = ref();
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
    /* const dateList: string[] = dateValue.value![0].split("-");
    const year = Number(dateList[0]);
    const month = Number(dateList[1]) - 1;
    const day = Number(dateList[2]); */
    var date = new Date(dateValue.value);
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
    purchase.pickupDate = dateValue.value.toISOString().split('T')[0] + "," + time.value;
    purchase.type = "Pickup"

    store.commit('purchase/setPurchase', purchase);
    router.push("/checkout/confirmation");
}
</script>

<style>
.dp__theme_light {
   --dp-background-color: #ffffff;
   --dp-text-color: rgb(14, 15, 14);
   --dp-hover-color: #f3f3f3;
   --dp-hover-text-color: #212121;
   --dp-hover-icon-color: #959595;
   --dp-primary-color: #14532d;
   --dp-primary-text-color: #f8f5f5;
   --dp-secondary-color: #c0c4cc;
   --dp-border-color: #ddd;
   --dp-menu-border-color: #ddd;
   --dp-border-color-hover: #aaaeb7;
   --dp-disabled-color: #f6f6f6;
   --dp-scroll-bar-background: #f3f3f3;
   --dp-scroll-bar-color: #959595;
   --dp-success-color: #76d275;
   --dp-success-color-disabled: #a3d9b1;
   --dp-icon-color: #959595;
   --dp-danger-color: #ff6f60;
   --dp-highlight-color: rgba(61, 135, 5, 0.2);
}

.dp-custom-input {
    font-size: 15px;
    width: full;
    border-radius: 6px;
    height: 45px; 
    border-color: #14532d;
    font-family: "xxrt";
}

:root {
    /*General*/
    --dp-font-family: "xxrt";
    --dp-border-radius: 4px; /*Configurable border-radius*/
    --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
    --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

    /*Sizing*/
    --dp-button-height: 35px; /*Size for buttons in overlays*/
    --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
    --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
    --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
    --dp-cell-size: 35px; /*Width and height of calendar cell*/
    --dp-cell-padding: 5px; /*Padding in the cell*/
    --dp-common-padding: 10px; /*Common padding used*/
    --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
    --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
    --dp-menu-min-width: 300px; /*Adjust the min width of the menu*/
    --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
    --dp-row-maring:  5px 0; /*Adjust the spacing between rows in the calendar*/
    --dp-calendar-header-cell-padding:  0.5rem; /*Adjust padding in calendar header cells*/
    --dp-two-calendars-spacing:  10px; /*Space between multiple calendars*/
    --dp-overlay-col-padding:  3px; /*Padding in the overlay column*/
    --dp-time-inc-dec-button-size:  32px; /*Sizing for arrow buttons in the time picker*/
    --dp-menu-padding: 6px 8px; /*Menu padding*/
    
    /*Font sizes*/
    --dp-font-size: 1rem; /*Default font-size*/
    --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
    --dp-time-font-size: 0.8rem; /*Font size in the time picker*/
    
    /*Transitions*/
    --dp-animation-duration: 0.1s; /*Transition duration*/
    --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
    --dp-transition-timing: ease-out; /*Timing on slide animations*/
}
</style>
