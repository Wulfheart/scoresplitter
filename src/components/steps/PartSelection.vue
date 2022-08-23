<script setup lang="ts">
import { useScoreStore } from "@/store/scoreStore";
import { storeToRefs } from "pinia";
import { computed, ref, onMounted, onUnmounted } from "vue";

const keyboardCallback = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key == "Enter") {
    previousPage();
  }
  if (!e.ctrlKey && e.key == "Enter") {
    nextPage();
  }
  if (e.ctrlKey && e.code == "Space") {
    advanceToExport();
  }
};

onMounted(() => {
  document.addEventListener("keydown", keyboardCallback);
});

onUnmounted(() => {
  document.removeEventListener("keydown", keyboardCallback);
});

const store = useScoreStore();

const partName = ref<HTMLInputElement | null>(null);
const { pdf, parts } = storeToRefs(store);

const currentPageIndex = ref(0);
const hasMorePages = computed(() => {
  return currentPageIndex.value + 1 < pdf.value!.numPages;
});
const hasLessPages = computed(() => {
  return currentPageIndex.value > 0;
});

const canBeExported = computed(() => {
  return parts.value.filter((value) => value.trim() != "").length > 0;
});

function nextPage() {
  if (hasMorePages.value) {
    currentPageIndex.value++;
    focusInput();
  }
}

function previousPage() {
  if (hasLessPages.value) {
    currentPageIndex.value--;
    focusInput();
  }
}

function focusInput() {
  partName.value?.focus();
}

function advanceToExport() {
  if (canBeExported) {
    store.advanceStep();
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
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Name der Stimme</label
        >
        <div class="mt-1">
          <input
            type="email"
            name="email"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            v-model="parts[currentPageIndex]"
            ref="partName"
            autofocus
          />
        </div>
        <p class="mt-2 text-sm text-gray-500" id="email-description">
          Du musst nur auf der ersten Seite jeder Stimme den Namen angeben. Auf
          allen anderen Seiten erkennt es das Programm automatisch.
        </p>
      </div>
      <div class="mt-4 space-y-4">
        <div class="flex w-full flex-row items-center">
          <button
            type="button"
            class="inline-flex flex-grow items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="nextPage"
            v-tippy="'↵'"
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
        <div class="flex w-full flex-row items-center">
          <button
            type="button"
            class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="previousPage"
            v-tippy="'Strg + ↵'"
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
        <div class="flex w-full flex-row items-center" v-if="canBeExported">
          <button
            type="button"
            class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="previousPage"
            v-tippy="'Strg + Leertaste'"
          >
            Exportieren
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
