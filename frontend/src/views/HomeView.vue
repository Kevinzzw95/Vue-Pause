<template>
	<div class="font-secondary">
		
		<div class="w-auto pb-2">
			<!-- <video-player /> -->
			
			<!-- <div class="md:hidden">
				<HeroCard v-for="slide in 4" :key="hero_img[slide-1]" :src="hero_img[slide-1]" :url="'/search?keywords=' + hero_keywords[slide-1] + '&stock=true'"/>
			</div> -->
			
			<HeroSlider >
				<Slide v-for="slide in 4" :key="hero_img[slide-1]">
					<HeroCard :src="hero_img[slide-1]" :url="'/search?keywords=' + hero_keywords[slide-1] + '&stock=false'"/>
				</Slide>
			</HeroSlider>
		</div>

		<div class="container grid lg:px-10 py-8 justify-items-center p-2">
			<h1 class="font-default text-4xl pb-5">Our Favorites</h1>
			<div class="justify-items-start grid grid-cols-2 sm:grid-cols-4 gap-4 xl:gap-8">
				<product-card v-for="item in recommendation" :item="item"/>
			</div>
		</div>

		<!-- ======= Slogan Section ======= -->
		<div class="slogan py-6 px-3 md:p-8 lg:p-16 font-default text-lg md:text-2xl lg:text-4xl">
			<div class="" data-aos="zoom-out">
				<div class="flex flex-row justify-items-center">
					<div class="stats-item text-center">
						<span>Pause Your Life</span>
					</div>
					<div class="stats-item text-center">
						<span>Live A Little</span>
					</div>
				</div>
			</div>
		</div>
		<!-- End Slogan Section -->

		<div class="container grid md:py-2 justify-items-center">
			<div class="flex flex-col md:flex-row font-default lg:px-10 py-8 max-w-[70rem]">
				<div class="bg-base md:rounded-lg lg:basis-1/2">
					<img src="/img/event-1.jpg" />
				</div>
				<div class=" bg-base md:rounded-lg lg:basis-1/2">
					<img src="/img/event-2.jpg" />
				</div>
			</div>
			<!-- <event-slider>
				<Slide key="1">
					<event-card src="/img/events/events-1.jpg" />
				</Slide>
				<Slide key="2">
					<event-card src="/img/events/events-2.jpg" />
				</Slide>
				<Slide key="3">
					<event-card src="/img/events/events-1.jpg" />
				</Slide>
				<Slide key="4">
					<event-card src="/img/events/events-2.jpg" />
				</Slide>
			</event-slider> -->

		</div>
	</div>
	

</template>

<script setup lang="ts">
import { Slide } from 'vue3-carousel';
import HeroCard from '../components/HeroCard.vue';
import HeroSlider from '../components/HeroSlider.vue';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { Product } from '../types/Product';
import axios from 'axios';
import type { GetResponseSearchView } from '@/types/RestData';
import ProductCard from '../components/ProductCard.vue';

const hero_img = ref(['', '', '', '']);
const hero_keywords = ['六米大象', 'Seren Art', 'T001 T002 T003', 'Pixel Pieces'];
const recommendation = ref<Product[]>([]);

const handleResize = () => {
	for(var i = 0; i < 4; ++i) {
		if(window.innerWidth <= 1024 && window.innerWidth < window.innerHeight) {
			hero_img.value[i] = '/img/hero-' + (i+1) + '-small.jpg'
		}
		else{
			hero_img.value[i] = '/img/hero-' + (i+1) + '.jpg'
		} 
	}	
}

onBeforeMount(() => {
	handleResize();
	getData(["P001"]);
})

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

const getData = async(skuList: string[]) => {
    try {
        await axios.get<GetResponseSearchView>(`/searchViews/search/findByTopStock?skuList=${skuList}&size=4`).then(
            (res) => recommendation.value = res.data._embedded.searchViews
        );
    } catch (error) {
        throw error
    }
}
</script>

<style scope>
.slogan {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/img/stats-bg.png") center center;
  background-size: cover;
}

@media (min-width: 1365px) {
  .slogan {
    background-attachment: fixed;
  }
}

.slogan .stats-item {
  width: 50%;
}

.slogan .stats-item span {
  display: block;
  color: #fff;
  font-weight: 400;
}


</style>