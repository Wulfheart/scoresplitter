<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue'
import { useScoreStore } from './store/scoreStore';
import {PDF} from './utils/allUtils'

const scoreStore = useScoreStore()

const {currentStep} = storeToRefs(scoreStore)

const score = ref<HTMLInputElement|null>(null)
let arr = ref<Array<string>>([])

async function fill() {
  if(score.value?.files && score.value.files.length > 0) {
    let file = score.value.files[0]
    let pdf = await PDF.fromFile(file)
    arr.value = pdf.imgs
    
  }
}

</script>

<template>
<input type="file" ref="score" @change="fill" accept="application/pdf">

<div v-for="i in arr" class="h-screen max-h-screen bg-green-500 border-y-2">
  <img :src="i" alt="" class="object-contain max-h-full">
</div>


</template>
