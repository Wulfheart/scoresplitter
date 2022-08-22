<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { useScoreStore } from "./store/scoreStore";
import { PDF } from "./utils/allUtils";
import { StepEnum } from "./utils/StepEnum";
import Export from "./components/steps/Export.vue";
import PDFUpload from "./components/steps/PDFUpload.vue";
import PartSelection from "./components/steps/PartSelection.vue";
import Progress from "./components/Progress.vue";

const scoreStore = useScoreStore();

const { currentStep } = storeToRefs(scoreStore);

let arr = ref<Array<string>>([]);
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-100 px-4 py-12">
    <Progress :current-step="currentStep" class="pb-12"></Progress>
    <PDFUpload v-if="currentStep === StepEnum.PDFUpload"></PDFUpload>
    <PartSelection
      v-if="currentStep === StepEnum.PartSelection"
    ></PartSelection>
    <Export v-if="currentStep === StepEnum.Export"></Export>
  </div>
</template>
