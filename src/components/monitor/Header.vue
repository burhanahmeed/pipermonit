<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>

<template>
  <header class="fixed w-full z-10 top-0" style="height: 70px; background-color: #1F2937;">
    <div class="flex justify-between items-center px-4 pt-4 pb-0 lg:px-16 lg:pt-0 lg:my-8 relative">
      <div>
        <slot name="left"/>
      </div>
      <div>
        <slot name="right"/>
      </div>
    </div>
  </header>
</template>