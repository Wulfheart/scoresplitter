import type { Part } from "@/types";
import type { PDF } from "@/utils/PDF";
import { StepEnum } from "@/utils/StepEnum";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useScoreStore = defineStore("score", () => {
  const pdf = ref<PDF | null>(null);
  const parts = ref<Array<string>>([]);
  const currentStep = ref<StepEnum>(StepEnum.PDFUpload);

  function setPdf(score: PDF) {
    pdf.value = score;
  }

  function advanceStep() {
    if (currentStep.value < StepEnum.Export) {
      currentStep.value++;
    }
  }

  return { pdf, setPdf, advanceStep, parts, currentStep };
});
