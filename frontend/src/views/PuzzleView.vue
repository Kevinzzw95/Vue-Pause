<template>
    <div class="container p-3 md:p-16 2xl:p-32 space-y-4 h-full">
        <div class="flex flex-row justify-center py-10">
            <div class="tabs">
                <a @click="() => curPieces = 500" :class="['tab','tab-bordered', curPieces === 500 ?  ['tab-active','text-deep'] : '']">500 pcs</a> 
                <a @click="() => curPieces = 800" :class="['tab','tab-bordered', curPieces === 800 ?  ['tab-active','text-deep'] : '']">800 pcs</a> 
                <a @click="() => curPieces = 1000" :class="['tab','tab-bordered', curPieces === 1000 ?  ['tab-active','text-deep'] : '']">1000 pcs</a>
                <a @click="() => curPieces = 2000" :class="['tab','tab-bordered', curPieces === 2000 ?  ['tab-active','text-deep'] : '']">2000 pcs</a>
            </div>
        </div>

        <div class="flex flex-row items-center space-x-2 md:space-x-4 text-sm md:text-md">
            <h1>Filter:</h1>
            <select v-model="curBrandId" class="select select-xs md:select-sm bg-base">
                <option :value="undefined">All Brands</option>
                <option v-for="brand in brands" :value="brand.id">{{ brand.name }}</option>
            </select>
            <label class="swap btn btn-xs md:btn-sm bg-base w-auto">
                <input v-model="inStock" type="checkbox" />
                <div class="swap-off" :value="false">All Products</div>
                <div class="swap-on" :value="true">In Stock</div>
            </label>
            
        </div>

        <div class="container">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <product-card :item="product" v-for="product in products" :key="product.id"/>
            </div>
        </div>

        <div v-if="totalPages > 1" class="join flex justify-center">
            <input @click="curPage = index" v-for="index in totalPages" class="join-item btn btn-square" type="radio" name="options" :aria-label="index.toString()" :checked="index === curPage" />
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
import { store } from '@/store';

const route = useRoute();
const query = route.query;
const products = ref<Product[]>();
const brands = ref<Brand[]>();
const curPage = ref(query.page ? query.page : 1);
const curBrandId = ref(query.brand ? query.brand : undefined);
const totalPages = ref<number>(0);
const inStock = ref(query.stock ? query.stock : false);
const curPieces = ref(Number(route.params.pieces));
const baseUrl = `/puzzles/search/findByPiecesAndFilter`;


const refresh = async () => {
    var targetUrl = baseUrl + `?pieces=${curPieces.value}&inStock=${inStock.value}`;
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
        (res) => brands.value = res.data._embedded.brands
    )
    refresh();
})


</script>
