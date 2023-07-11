<template>
    <div id="video-frame" class="h-full" data-aos="fade-up">
		<div class="t-video h-full ">
			<video ref="video" class="w-full overflow-hidden" src="../assets/sample.mp4"></video>
			<div class="controls">
				<div class="green-bar">
				<div ref="timeline" class="green-apple"></div>
				</div>

				<div class="buttons">
				    <button ref="pbtn" :class="[videoPaused ? 'play' : 'pause']" @click="togglePlayPause(video)"></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
    import { defineComponent, onMounted, ref } from 'vue'
    const video = ref<HTMLVideoElement>();
    const timeline = ref<HTMLDivElement>();
    const pbtn = ref<HTMLButtonElement>();

    onMounted(() => {
        if(video.value) {
            video.value.addEventListener('timeupdate', () => {
                if(video.value) {
                    var pos = video.value.currentTime / video.value.duration;
                    timeline.value!.style.width = pos * 100 + "%";
                    if(video.value.ended) {
                        pbtn.value!.className = "play";
                    }
                }
                
            })
        }
        
    });
</script>

<script lang="ts">
    export default defineComponent({
        data() {
            return {
                videoPaused: true,

            }
        },
        methods: {
            togglePlayPause(video: HTMLVideoElement | undefined) {
                if(this.videoPaused) {
                    video?.play();
                    this.videoPaused = false;
                }
                else {
                    video?.pause();
                    this.videoPaused = true;
                }
            }
        }
        
    })
</script>

<style scoped>
    .buttons button {
    width: 40px;
    height: 40px;
    background: radial-gradient(#006400 50%, rgba(238, 240, 225, 0.4) 52%);
    border-radius: 50%;
    display: block;
    position: absolute;
    left: 1%;
    top: 20%;
    overflow: hidden;
    border: none;
    }

    .buttons button:before {
    content: "";
    position: absolute;
    width: 48px;
    height: 48px;
    animation-delay: 0s;
    animation: pulsate-btn 2s;
    animation-direction: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: steps;
    opacity: 1;
    border-radius: 50%;
    border: 5px solid #006400;
    top: -11%;
    left: -11%;
    background: rgb(198, 16, 0, 0);
    }

    .buttons button.play:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-40%) translateY(-50%);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #fff;
    z-index: 100;
    transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    .buttons button.play:hover:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-40%) translateY(-50%);
    width: 0;
    height: 0;
    border: none;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #fff;
    z-index: 200;
    animation: none;
    border-radius: 0;
    }


    .buttons button.play:hover:after {
    border-left: 15px solid #006400;
    transform: scale(20);
    }

    .buttons button.pause:after {
    content: "";
    position: absolute;
    left: 45%;
    top: 50%;
    transform: translateX(-40%) translateY(-50%);
    width: 15px;
    height: 15px;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;
    z-index: 100;
    transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    .buttons button.pause:hover:before {
    content: "";
    position: absolute;
    left: 45%;
    top: 50%;
    transform: translateX(-40%) translateY(-50%);
    width: 15px;
    height: 15px;
    border: none;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;
    z-index: 200;
    animation: none;
    border-radius: 0;
    }


    .buttons button.pause:hover:after {
    border-left: 15px solid #006400;
    border-right: 15px solid #006400;
    transform: scale(20);
    }

    @keyframes pulsate-btn {
        0% {
            transform: scale(0.6, 0.6);
            opacity: 1;
        }

        100% {
            transform: scale(1, 1);
            opacity: 0;
        }
    }
    #video-frame {
    position: relative;
    }

    .t-video {
    width: 100%;
    position: relative;
    overflow: hidden;
    }
    .t-video:hover .controls {
    transform: translateY(0);
    }
    .controls {
    display: flex;
    height: 60px;
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-wrap: wrap;
    background: rgba(238, 240, 225, 0.7);
    transform: translateY(100%) translateY(-6px);
    transition: all 0.2s;
    }
    .buttons {
    padding: 40px;
    }
    .green-bar {
    height: "10%";
    top: 0;
    left: 0;
    width: 100%;
    background: #000;
    }
    .green-apple {
    height: 10px;
    width: 100px;
    background-color: #006400;
    }
</style>