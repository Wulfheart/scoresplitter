<script setup lang="ts">
import { ref } from 'vue'
import * as PDFJSlib from "pdfjs-dist";


PDFJSlib.GlobalWorkerOptions.workerSrc = "/public/pdf.worker.min.js"
const score = ref<HTMLInputElement|null>(null)

async function fill() {
  if(score.value?.files && score.value.files.length > 0) {
    let file = score.value.files[0]
    let buffer = await file.arrayBuffer()
    let arr = new Uint8Array(buffer)
    let loadingTask = PDFJSlib.getDocument(arr)
    
    let doc = await loadingTask.promise
    
    console.debug(doc.numPages)
    let page = await doc.getPage(1)

    let canvas = document.createElement('canvas')
    canvas.width = page.getViewport().viewBox[2]
    canvas.height = page.getViewport().viewBox[3]

    let viewport = page.getViewport({scale: 1.0})
    let ctx =  canvas.getContext("2d")
    if (ctx == null) {
      throw new Error("");
      
    }

    let renderTask = page.render({canvasContext: ctx, viewport: viewport})

    await renderTask.promise
    console.debug(canvas)
    let data = canvas.toDataURL("image/jpeg")

    console.log(data)
    


  }
}

</script>

<template>
<input type="file" ref="score" @change="fill" accept="application/pdf">


</template>
