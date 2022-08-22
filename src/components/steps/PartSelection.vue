<script setup lang="ts">
import { useScoreStore } from "@/store/scoreStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useScoreStore()

const {pdf} = storeToRefs(store)

const currentPageIndex = ref(0)

</script>

<template>
<div class="grid grid-cols-2 flex-grow">
    <div class="">
        <img :src="pdf?.imgs[currentPageIndex]" alt="">
    </div>
    <div class=" bg-teal-500">
        two
    </div>

</div>

</template>
