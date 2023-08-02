
<template>
    <div class="navbar bg-base p-0 font-default">
        <div class="navbar-start">
            <!-- <div class="drawer"> 
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">
                    <label for="my-drawer" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                </div> 
                <div class="drawer-side">
                    <label for="my-drawer" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-screen h-full shadow bg-deep z-50 text-white font-default">
                    <router-link to="/puzzles/1000">
                        <li><a>拼图 PUZZLES</a></li>
                    </router-link>
                    <router-link to="/puzzle_frames">
                        <li><a>拼图框 PUZZLE FRAMES</a></li>
                    </router-link>
                    <router-link to="/puzzle_acc">
                        <li><a>拼图配件 PUZZLE ACCESSORIES</a></li>
                    </router-link>
                    <router-link to="/table_games">
                        <li><a>桌游 TABLE GAMES</a></li>
                    </router-link>
                    <router-link to="/contact">
                        <li><a>联系我们 CONTACT US</a></li>
                    </router-link>
                    
                    </ul>
                </div>
            </div> -->
            <div class="hidden xl:block">
                <div class="flex flex-row pl-14 space-x-5 text-deep">
                    <router-link to="/puzzles/1000">
                        <h1 class="p-2 font-bold">PUZZLES</h1>
                    </router-link>
                    <router-link to="/puzzle_frames">
                        <h1 class="p-2 font-bold">FRAMES</h1>
                    </router-link>
                    <router-link to="/puzzle_acc">
                        <h1 class="p-2 font-bold">PUZZLE ACCESSORIES</h1>
                    </router-link>
                    <router-link to="/table_games">
                        <h1 class="p-2 font-bold">TABLE GAMES</h1>
                    </router-link>
                    
                </div>
                
            </div>
            <div class="absolute dropdown xl:hidden items-center" @click="openMenu = !openMenu">
                <details>
                    <summary class="btn btn-ghost btn-circl">
                        <svg v-if="!openMenu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        <svg v-if="openMenu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </summary>
                    <ul class="realtive top-[66px] left-0 dropdown-content z-50 menu p-0 mt-3 shadow bg-white w-screen h-screen font-default" >
                        <router-link to="/puzzles/1000">
                            <li class="border-b border-deep p-2"><a>PUZZLES</a></li>
                        </router-link>
                        <router-link to="/puzzle_frames">
                            <li class="border-b border-deep p-2"><a>FRAMES</a></li>
                        </router-link>
                        <router-link to="/puzzle_acc">
                            <li class="border-b border-deep p-2"><a>PUZZLE ACCESSORIES</a></li>
                        </router-link>
                        <router-link to="/table_games">
                            <li class="border-b border-deep p-2"><a>TABLE GAMES</a></li>
                        </router-link>
                        <router-link to="/contact">
                            <li class="border-b border-deep p-2"><a>CONTACT US</a></li>
                        </router-link>
                        
                    </ul>
                </details>
            </div>
            
        </div>
        <div class="navbar-center">
            <router-link to="/">
                <img
                    src="../assets/logo_new.png"
                    class="img-fluid"
                    alt=""
                    width="80"
                    height="80"
                />
            </router-link>
        </div>
        <div class="navbar-end px-2 xl:space-x-5">
            <div class="hidden xl:block text-deep">
                <router-link to="/contact">
                    <h1 class="p-2 font-bold">CONTACT US</h1>
                </router-link>
            </div>
            <label @click="openSearch = !openSearch" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </label>

            <!-- <div class="drawer drawer-end z-40">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex justify-end">
                    <label for="my-drawer" class="btn btn-ghost btn-circle selection:drawer-button">
                        <div class="indicator">
                            <ShoppingBagIcon class="h-5 w-5" />
                            <span class="badge badge-sm indicator-item">{{ totalQuantity }}</span>
                        </div>                    
                    </label>
                </div>
                <div class="drawer-side z-50">
                    <label for="my-drawer" class="drawer-overlay"></label>
                    <ul class="menu w-screen lg:w-[30rem] h-full bg-base-200 text-base-content space-y-2 items-center">
                        
                        <li class="self-start">
                            <div class="flex flex-row items-center space-x-2 self-center">
                                <label for="my-drawer" class="btn btn-circle btn-ghost selection:drawer-button">✕</label>
                            </div>
                        </li>
                        <li class="text-lg">
                            <span class="font-bold">{{ totalQuantity }} Items</span>
                                <span class="text-primary">Savings: C${{ savings }}</span>
                            <span class="text-primary">Subtotal: C${{ totalPrice - savings }}</span>
                        </li>
                        
                        <li>  
                            
                                <table class="table">
                                    <tbody>
                                    <tr v-for="cartItem in cartItems">
                                        <td class="p-2">
                                            <div class="flex flex-row">
                                                <div class="avatar self-start">
                                                    <div class="mask mask-square rounded-md w-24 h-24">
                                                        <img :src="cartItem.imageUrl" alt="CartItem" />
                                                    </div>
                                                </div>
                                                <div class="flex flex-col items-start pl-4 text-lg">
                                                    <p class="font-bold">{{ cartItem.name.split(" ")[0] }}</P>
                                                    <p class="font-bold">{{ cartItem.name.split(/ (.*)/)[1] }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-2">
                                            <div class="text-lg opacity-50">C${{ cartItem.unitPrice }} x{{ cartItem.quantity }}</div>
                                        </td>
                                    </tr>
                                    </tbody> 
                                </table>
                            
                            <div class="card-actions">
                                <button @click="$router.push('/cart')" class="btn text-white btn-sm md:btn-md btn-block bg-deep">View cart</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div> -->
            <div class="dropdown dropdown-end text-lg">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <ShoppingBagIcon class="h-5 w-5" />
                        <span class="badge badge-sm indicator-item">{{ totalQuantity }}</span>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 z-40 card card-compact dropdown-content w-[16rem] lg:w-[25rem] bg-base-100 shadow rounded-xl font-default">
                    <div class="card-body">
                        <span class="font-bold text-lg lg:text-xl">{{ totalQuantity }} Items</span>
                        <span class="text-primary lg:text-lg">Savings: C${{ savings }}</span>
                        <span class="text-primary lg:text-lg">Subtotal: C${{ totalPrice - savings }}</span>
                        <div class="overflow-x-auto">
                            <table class="table">
                                <tbody>
                                <tr v-for="cartItem in cartItems">
                                    <td class="p-2">
                                        <div class="flex flex-row">
                                            <div class="avatar self-start">
                                                <div class="mask mask-square rounded-md w-14 h-14">
                                                    <img :src="cartItem.imageUrl" alt="CartItem" />
                                                </div>
                                            </div>
                                            <div class="flex flex-col items-start pl-2 lg:text-lg">
                                                <p class="font-bold">{{ cartItem.name.split(" ")[0] }}</P>
                                                <p class="font-bold">{{ cartItem.name.split(/ (.*)/)[1] }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-2">
                                        <div class="text-sm opacity-50">C${{ cartItem.unitPrice }} x{{ cartItem.quantity }}</div>
                                    </td>
                                </tr>
                                </tbody> 
                            </table>
                        </div>
                        <div class="card-actions">
                            <button @click="$router.push('/cart')" class="btn text-white btn-sm md:btn-md btn-block bg-deep lg:text-lg">View cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <div v-if="openSearch" class="grid grid-cols-3 space-x-2 self-center bg-base w-full p-2">
        <div class="join self-center justify-self-center col-start-2 col-span-1">
            <input @keyup.enter="search(keywords!)" v-model="keywords" type="text" placeholder="Search for products" class="input input-deep join-item text-sm md:text-md w-[13rem] md:w-[60rem] p-2" />
            <label @click="search(keywords!)" class="btn bg-white join-item border-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[2.5rem] w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </label>
        </div>
        <label @click="openSearch= false" class="btn btn-circle btn-ghost text-center col-start-3 justify-self-end">✕</label>
    </div>
    <div className="divider m-0 bg-deep overflow-hidden"></div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useStore } from '@/store';
import { computed, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue';
import router from '@/router';
import { CartItem } from '../types/CartItem';
import cart from '../store/modules/cart';

const store = useStore();

const totalPrice = computed(() => store.getters['cart/cartTotalPrice']);
const totalQuantity = computed(() => store.getters['cart/cartTotalQuantity']);
const cartItems = computed((): CartItem[] => store.getters['cart/cartProducts']);
const savings = computed(() => store.getters['cart/getSavings']);
const openSearch = ref(false)
const openMenu = ref(false);

const keywords = ref<string>();

const search = (target: string) => {
    if(target !== undefined) {
        router.push({path: '/search', query: {keywords: target}});
    }
    
}

</script>