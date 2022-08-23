<script setup lang="ts">
import { useScoreStore } from "@/store/scoreStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useScoreStore()

const {pdf} = storeToRefs(store)

const currentPageIndex = ref(0)

</script>

<template>
<div class="flex-grow max-h-full">
    <div class="max-h-full h-full">
        <div>
            <img :src="pdf?.imgs[currentPageIndex]" alt="" class="object-contain">
        </div>
        <div>

        </div>

    </div>
</div>

</template>
