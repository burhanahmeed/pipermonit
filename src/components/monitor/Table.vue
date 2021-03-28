<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import moment from 'moment';
import axios from '../../utils/axios'
import useSession from '../../utils/useSession'

export default defineComponent({
  props: ['asset'],
  setup() {
    const {currentSession} = useSession();
    const session = ref('')
    onMounted(() => {
      session.value = currentSession.value
    })
    return {
      session
    }
  },
  data () {
    return {
      events: []
    }
  },
  watch: {
    asset (val) {
      this.init();
    }
  },
  methods: {
    init () {
      axios.get(`/asset/${this.asset.uuid}/events`, {
        headers: {
          'x-mon-session': this.session
        }
      }).then(res => {
        this.events = res.data;
      })
    },
    convertDate (val: string) {
      return moment(val).format('H:mm A, DD MMM YYYY')
    },
    getDuration (index: number, then: Date) {
      let date = new Date()
      if (index !== 0) {
        date = this.events[index - 1].date;
      }
      return moment.duration(moment(date).diff(moment(then))).humanize()
    }
  },
  mounted () {
    // this.init()
  }
})
</script>

<template>
  <table class="min-w-max w-full">
    <thead class="bg-gray-300 w-full text-black">
      <th>Event</th>
      <th>Date time</th>
      <th>Code</th>
      <th>Duration</th>
    </thead>
    <tbody>
      <tr class="text-center border-b border-gray-700" v-for="(event, i) in events" :key="i">
        <td class="py-3" :class="event.status == 'up' ? 'text-green-500': 'text-red-500'">{{event.status}}</td>
        <td>{{convertDate(event.date)}}</td>
        <td>{{event.reason}}</td>
        <td class="text-sm">{{getDuration(i, event.date)}}</td>
      </tr>
    </tbody>
  </table>
</template>