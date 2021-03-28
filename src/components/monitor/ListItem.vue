<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import moment from 'moment';
import { onClickOutside } from '@vueuse/core'
import axios from "../../utils/axios";
import useSession from "../../utils/useSession";

export default defineComponent({
  props: ['data', 'selected'],
  setup() {
    const dropdownRef = ref(null)
    const dropdown = ref(false)

    onClickOutside(dropdownRef, (event) => {
      dropdown.value = false
    })

    const {currentSession} = useSession();
    const session = ref('')
    onMounted(() => {
      session.value = currentSession.value
    })

    return { dropdown, dropdownRef, session }
  },
  data () {
    return {

    }
  },
  methods: {
    convertDate (date: string) {
      return moment(date).fromNow()
    },
    openDropdown () {
      setTimeout(() => {
        this.dropdown = true;
      }, 200);
    },
    deleteAsset () {
      axios.delete('/deleteAsset/'+ this.data.id, {
        headers: {
          'x-mon-session': this.session
        }
      }).then(res => {
        this.dropdown = false;
        this.$emit('init')
      })
    }
  },
  mounted () {
  }
})
</script>

<template>
  <div 
    class="bg-gray-600 rounded p-4 cursor-pointer hover-item mb-3" 
    :class="selected == data.id ? 'border border-white': ''">
    <div class="flex justify-between">
      <div style="width: 70%" class="flex">
        <span 
          :class="data.status == 'up' ? 'text-green-500' : data.status == 'down' ? 'text-red-500' : 'text-gray-500'" 
          class="mr-2 self-center"><i-carbon-circle-filled/></span>  &nbsp;
        <span>
          {{data.name}}
          <template v-if="data.lastRunAt">
            <p class="text-sm text-gray-300">checked {{convertDate(data.lastRunAt)}}</p>
          </template>
          <template v-else>
            <p class="text-sm text-gray-300">Never run</p>
          </template>
        </span>
      </div>
      <div class="self-center relative flex">
        <!-- <i-carbon-pin-filled class="hover-opacity" /> -->
        <i-carbon-settings class="hover-opacity ml-2" @click="openDropdown" />
        <div class="absolute right-0 top-6 bg-gray-900 shadow z-10" v-show="dropdown" ref="dropdownRef">
          <ul id="list-wrapper">
            <li class="list" @click="$router.push(`/monitor/${data.id}/edit`)">Edit</li>
            <!-- <li class="list">Pin</li> -->
            <li class="list" @click="deleteAsset">Delete</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.hover-opacity {
  @apply hover:(opacity-80)
}
.list {
  @apply p-3 hover:(opacity-80 bg-gray-500)
}
.hover-item {
  @apply hover:(shadow-lg)
}
</style>