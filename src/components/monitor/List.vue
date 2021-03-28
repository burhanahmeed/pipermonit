<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import axios from "../../utils/axios";
  import useSession from '../../utils/useSession'

  import ListItem from './ListItem.vue';
  import Detail from './Detail.vue';
  
  export default defineComponent({
    components: {
      ListItem,
      Detail
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
        assets: [],
        selectedAsset: null
      }
    },
    methods: {
      init () {
        axios.get('/getAssets', {
          headers: {
            'x-mon-session': this.session
          }
        }).then(res => {
          this.assets = res.data
        })
      }
    },
    mounted () {
      this.init()
    },
  })
</script>

<template>
  <div class="flex">
    <template v-if="assets.length">
      <div class="w-full lg:w-1/3 lg:pb-24 lg:mt-4 lg:sticky lg:top-4 lg:max-h-screen lg:overflow-y-auto scroll-parent">
        <template v-for="(asset, i) in assets" :key="i">
          <ListItem :data="asset" :selected="selectedAsset" @click="selectedAsset = asset.id" @init="init" />
        </template>
        
      </div>
      <div class="w-full lg:w-2/3 lg:pl-16">
        <div v-show="selectedAsset">
          <Detail :selected="selectedAsset" />
        </div>
        <div v-if="!selectedAsset">
          <div class="flex justify-center" style="min-height: 400px;">
            <div class="self-center text-center">
              <i-bx-bx-book-alt style="font-size: 40px;" class="m-auto"/>
              <div>
                Nothing selected
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="w-full">
        <div class="flex justify-center" style="min-height: 400px;">
          <div class="self-center text-center">
            <i-bx-bx-book-alt style="font-size: 40px;" class="m-auto"/>
            <div>
              Create your first asset
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

