<template>
    <div class="container p-3 md:p-16 2xl:p-32 space-y-10 h-full">

        <div class="flex flex-row items-center space-x-2 md:space-x-4 text-sm md:text-md">
            <h1>Filter:</h1>
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
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import type { GetResponseAccs } from '@/types/RestData'
import { useRoute } from 'vue-router';
import router from '@/router'

const route = useRoute();
const products = ref<Product[]>();
const curPage = ref<number>(1);
const totalPages = ref<number>(0);
const inStock = ref(false);
const baseUrl = `/accessories`;


const refresh = () => {
    var targetUrl = baseUrl + `/search/findByStock?inStock=${inStock.value}&size=12`;  
    if(curPage.value !== 1){
        targetUrl += `&page=${curPage.value}`
    }
    axios.get<GetResponseAccs>(targetUrl).then(
        (res) => {
            products.value = res.data._embedded.accessories;
            totalPages.value = res.data.page.totalPages;
        },
        (err) => console.log(err) 
    )
}

watch(
    [() => curPage.value, () => inStock.value],
    () => {
        router.push({path: `/accessories`, query: {stock: inStock.value.toString(), page: curPage.value > 1 ? curPage.value : undefined}});
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
