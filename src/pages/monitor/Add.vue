<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from '../../utils/axios';
import useSession from '../../utils/useSession';
import { useHead } from '@vueuse/head';

import HeaderComp from '../../components/monitor/Header.vue';
import FooterComp from '../../components/Footer.vue';

import Input from "../../components/Input.vue";
import Select from "../../components/Select.vue";
import Slide from "../../components/Slider.vue";

export default defineComponent({
  components: {
    HeaderComp,
    FooterComp,
    Input,
    Select,
    Slide
  },
  setup() {
    const {currentSession} = useSession();
    const session = ref('')

    useHead({
      // Can be static or computed
      title: 'Add asset | PiperMonit',
      meta: [
        {
          name: `description`,
          content: 'Monitor your website or API server up to 100 website without any login required.',
        },
      ],
    })

    onMounted(() => {
      session.value = currentSession.value
    })
    return {
      session
    }
  },
  data () {
    return {
      interval: 20,
      name: 'Untitle monitor',
      errorState: [false, true],
      telegram: '',
      isNotify: false,
      url: '',
      method: 'get',
      isFormShowed: false,
      isEdit: false,
      isSubmitting: false
    }
  },
  watch: {
    isNotify (val) {
      if (!val) {
        this.telegram = ''
      }
    }
  },
  methods: {
    handleSave () {
      this.isSubmitting = true;
      console.log(this.errorState);
      if (this.errorState.includes(true)) {
        alert('Check again the validation!!')
      } else {
        axios.post('/postAsset', {
          url: this.url,
          interval: this.interval,
          method: this.method, 
          name: this.name, 
          isNotified: this.isNotify, 
          telegram: this.telegram
        }, {
          headers: {
            'x-mon-session': this.session
          }
        }).then(res => {
          this.isSubmitting = false;
          this.$router.back();
        }).catch(err => {
          this.isSubmitting = false;
          alert(err.response)
        })
      }
    },
    handleUpdate () {
      this.isSubmitting = true;
      console.log(this.errorState);
      if (this.errorState.includes(true)) {
        alert('Check again the validation!!')
      } else {
        axios.put('/updateAsset/'+this.$route.params.id, {
          url: this.url,
          interval: this.interval,
          method: this.method, 
          name: this.name, 
          isNotified: this.isNotify, 
          telegram: this.telegram
        }, {
          headers: {
            'x-mon-session': this.session
          }
        }).then(res => {
          this.isSubmitting = false;
          this.$router.back();
        }).catch(err => {
          this.isSubmitting = false;
          alert(err.response)
        })
      }
    },
  },
  mounted () {
    if (this.$route.params.id) {
      axios.get('/getAssetById', 
        {
          params: {
          id: this.$route.params.id
        },
        headers: {
          'x-mon-session': this.session
        }
      }).then(res => {
        const self = this;
        setTimeout(() => {
          self.url = res.data.url
          self.interval = res.data.interval
          self.method = res.data.method
          self.name = res.data.name
          self.isNotify = res.data.isNotified
          self.telegram = res.data.telegram || ''
          this.isFormShowed = true;
          this.isEdit = true;
        }, 200);
      })
    } else {
      this.isFormShowed = true;
    }
  }
})
</script>

<template>
  <HeaderComp>
    <template v-slot:left>
      <span class="font-bold">
        <i-carbon-arrow-left class="font-black cursor-pointer" @click="$router.back()"/> {{name || 'Untitle monitor'}}
      </span>
    </template>
    <template v-slot:right>
      <button v-if="!isEdit" @click="handleSave" class="p-2 px-3 bg-blue-400 text-black rounded hover-button">{{isSubmitting ? "Submitting...": "🚀 Launch"}}</button>
      <button v-else @click="handleUpdate" class="p-2 px-3 bg-blue-400 text-black rounded hover-button">{{isSubmitting ? "Submitting..." : "🙌 Update"}}</button>
    </template>
  </HeaderComp>
  <section class="main-view px-4 my-4 lg:px-16 lg:my-8" style="padding-top: 70px;">
    <div class="flex justify-center">
      <div class="w-full md:w-1/2 md:pb-5 md:mb-5">
        <form action="" v-if="isFormShowed">
          <Input 
            label="Monitor name" 
            placeholder="Monitor name"
            :value="name"
            class="mb-4"
            required
            @onChange="(e) => name = e"
            @onError="(e) => errorState[0] = e"
          />
          <Input 
            label="URL" 
            placeholder="https://google.com"
            :value="url"
            type="url"
            required
            class="mb-4"
            :validator="['url']"
            @onChange="(e) => url = e"
            @onError="(e) => {errorState[1] = e}"
          />
          <!-- <Select 
            label="Method" 
            placeholder="URL to check"
            value=""
            class="mb-4"
          /> -->
          <div class="mb-5">
            <Slide 
              label="Checking interval"
              :min="5"
              :max="60"
              :value="interval"
              @onChange="(e) => interval = Number(e)"
            />
            <span>Every {{interval}} minutes</span>
          </div>
          <div>
            <label class="inline-flex items-center mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" :checked="isNotify" v-model="isNotify">
              <span class="ml-2 text-gray-300">Send notification</span>
            </label>
          </div>
          <div v-if="isNotify">
            <Input 
              label="Telegram ID (separate with comma)" 
              placeholder="02930121xxx, 2039102xxx, ..."
              required
              class="mb-4"
              :value="telegram"
              @onChange="(e) => telegram = e"
            />
            <span class="text-gray-300">We'll notify you when site is down via Telegram Bot</span>
            <p class="text-gray-300">Click here to get your chat ID 
              <a class="text-blue-400" target="_blank" href="https://t.me/monitpro_bot">t.me/monitpro_bot</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
  <FooterComp />
</template>
