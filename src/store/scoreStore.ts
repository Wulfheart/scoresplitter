import type { Part } from "@/types"
import type { PDF } from "@/utils/PDF"
import { StepEnum } from "@/utils/StepEnum"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useCounterStore = defineStore('score', () => {
    const pdf: Ref<PDF | null> = ref(null)
    const parts: Ref<Array<Part>> = ref([])
    const currentStep = ref(StepEnum.PDFUpload)

    function setPdf(score: PDF) {
        pdf.value = score
    }

    function addPart(part: Part) {
        parts.value.push(part)
    }

    function deletePart(index: number) {
        parts.value.splice(index)
    }

    function advanceStep(){
        currentStep.value++;
    }
  
    return { pdf, setPdf, addPart, deletePart, advanceStep }
  })
