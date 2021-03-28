<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useClipboard } from "@vueuse/core";
import { useHead } from '@vueuse/head';
import useSession from '../../utils/useSession'

import FooterComp from "../../components/Footer.vue";
import MonitorLists from "../../components/monitor/List.vue";
import HeaderComp from "../../components/monitor/Header.vue";

export default defineComponent({
  components: {
    FooterComp,
    MonitorLists,
    HeaderComp
  },
  setup() {
    const { text, isSupported, copy } = useClipboard()
    const { currentSession } = useSession()
    const session = ref('')
    const isCopied = ref(false)
    const copySession = () => {
      copy(session.value)
      if (isCopied.value) {
        return false;
      }
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 5000);
    }

    useHead({
      // Can be static or computed
      title: 'Monitor | PiperMonit',
      meta: [
        {
          name: `description`,
          content: 'Monitor your website or API server up to 10 website without any login required.',
        },
      ],
    })

    onMounted(()  => {
      session.value = `${import.meta.env.VITE_BASE_URL}/monitor?session=${currentSession.value}`;
    })

    return {copySession, session, isCopied}
  },
})
</script>

<template>
  <HeaderComp>
    <template v-slot:left>
      <span class="font-bold flex">
        <i-carbon-chart-scatter class="font-black text-blue-400"/>&nbsp; PiperMonit
      </span>
    </template>
    <template v-slot:right>
      <button @click="$router.push('/monitor/add') " class="p-2 px-3 bg-blue-400 text-black rounded hover-button">+ Add monitor</button>
    </template>
  </HeaderComp>
  <section class="main-view px-4 mb-4 lg:px-16 lg:my-8" style="padding-top: 70px;">
    <div class="p-3">
      Your current session 
      <span @click="copySession()" 
        class="cursor-pointer border border-blue-400 text-sm px-2 rounded"
        :class="isCopied && 'bg-blue-400 text-black'">
        {{isCopied ? 'copied!':'copy'}}
      </span>
      <div class="p-2 bg-blue-200 text-black mt-4 whitespace-nowrap w-full overflow-ellipsis overflow-hidden">
        {{session}}
      </div>
    </div>
    <MonitorLists/>
  </section>
  <FooterComp />
</template>

<style scoped>
.hover-button {
  @apply hover:(opacity-90)
}
</style>