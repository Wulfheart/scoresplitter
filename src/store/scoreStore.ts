import type { Part } from "@/types";
import type { PDF } from "@/utils/PDF";
import { StepEnum } from "@/utils/StepEnum";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useScoreStore = defineStore("score", () => {
  const pdf = ref<PDF | null>(null);
  const parts = ref<Array<string>>([]);
  const currentStep = ref<StepEnum>(StepEnum.PDFUpload);
  const prefix = ref("");

  function setPdf(score: PDF) {
    pdf.value = score;
  }

  function advanceStep() {
    if (currentStep.value < StepEnum.Export) {
      currentStep.value++;
    }
  }

  function reset() {
    pdf.value = null;
    parts.value = [];
    currentStep.value = StepEnum.PDFUpload;
  }
  return { pdf, reset, setPdf, advanceStep, parts, currentStep, prefix };
});
