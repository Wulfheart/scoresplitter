import type { Part } from "@/types"
import type { PDF } from "@/utils/PDF"
import { StepEnum } from "@/utils/StepEnum"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useScoreStore = defineStore('score', () => {
    const pdf = ref<PDF | null>(null)
    const parts = ref<Array<Part>>([])
    const currentStep = ref<StepEnum>(StepEnum.PDFUpload)

    function setPdf(score: PDF) {
        pdf.value = score
    }

    function addPart(part: Part) {
        parts.value.push(part)
        parts.value.sort((a, b) => a.startPage - b.startPage)
    }

    function deletePart(index: number) {
        parts.value.splice(index)
    }

    function advanceStep(){
        currentStep.value++;
    }
  
    return { pdf, setPdf, addPart, deletePart, advanceStep, parts, currentStep }
  })
