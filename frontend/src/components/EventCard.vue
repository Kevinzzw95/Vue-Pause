<template>
    <div class="div max-w-[35rem] max-h-[35rem] image-full px-1">
        <figure><img :src="src" alt="Shoes" class="rounded-box"/></figure>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    src: string
}>();

</script>
