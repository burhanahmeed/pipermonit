<template>
  <div>
    <label for="name" class="block mb-2 text-sm text-gray-400">{{label}}</label>
    <input 
      :type="type || 'text'" 
      :name="id" 
      :id="id" 
      :placeholder="placeholder" 
      :required="required" 
      v-model="txt"
      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 bg-gray-800 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500" 
      :class="{'focus:border-red-600 border-red-600': errorMessage}"
    />
    <span class="text-red-600">{{errorMessage}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useField } from 'vee-validate';

export default defineComponent({
  props: {
    label: String,
    required: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'field'
    },
    placeholder: String,
    value: String,
    type: String,
    validator: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onChange', 'onError'],
  setup(props, {emit}) {
    const isRequired = (value: string) => {
      if (props.required) {
        if (!value || !value.trim()) {
          return `${props.label || 'The field'} is required.`; 
        }
      }
      if (props.validator?.includes('url')) {
        var n = value.search(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i);
        if (n) {
          return `${props.label || 'The field'} is not valid URL.`; 
        }
      }
      return true;
    }
    const { errorMessage, value } = useField(props.id, isRequired);
    watch([value, errorMessage], (nv, pv) => {
      
      let errorState = false;
      if (nv[1]) {
        errorState = true;
      }
      emit('onError', errorState)
      emit('onChange', nv[0])
    })
    onMounted (() => {
      if (props.value) {
        value.value = props.value 
      } else {
        emit('onError', true)
      }
    })
    return {
      txt: value,
      errorMessage
    }
  }
})
</script>


<style>

</style>