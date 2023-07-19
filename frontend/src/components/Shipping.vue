<template>
    <div class="flex flex-col w-full">
        <h1 class="font-bold text-xl self-start">Shipping Infomation</h1>
    
        <div> 
            <label class="label">
                <span class="label-text font-bold">Email Address*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" v-model="email"/> 
                <CheckCircleIcon v-if="validEmail && email" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validEmail && email" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
        </div>
        
        <div> 
            <label class="label">
                <span class="label-text font-bold">Telephone*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" v-model="phone"/>
                <CheckCircleIcon v-if="validPhone && phone" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validPhone && phone" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
        </div>

        <div> 
            <label class="label">
                <span class="label-text font-bold">First Name*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input v-model="firstName" type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" />
                <CheckCircleIcon v-if="validFirstName && firstName" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validFirstName && firstName" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
            <label class="label">
                <span class="label-text font-bold">Last Name*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input v-model="lastName" type="text" placeholder=" " class="input input-bordered input-primary w-full max-w-full max-h-[42px]" />
                <CheckCircleIcon v-if="validLastName && lastName" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validLastName && lastName" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
            <label class="label">
                <span class="label-text font-bold">Address*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input v-model="street" type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" />
                <CheckCircleIcon v-if="street" class="inline-flex flex-none w-6 h-6 text-green-700"/>
            </div>
            <label class="label">
                <span class="label-text font-bold">City*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input v-model="city" type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" />
                <CheckCircleIcon v-if="city" class="inline-flex flex-none w-6 h-6 text-green-700"/>
            </div>
            <label class="label">
                <span class="label-text font-bold">Province*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <select v-model="province" class="shrink select select-bordered w-full max-w-full max-h-[40px]">
                    <option disabled selected>Select A Province</option>
                    <option>ON</option>
                    <option>QC</option>
                    <option>BC </option>
                    <option>NS</option>
                    <option>NB</option>
                    <option>MB </option>
                    <option>PE</option>
                    <option>SK</option>
                    <option>AB</option>
                    <option>NL</option>
                </select>                
                <CheckCircleIcon v-if="province" class="inline-flex flex-none w-6 h-6 text-green-700"/>
            </div>

            <label class="label">
                <span class="label-text font-bold">Post Code*(e.g. L4B 3P8)</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <input v-model="zipCode" type="text" placeholder="" class="input input-bordered input-primary w-full max-w-full max-h-[42px]" />
                <CheckCircleIcon v-if="validZipCode && zipCode" class="inline-flex flex-none w-6 h-6 text-green-700"/>
                <XCircleIcon v-if="!validZipCode && zipCode" class="inline-flex flex-none w-6 h-6 text-red-600"/>
            </div>
        </div>

        <div> 
            <label class="label">
                <span class="label-text font-bold">Payment Method*</span>
            </label>
            <div class="flex flex-row space-x-2 items-center">
                <select v-model="payment" class="shrink select select-bordered w-full max-w-full max-h-[40px]">
                    <option disabled selected>Select A Method</option>
                    <option>e-Transfer</option>
                    <option>WeChat</option>
                    <option>Alipay</option>
                </select>                
                <CheckCircleIcon v-if="payment" class="inline-flex flex-none w-6 h-6 text-green-700"/>
            </div>
        </div>
        <div class="flex flex-row justify-between pt-4"> 
            <button @click="$router.go(-1)" class="btn bg-base flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
            </button>
            <router-link to="/checkout/confirmation" class="">
                <button class="btn bg-base" @click="createPurchase()" :disabled="!validEmail || !validFirstName || !validLastName || !validPhone || !validZipCode || !province || !payment || !street || !city">Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </router-link>
        </div>
        
        
    </div>
</template>

<script setup lang="ts">
import { Customer } from '@/types/Customer';
import { Order } from '@/types/Order';
import { Purchase } from '@/types/Purchase';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { computed } from 'vue'
import { useStore } from '@/store';
import { OrderItem } from '@/types/OrderItem';
import type { CartItem } from '@/types/CartItem';
import { Address } from '@/types/Address';
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import axios from 'axios';

const store = useStore()
const purchaseInfo = computed((): Purchase => store.getters['purchase/getPurchase']).value;

const email = ref(purchaseInfo.customer?.email)
const phone = ref(purchaseInfo.customer?.phone)
const payment = ref(purchaseInfo.order?.payment)
const firstName = ref(purchaseInfo.customer?.firstName)
const lastName = ref(purchaseInfo.customer?.lastName)
const street = ref(purchaseInfo.shippingAddress?.street)
const city = ref(purchaseInfo.shippingAddress?.city)
const province = ref(purchaseInfo.shippingAddress?.province)
const zipCode = ref(purchaseInfo.shippingAddress?.zipCode)

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/;
const ZIPCODE_REGEX = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/
const NAME_REGEX = /^[a-z ,.'-]+$/i

const validEmail = ref(USER_REGEX.test(email.value))
const validPhone = ref(PHONE_REGEX.test(phone.value))
const validZipCode = ref(ZIPCODE_REGEX.test(zipCode.value!))
const validFirstName = ref(NAME_REGEX.test(firstName.value!))
const validLastName = ref(NAME_REGEX.test(lastName.value!))

const shippingFee = ref(purchaseInfo.order?.shippingFee);

const emit = defineEmits<{
  (e: 'shipping', shipping: number | null): void
}>()

watch( [email, phone, firstName, lastName], () => {
    validEmail.value = USER_REGEX.test(email.value);
    validPhone.value = PHONE_REGEX.test(phone.value);
    validFirstName.value = NAME_REGEX.test(firstName.value!)
    validLastName.value = NAME_REGEX.test(lastName.value!)

})

watch([zipCode, province], () => {
    validZipCode.value = ZIPCODE_REGEX.test(zipCode.value!);
    if(province.value && validZipCode.value) {
        axios.post<number>("/checkout/shipping", {province: province.value, postCode: zipCode.value}).then(
            res => {
                shippingFee.value = res.data;
                emit('shipping', res.data);
            },
            err => console.log(err)
        )
        
    }
    
})

const createPurchase = () => {
    const customer = new Customer();
    customer.email = email.value;
    customer.phone = phone.value!;
    customer.firstName = firstName.value
    customer.lastName = lastName.value

    const order = new Order();
    order.payment = payment.value
    order.totalPrice = computed(() => store.getters['cart/cartTotalPrice']).value;
    order.totalQuantity = computed(() => store.getters['cart/cartTotalQuantity']).value;
    order.shippingFee = shippingFee.value;
    order.savings = computed(() => store.getters['cart/getSavings']).value;

    const orderItems: OrderItem[] = [];
    const cartItems = computed((): CartItem[] => store.getters['cart/cartProducts']).value;
    cartItems.forEach((item) => {
        orderItems.push(new OrderItem(item));
    });

    const address = new Address(
        street.value!,
        city.value!,
        province.value!,
        zipCode.value!
    )

    const purchase = new Purchase();
    purchase.customer = customer;
    purchase.order = order;
    purchase.orderItems = orderItems;
    purchase.shippingAddress = address;
    purchase.type = "Shipping";

    store.commit('purchase/setPurchase', purchase);
}
</script>

