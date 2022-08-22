<script setup lang="ts">
import { StepEnum } from "@/utils/StepEnum";
import { defineProps } from "vue";

const props = defineProps<{
  currentStep: StepEnum;
}>();
</script>

<template>
  <nav aria-label="Progress">
    <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
      <li class="md:flex-1">
        <span
          class="group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
          :class="{
            'border-gray-200': currentStep < StepEnum.PDFUpload,
            'border-primary-600': currentStep >= StepEnum.PDFUpload,
          }"
        >
          <span
            class="text-sm font-medium"
            :class="{
              'text-primary-600': currentStep >= StepEnum.PDFUpload,
              'text-gray-500': currentStep < StepEnum.PDFUpload,
            }"
            >Schritt 1</span
          >
          <span class="text-sm font-medium">PDF auswählen</span>
        </span>
      </li>

      <li class="md:flex-1">
        <span
          class="flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
          :class="{
            'border-gray-200': currentStep < StepEnum.PartSelection,
            'border-primary-600': currentStep >= StepEnum.PartSelection,
          }"
        >
          <span
            class="text-sm font-medium"
            :class="{
              'text-primary-600': currentStep >= StepEnum.PartSelection,
              'text-gray-500': currentStep < StepEnum.PartSelection,
            }"
            >Schritt 2</span
          >
          <span class="text-sm font-medium">Stimmen zuordnen</span>
        </span>
      </li>

      <li class="md:flex-1">
        <span
          class="group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
          :class="{
            'border-gray-200': currentStep < StepEnum.Export,
            'border-primary-600': currentStep >= StepEnum.Export,
          }"
        >
          <span
            class="text-sm font-medium"
            :class="{
              'text-primary-600': currentStep >= StepEnum.Export,
              'text-gray-500': currentStep < StepEnum.Export,
            }"
            >Schritt 3</span
          >
          <span class="text-sm font-medium">Exportieren</span>
        </span>
      </li>
    </ol>
  </nav>
</template>
