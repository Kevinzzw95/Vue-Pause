
<template>
    <div class="navbar bg-base p-0">
        <div class="navbar-start">
            <div class="dropdown px-2">
                <label @click="" tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabindex="0" class="dropdown-content z-50 menu mt-3 p-2 shadow bg-deep w-65 text-white font-primary rounded-md">
                    <router-link to="/puzzles/1000">
                        <li><a>拼图 Puzzles</a></li>
                    </router-link>
                    <router-link to="/puzzle_frames">
                        <li><a>拼图框 Puzzle Frames</a></li>
                    </router-link>
                    <router-link to="/puzzle_acc">
                        <li><a>拼图配件 Puzzle Accessories</a></li>
                    </router-link>
                    <router-link to="/table_games">
                        <li><a>桌游 Table Games</a></li>
                    </router-link>
                    <router-link to="/contact">
                        <li><a>联系我们 Contact Us</a></li>
                    </router-link>
                    
                </ul>
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
        <div class="navbar-end px-2">
            <div class="drawer drawer-end z-40">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex justify-end">
                    <!-- Page content here -->
                    <label for="my-drawer" class="btn btn-ghost btn-circle selection:drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </label>
                </div> 
                <div class="drawer-side">
                    <label for="my-drawer" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content space-y-2">
                        <!-- Sidebar content here -->
                        <div class="">
                            <div class="flex flex-row items-center space-x-2">
                                <input @keyup.enter="search(keywords!)" v-model="keywords" type="text" placeholder="Search for products" class="input input-bordered input-deep w-full max-w-xs" />
                                <label for="my-drawer" class="btn btn-circle btn-ghost selection:drawer-button">✕</label>
                            </div>
                            <h1 class="font-bold pt-2">You may want</h1>
                            <ul> 
                                <li><a @click="search('花火夜游')">花火夜游</a></li>
                                <li><a @click="search('城市月色')">城市月色</a></li>
                                <li><a @click="search('摘')">摘</a></li>
                            </ul>
                        </div>
                        
                    
                    </ul>
                </div>
            </div>
            <router-link to="/cart">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    
                        <div class="indicator">
                            <ShoppingBagIcon class="h-5 w-5" />
                            <span class="badge badge-sm indicator-item">{{ totalQuantity }}</span>
                        </div>
                </label>
            </router-link>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useStore } from '@/store';
import { computed, ref } from 'vue';
import router from '@/router';

const store = useStore()

const keywords = ref<string>();

const search = (target: string) => {
    if(target !== undefined) {
        router.push({path: '/search', query: {keywords: target}});
    }
    
}

const totalQuantity = computed(() => store.getters['cart/cartTotalQuantity'])
</script>