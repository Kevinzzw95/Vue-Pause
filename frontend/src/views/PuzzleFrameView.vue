<template>
    <div>
        <div class="sticky top-24 z-20 px-3 md:px-16 2xl:px-32 glass">
            <div class="flex flex-row items-center space-x-2 md:space-x-4 text-sm md:text-md py-5">
                <h1>Filter:</h1>
                <label class="swap btn btn-xs md:btn-sm bg-base w-auto">
                    <input v-model="inStock" type="checkbox" />
                    <div class="swap-off" :value="false">All Products</div>
                    <div class="swap-on" :value="true">In Stock</div>
                </label>
                
            </div>
        </div>
        
        <div class="container p-6 md:px-16 2xl:px-32 min-h-screen">
            <div class="alert alert-info bg-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-deep shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="font-bold">We do not have shipping options for Frames at this time. All Frames can only be picked up!</span>
            </div>
            <div class="container pt-5">
                <div class="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 lg:gap-8">
                    <product-card :item="product" v-for="product in products" :key="product.id"/>
                </div>
            </div>

            <div v-if="totalPages > 1" class="join flex justify-center">
                <input @click="curPage = index" v-for="index in totalPages" class="join-item btn btn-sm md:btn-md btn-square" type="radio" name="options" :aria-label="index.toString()" :checked="index === curPage" />
            </div>
        </div>
        
    </div>
    

    
</template>

<script setup lang="ts">
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router'
import type { GetResponsePuzzleFrames } from '../types/RestData';

const route = useRoute();
const products = ref<Product[]>();
const curPage = ref<number>(1);
const totalPages = ref<number>(0);
const inStock = ref(false);
const baseUrl = `/puzzleFrames`;


const refresh = () => {
    var targetUrl = baseUrl + `/search/findByStock?inStock=${inStock.value}&size=12`;  
    if(curPage.value !== 1){
        targetUrl += `&page=${curPage.value}`
    }
    axios.get<GetResponsePuzzleFrames>(targetUrl).then(
        (res) => {
            products.value = res.data._embedded.puzzleFrames;
            totalPages.value = res.data.page.totalPages;
        },
        (err) => console.log(err) 
    )
}

watch(
    [() => curPage.value, () => inStock.value],
    () => {
        router.push({path: `/puzzle_frames`, query: {stock: inStock.value.toString(), page: curPage.value > 1 ? curPage.value : undefined}});
        refresh();
    }
)

onMounted(() => {
    const query = route.query;
    curPage.value = query.page ? Number(query.page) : 1;
    inStock.value = query.stock ? Boolean(query.stock) : false;
    refresh();
})


</script>
