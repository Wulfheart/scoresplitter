<script setup lang="ts">
import { useScoreStore } from "@/store/scoreStore";
import { StepEnum } from "@/utils/StepEnum";
import { defineProps } from "vue";
import ProgressPart from "./ProgressPart.vue";

const props = defineProps<{
  currentStep: StepEnum;
}>();

const store = useScoreStore();

function handleReset() {
  if (confirm("Bistdu sicher, dass du alles zurücksetzen möchtest?")) {
    store.reset();
  }
}
</script>

<template>
  <nav aria-label="Progress">
    <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
      <ProgressPart
        :current-step="currentStep"
        :handled-step="StepEnum.PDFUpload"
        name="Schritt 1"
        description="PDF auswählen"
        @clicked="handleReset"
      />
      <ProgressPart
        :current-step="currentStep"
        :handled-step="StepEnum.PartSelection"
        name="Schritt 2"
        description="Stimmen auswählen"
      />
      <ProgressPart
        :current-step="currentStep"
        :handled-step="StepEnum.Export"
        name="Schritt 3"
        description="Exportieren"
      />
    </ol>
  </nav>
</template>
