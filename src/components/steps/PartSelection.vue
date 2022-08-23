<script setup lang="ts">
import { useScoreStore } from "@/store/scoreStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const store = useScoreStore();

const { pdf, parts } = storeToRefs(store);

const currentPageIndex = ref(0);
const hasMorePages = computed(() => {
  return currentPageIndex.value + 1 < pdf.value!.numPages;
});
const hasLessPages = computed(() => {
  return currentPageIndex.value > 0;
});

function nextPage() {
  if (hasMorePages.value) {
    currentPageIndex.value++;
  }
}

function previousPage() {
  if (hasLessPages.value) {
    currentPageIndex.value--;
  }
}
</script>

<template>
  <div class="grid max-h-full flex-grow grid-cols-2 gap-4">
    <div class="h-full">
      <div
        :style="{
          'background-image': 'url(' + pdf?.imgs[currentPageIndex] + ')',
        }"
        class="h-full bg-contain bg-center bg-no-repeat"
      ></div>
    </div>
    <div>
      <input type="text" v-model="parts[currentPageIndex]" />
      <div class="space-y-4">
        <div class="w-full">
          <button
            type="button"
            class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="nextPage"
          >
            Nächste Seite
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-2 -mr-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
        <div class="w-full">
          <button
            type="button"
            class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="previousPage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="-ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Vorherige Seite
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
