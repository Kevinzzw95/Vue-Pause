<template>
	<div class="min-h-screen sm:px-[8rem] 2xl:px-[15rem] sm:py-[2rem]">
		
		<div class="min-w-full w-auto pb-2">
			<!-- <video-player /> -->
			<HeroSlider>
				<Slide v-for="slide in 4" :key="hero_img[slide-1]">
					<HeroCard :src="hero_img[slide-1]"/>
				</Slide>
			</HeroSlider>
		</div>

		<!-- ======= Slogan Section ======= -->
		<div class="slogan p-6 sm:p-16">
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

		<div class="py-2">
			<div class="flex flex-col w-full md:flex-row gap-4 font-default pt-5">
				<div class="basis-1/2 bg-base rounded-lg p-5">
					<h1 class="text-lg font-bold">Shipping</h1>
					<p>Free shipping on orders:</p>
					<p>over $95 in Scarborough/Markham/Richmond HIill/Vaughan/North York;</p>
					<p>over $150 Canada wide;</p>
					<p>over $180 worldwide.</p>
				</div>
				<div class="basis-1/2 bg-base rounded-lg p-5">
					<h1 class="text-lg font-bold">Happy puzzle month!</h1>
					<p>Order any 1000 pieces puzzle + frame</p> 
					<p>Get $5 OFF (*^▽^*)</p> 
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
import VideoPlayer from '../components/VideoPlayer.vue';
import EventCard from '../components/EventCard.vue';
import EventSlider from '../components/EventSlider.vue';
import { Slide } from 'vue3-carousel';
import HeroCard from '../components/HeroCard.vue';
import HeroSlider from '../components/HeroSlider.vue';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

const hero_img = ref(['', '', '', '']);

const handleResize = () => {
	for(var i = 0; i < 4; ++i) {
		if(window.innerWidth < 700) {
			hero_img.value[i] = '/img/hero-' + (i+1) + '-small.jpg'
		}
		else{
			hero_img.value[i] = '/img/hero-' + (i+1) + '.jpg'
		}
	}
}

onBeforeMount(() => {
	handleResize();
})

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
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
  font-size: 20px;
  display: block;
  color: #fff;
  font-weight: 400;
}


</style>