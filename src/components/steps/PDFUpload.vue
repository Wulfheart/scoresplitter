<script lang="ts" setup>
import { useScoreStore } from "@/store/scoreStore";
import { PDF } from "@/utils/PDF";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Progress from "../Progress.vue";

const store = useScoreStore();
const score = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const { currentStep } = storeToRefs(store);

async function getPdf() {
  let handles: Array<FileSystemFileHandle> = await window.showOpenFilePicker({
    types: [
      { description: "PDF Dateien", accept: { "application/pdf": [".pdf"] } },
    ],
  });

  if (handles.length > 0) {
    loading.value = true;
    let file = await handles[0].getFile();
    let pdf = await PDF.fromFile(file);
    store.setPdf(pdf);
    store.advanceStep();
    loading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-lg flex-grow flex-col">
    <button
      type="button"
      class="relative block w-full flex-grow rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      @click="getPdf"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
      <span class="mt-2 block text-sm font-medium text-gray-900">
        Notenscan auswählen
      </span>
    </button>
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
