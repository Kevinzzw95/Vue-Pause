<template>
    <div class="min-h-[84vh]">
        <div class="sticky top-24 z-20 px-3 md:px-16 2xl:px-32 glass">
            <div class="flex flex-row items-center space-x-2 md:space-x-4 text-sm md:text-md py-5">
                <h1>Filter:</h1>
                <label class="swap btn btn-xs md:btn-sm bg-base w-auto">
                    <input v-model="inStock" type="checkbox" />
                    <div class="swap-off" for="false">All Products</div>
                    <div class="swap-on" for="true">In Stock</div>
                </label>
            </div>
        </div>
        
        <div class="container p-3 md:p-16 2xl:p-32 min-h-screen lg:space-y-5">
            <div class="container">
                <div class="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 lg:gap-8">
                    <div v-if="isLoading" v-for="index in 8" class="relative animate-pulse flex card card-compact shadow-lg bg-base hover:scale-105 transition duration-500 cursor-pointer object-cover">
                        <figure class="bg-gray-300 w-full h-[10rem] md:h-[16rem]"></figure>
                        <div class="grid grid-rows-1 h-[4.5rem] md:h-[5rem] xl:h-[5.5rem] p-1 text-sm lg:text-md xl:text-lg">
                            <div class="flex flex-col font-bold items-center font-default gap-2 p-2">
                                <p class="w-36 bg-gray-300 h-4 rounded-md"></p>
                                <p class="w-36 bg-gray-300 h-4 rounded-md"></p>
                            </div>
                        </div>
                    </div>
                    <product-card v-if="!isLoading" :item="product" v-for="product in products" :key="product.sku"/>
                </div>
            </div>

            <div v-if="totalPages > 1" class="join flex justify-center">
                <input @click="curPage = index" v-for="index in totalPages" class="join-item btn btn-sm md:btn-md btn-square" type="radio" name="options" :aria-label="index.toString()" :checked="index === curPage" />
            </div>
        </div>
        
    </div>
    

    
</template>

<script setup lang="ts">
import { Product } from '@/types/Product';
import ProductCard from '../components/ProductCard.vue';
import axios from 'axios';
import { onMounted, onUpdated, ref, watch } from 'vue';
import type { GetResponseSearchView } from '@/types/RestData'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import router from '@/router'

const route = useRoute();
const query = route.query;

const products = ref<Product[]>();
const curPage = ref(query.page ? query.page : 1);
const totalPages = ref<number>(0);
const inStock = ref(query.stock != undefined ? query.stock : false);
const keywords = ref(query.keywords ? query.keywords : "")
const baseUrl = `/searchViews`;
const isLoading = ref(true)


const refresh = async () => {
    var targetUrl = baseUrl + `/search/findByKeywordsAndStock?keywords=${keywords.value}&inStock=${inStock.value}`;  
    if(curPage.value !== 1){
        targetUrl += `&page=${curPage.value}`
    }
    await axios.get<GetResponseSearchView>(targetUrl).then(
        (res) => {
            products.value = res.data._embedded.searchViews;
            totalPages.value = res.data.page.totalPages;
        },
        (err) => console.log(err) 
    )
    isLoading.value = false
    scrollToTop()
}

watch(
    [() => curPage.value, () => inStock.value],
    () => {
        router.push({path: `/search`, query: {keywords:keywords.value, stock: inStock.value.toString(), page: Number(curPage.value) > 1 ? curPage.value : undefined}});
        refresh();
    }
)

watch(() => keywords.value, () => {
    curPage.value = 1;
    inStock.value = false;
    refresh()
    router.push({path: `/search/`, query: {keywords:keywords.value, stock: inStock.value.toString(), page: curPage.value > 1 ? curPage.value : undefined}})
})

onBeforeRouteUpdate((to, from) => {
    keywords.value = String(to.query.keywords);
})

onMounted(() => {
    refresh();
})

const scrollToTop = () => {
    window.scrollTo(0,0);
}


</script>
