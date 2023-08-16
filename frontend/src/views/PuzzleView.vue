<template>
    <div class="relative min-h-[84vh]">
        <div class="sticky top-24 z-20 px-3 md:px-16 2xl:px-32  pb-2 glass">
            <div class="py-3">
                <div class="tabs flex flex-row justify-center">
                    <a @click="() => curPieces = 500" :class="['tab','tab-bordered','tab-sm','sm:tab-md','sm:text-lg','basis-1/4', curPieces === 500 ?  ['tab-active','text-deep'] : '']">500 PC</a> 
                    <a @click="() => curPieces = 800" :class="['tab','tab-bordered','tab-sm','sm:tab-md','sm:text-lg','basis-1/4', curPieces === 800 ?  ['tab-active','text-deep'] : '']">800 PC</a> 
                    <a @click="() => curPieces = 1000" :class="['tab','tab-bordered','tab-sm','sm:tab-md','sm:text-lg','basis-1/4', curPieces === 1000 ?  ['tab-active','text-deep'] : '']">1000 PC</a>
                    <a @click="() => curPieces = 2000" :class="['tab','tab-bordered','tab-sm','sm:tab-md','sm:text-lg','basis-1/4', curPieces === 2000 ?  ['tab-active','text-deep'] : '']">2000 PC</a>
                </div>
            </div>

            <div class="flex flex-row items-center space-x-2 md:space-x-4 text-sm md:text-md">
                <h1>Filter:</h1>
                <select v-model="curBrandId" class="select select-xs md:select-sm bg-base">
                    <option :value="undefined">ALL BRANDS</option>
                    <option v-for="brand in brands" :value="brand.id">{{ brand.name }}</option>
                </select>
                <label class="swap btn btn-xs md:btn-sm bg-base w-auto">
                    <input v-model="inStock" type="checkbox" />
                    <div class="swap-off" :value="false">All Products</div>
                    <div class="swap-on" :value="true">In Stock</div>
                </label>
                
            </div>
        </div>
        
        <div class="container p-3 md:px-16 2xl:p-32 min-h-screen lg:space-y-5">
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

            <div v-if="totalPages > 1" class="flex justify-center py-5 space-x-4">
                <button @click="curPage--" v-if="curPage !== 1" class="btn-page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button @click="curPage = index" v-for="index in totalPages > 5 ? 5 : totalPages" :class="['btn-page-number','h-10','w-10','rounded-md', curPage === index ? 'btn-page-number--current' : '']">{{ index }}</button>
                <button @click="curPage++" v-if="curPage !== totalPages" class="btn-page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
        
    </div>
    

    
</template>

<script setup lang="ts">
import { Product } from '@/types/Product';
import ProductCard from '../components/ProductCard.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import type { GetResponsePuzzles } from '@/types/RestData'
import type { GetResponseBrands } from '@/types/RestData'
import type { Brand } from '@/types/Brand';
import { useRoute } from 'vue-router';
import router from '@/router'

const route = useRoute();
const query = route.query;
const products = ref<Product[]>();
const brands = ref<Brand[]>();
const curPage = ref(query.page ? Number(query.page) : 1);
const curBrandId = ref(query.brand ? query.brand : undefined);
const totalPages = ref<number>(0);
const inStock = ref(query.stock ? query.stock : false);
const curPieces = ref(Number(route.params.pieces));
const baseUrl = `/puzzles/search/findByPiecesAndFilter`;
const isLoading = ref(true);


const refresh = async () => {
    isLoading.value = true;
    var targetUrl = baseUrl + `?pieces=${curPieces.value}&inStock=${inStock.value}&size=12`;
    if(curBrandId.value) {
        targetUrl += `&id=${curBrandId.value}`;
        if(curPage.value) {
            targetUrl += `&page=${curPage.value}`
        }
    }   
    else if(curPage.value){
        targetUrl += `&page=${curPage.value}`
    }
    await axios.get<GetResponsePuzzles>(targetUrl).then(
        (res) => {
            products.value = res.data._embedded.puzzles;
            totalPages.value = res.data.page.totalPages;
        },
        (err) => console.log(err) 
    )
    isLoading.value = false
}

watch(
    [() => curPage.value, () => curBrandId.value, () => inStock.value],
    ([page, brandId, stock],[prevPage, prevBrandId, prevStock]) => {
        if(brandId != prevBrandId) {
            curPage.value = 1;
        }
        router.push({path: `/puzzles/${curPieces.value}`, query: {brand: curBrandId.value, stock: inStock.value.toString(), page: Number(curPage.value) > 1 ? curPage.value : undefined}});
        refresh();
    }
)

watch(() => curPieces.value, () => {
    curBrandId.value = undefined;
    curPage.value = 1;
    inStock.value = false;
    refresh()
    router.push(`/puzzles/${curPieces.value}`)
    
})

onMounted(() => {
    axios.get<GetResponseBrands>("/brands").then(
        (res) => {brands.value = res.data._embedded.brands
        }
    )
    refresh();
})
</script>

<style>

.btn-page {
    background-color: transparent;
    border: none;
    border-radius: 50%;
    stroke: green;
}

.btn-page-number:link,
.btn-page-number:visited {
    font-size: 18px;
    border-radius: 50%;
    background-color: transparent;
    text-decoration: none;
}

.btn-page-number:hover,
.btn-page-number:active,
.btn-page-number--current {
    background-color: green;
    color: white;
}


</style>
