<script lang="ts">
import { defineComponent } from 'vue'
import slider from "vue3-slider"

export default defineComponent({
  components: {
    'vue3-slider': slider
  },
  props: {
    value: [String, Number],
    label: String,
    min: Number,
    max: Number
  },
  setup() {
    
  },
  data () {
    return {
      mutatedValue: 10
    }
  },  
  watch: {
    mutatedValue (val) {
      // alert(val)
      this.$emit('onChange', val)
    }
  },
  mounted () {
    this.mutatedValue = this.value
  }
})
</script>

<template>
  <div>
    <label for="name" class="block mb-2 text-sm text-gray-400">{{label}}</label>
    <vue3-slider 
      v-model="mutatedValue" 
      color="#60A5FA" 
      track-color="#FEFEFE" 
      :min="min"
      :max="max"
    />
  </div>
</template>
