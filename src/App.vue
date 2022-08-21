<script setup lang="ts">
import { ref, reactive } from 'vue'
import {PDF} from './utils/allUtils'
const score = ref<HTMLInputElement|null>(null)
// const arr = reactive<Array<string>>([])
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

<li v-for="i in arr">
  <img :src="i" alt="">
</li>


</template>
