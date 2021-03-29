<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import moment from 'moment';
import axios from "../../utils/axios";
import useSession from "../../utils/useSession";

import Table from "../monitor/Table.vue";
import Chart from "../monitor/UptimeChart.vue";

export default defineComponent({
  props: ['selected'],
  components: {
    Table,
    Chart
  },
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
      asset: {}
    }
  },
  watch: {
    selected (val) {
      axios.get('/getAssetById', {
        params: {
          id: val
        },
        headers: {
            'x-mon-session': this.session
        }
      }).then(res => {
        this.asset = res.data;
      })
    }
  },
  methods: {
    convertDate (date: string) {
      return moment(date).fromNow()
    },
  },
  computed: {
    telegram () {
      if (this.asset?.telegram) {
        let tele: string = this.asset.telegram;
        console.log(typeof tele);
        if (typeof tele == 'string') {
          let tele1: Array<string> = tele.split(',')
          return tele1; 
        } else {
          return tele;
        }
      }
      return []
    }
  }
})
</script>

<template>
  <div class="border-b border-gray-600 pb-4 mb-4">
    <h3 class="font-bold text-xl">{{asset.name}}</h3>
    <div>
      <span class="text-gray-400" v-if="asset.lastRunAt">Last checked {{convertDate(asset.lastRunAt)}}.</span>
      <span class="text-gray-400" v-else>Never run.</span>
    </div>
    <div>
      <span class="text-gray-200">{{asset.url}}</span>
    </div>
  </div>
  <div v-if="asset.isNotified">
    <p class="font-bold">Notification</p>
    <p>
      <span>Telegram: </span>
      <template v-for="(t, i) in telegram" :key="i">
        <span class="mr-2 bg-blue-400 rounded px-3 py-1 text-xs text-black">{{t}}</span>
      </template>
    </p>
  </div>

  <!-- block chart -->
  <div>
    <!-- <Chart/> -->
  </div>
  <div class="py-9" v-if="selected">
    <Table :asset="asset" />
  </div>
</template>
