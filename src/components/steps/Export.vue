<script setup lang="ts">
import { useScoreStore } from "@/store/scoreStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useScoreStore();

const { pdf, parts, prefix } = storeToRefs(store);
const loading = ref(false);

async function save() {
loading.value = true
  const dirHandle = await window.showDirectoryPicker({
    mode: "readwrite",
  });
  pdf.value?.save(dirHandle, parts.value, prefix.value);
  loading.value = false
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-lg flex-grow flex-col">
    <div>
      <label class="block text-sm font-medium text-gray-700">Präfix</label>
      <div class="mt-1">
        <input
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          autofocus
          v-model="prefix"
        />
      </div>
      <p class="mt-2 text-sm text-gray-500" id="email-description">
        Alle generierten Dateien werden mit diesem Präfix versehen.
      </p>
    </div>
    <div class="flex w-full flex-row items-center">
      <button
        type="button"
        class="inline-flex flex-grow items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        @click="save"
      >
        Speichern
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
  </div>
  <div
    v-if="loading"
    class="fixed inset-0 grid h-screen place-content-center bg-gray-500 bg-opacity-75 transition-opacity"
  >
    <div class="">
      <div class="h-24 w-24 animate-ping rounded-full bg-white"></div>
    </div>
  </div>
</template>
