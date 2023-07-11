<template>
    <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            <product-card :item="product" v-for="product in props.products" :key="product.id"/>
        </div>
    </div>

    <div class="join flex justify-center">
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="1" checked />
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="2" />
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="3" />
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="4" />
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product';

const props = defineProps<{
    products: Product[],
    filter: number,
    inStock: boolean,
    page: number
}>()
</script>

<style scoped>

</style>