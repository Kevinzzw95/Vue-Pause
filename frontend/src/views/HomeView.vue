<template>
	<div class="min-h-screen">
		
		<div class="min-w-full w-auto pb-2">
			<!-- <video-player /> -->
			<HeroSlider>
				<Slide v-for="slide in 4" :key="slide">
					<HeroCard/>
				</Slide>
			</HeroSlider>
		</div>

		<!-- ======= Slogan Section ======= -->
		<div class="slogan">
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
			<event-slider>
				<Slide v-for="slide in 4" :key="slide">
					<event-card />
				</Slide>
			</event-slider>
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
</script>

<style scope>
.slogan {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/img/stats-bg.jpg") center center;
  background-size: cover;
  padding: 50px 0;
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