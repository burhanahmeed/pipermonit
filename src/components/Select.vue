<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: String,
    required: {
      type: Boolean,
      default: false
    },
    id: String,
    placeholder: String,
    value: String
  },
  setup() {
    
  },
})
</script>

<template>
  <div>
    <label for="name" class="block mb-2 text-sm text-gray-400">{{label}}</label>
    <select 
      :name="id" 
      :id="id" 
      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 bg-gray-800 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500">
      <option value="">POST</option>
      <option value="">GET</option>
      <option value="">DELETE</option>
    </select>
  </div>
</template>