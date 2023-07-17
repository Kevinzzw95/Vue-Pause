<template>
    <div class="container p-3 md:p-16 2xl:p-32 space-y-4 min-h-screen">

        <div class="flex flex-row items-center space-x-2 md:space-x-4 text-sm md:text-md">
            <h1>Filter:</h1>
            <label class="swap btn btn-xs md:btn-sm bg-base w-auto">
                <input v-model="inStock" type="checkbox" />
                <div class="swap-off" for="false">All Products</div>
                <div class="swap-on" for="true">In Stock</div>
            </label>
            
        </div>

        <div class="container">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <product-card :item="product" v-for="product in products" :key="product.sku"/>
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


</script>
