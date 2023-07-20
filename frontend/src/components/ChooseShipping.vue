<template>
    <div class="flex flex-col gap-3 md:gap-5 pt-2 sm:pt-5 w-full md:min-w-[20rem] lg:min-w-[28rem]"> 
        <h1 class="font-bold text-lg md:text-xl">Please Choose A Method to Get Your Items</h1>
        <div class="space-y-5">
            <div class="collapse collapse-open bg-base">
                <div class="collapse-title md:text-lg font-medium">
                    Free Pickup
                </div>
                <div class="p-2 md:p-5"> 
                    <div class="grid grid-rows-2"> 
                        <p>hello</p>
                        <router-link to="/checkout/pickup" class="place-self-end">
                            <button class="btn btn-xs md:btn-sm btn-outline">Continue
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </router-link>
                    </div>
                    
                </div>
                
                
            </div>
            <div class="collapse collapse-open bg-base">
                <div class="collapse-title md:text-lg font-medium">
                    Shipping
                </div>
                <div class="p-2 md:p-5"> 
                    <div class="grid grid-rows-2"> 
                        <p>hello</p>
                        <router-link to="/checkout/shipping" class="place-self-end">
                            <button class="btn btn-xs md:btn-sm btn-outline">Continue
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </router-link>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </div>
    
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>