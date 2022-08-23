<script setup lang="ts">
import { StepEnum } from "@/utils/StepEnum";
import { computed, defineEmits } from "vue";

const props = defineProps<{
  currentStep: StepEnum;
  handledStep: StepEnum;
  name: string;
  description: string;
}>();

const emit = defineEmits(["clicked"]);

function clickHandler(): void {
  emit("clicked");
}

const isPastStep = computed(() => props.currentStep > props.handledStep);
const isCurrentOrPastStep = computed(
  () => props.currentStep >= props.handledStep
);
const isFutureStep = computed(() => props.currentStep < props.handledStep);
</script>

<template>
  <li
    class="md:flex-1"
    :class="{ 'cursor-pointer': isPastStep }"
    @click="clickHandler"
  >
    <span
      class="group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
      :class="{
        'border-gray-200': isFutureStep,
        'border-primary-600': isCurrentOrPastStep,
        'hover:border-primary-800': isPastStep,
      }"
    >
      <span
        class="text-sm font-medium"
        :class="{
          'text-primary-600': isCurrentOrPastStep,
          'text-gray-500': isFutureStep,
          'group-hover:text-primary-800': isPastStep,
        }"
        >{{ name }}</span
      >
      <span class="text-sm font-medium">{{ description }}</span>
    </span>
  </li>
</template>
