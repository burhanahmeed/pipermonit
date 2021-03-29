<script lang="ts">
import { defineComponent } from 'vue'

import Input from "../components/Input.vue";

export default defineComponent({
    components: {
        Input
    },
    setup() {
        
    },
    data () {
        return {
            showModal: false
        }
    },
})
</script>


<template>
  
<!-- Section 1 -->
<section class="w-full px-6 pb-12 antialiased bg-gray-800">
    <div class="mx-auto max-w-7xl">

        <nav class="relative z-50 h-24 select-none" x-data="{ showMenu: false }">
            <div class="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-500 md:overflow-visible lg:justify-center sm:px-4 md:px-2">
                <div class="flex items-center justify-start w-1/4 h-full pr-4">
                    <a href="/" class="inline-block py-4 md:py-0 flex">
                      <i-carbon-chart-scatter class="font-black text-blue-400"/>&nbsp; PiperMonit
                    </a>
                </div>
                <div class="top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex" :class="{'flex fixed': showMenu, 'hidden': !showMenu }">
                    <div class="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                        <a href="#_" class="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden">tails<span class="text-indigo-600">.</span></a>
                        <div class="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                        
                        </div>
                        <div class="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                            <!-- <a href="#" class="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto">Sign In</a> -->
                            <a  @click="showModal = true" href="#_" class="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-blue-500 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-blue-500 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-blue-600">
                              Pro version
                              <span class="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-gray-800 bg-green-400 rounded-full">only $9/mo</span>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- pro subscription modal -->
                <vue-final-modal
                    v-model="showModal"
                    classes="modal-container"
                    content-class="modal-content"
                >
                    <button class="modal__close" @click="showModal = false">
                        <mdi-close></mdi-close>
                    </button>
                    <span class="modal__title">Do you really need pro version?</span>
                    <div class="modal__content">
                        <p>
                            We will let you know
                        </p>
                        <div class="mt-3">
                            <Input type="email" placeholder="Enter your email" />
                        </div>
                        <div class="my-3 text-center">
                            <button class="bg-blue-500 text-white py-2 px-4 rounded-full">Submit</button>
                        </div>
                    </div>
                </vue-final-modal>

                <div @click="showMenu = !showMenu" class="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                    <svg class="w-6 h-6 text-gray-700" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" x-cloak="">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <svg class="w-6 h-6 text-gray-700" x-show="showMenu" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" x-cloak="">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
            </div>
        </nav>

        <!-- Main Hero Content -->
        <div class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
            <h1 class="text-5xl font-extrabold leading-10 tracking-tight text-left text-white md:text-center sm:leading-none md:text-6xl lg:text-7xl">
              <span class="inline md:block">Monitor Your <span class="bg-blue-500">Website</span></span> 
              <span class="relative mt-2 text-transparent bg-clip-text text-blue-400 md:inline-block">Without any Pain</span>
            </h1>
            <div class="mx-auto mt-5 text-gray-100 md:mt-12 md:max-w-lg md:text-center lg:text-lg">Start monitor up to 100 websites without login.</div>
            <div class="flex flex-col items-center mt-12 text-center">
                <span class="relative inline-flex w-full md:w-auto">
                    <a href="/monitor" type="button" class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-blue-500 border border-transparent rounded-full md:w-auto hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                        Try it free
                    </a>
                </span>
                <!-- <a href="#" class="mt-3 text-sm text-indigo-500">Learn More</a> -->
            </div>
        </div>
        <!-- End Main Hero Content -->

    </div>
</section>

<!-- Section 2 -->
<!-- <section class="py-20 bg-white">
    <div class="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl">
            The New Standard for Design
        </h2>
        <p class="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Use our award-winning tools to help you maximize your profits. We've uncovered the correct recipe for converting visitors into customers.
        </p>
        <div class="flex justify-center mt-8 space-x-3">
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow hover:bg-indigo-700">Sign Up Today</a>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200">Learn more</a>
        </div>
    </div>
</section> -->

<!-- Section 3 -->
<section class="relative py-16 bg-white min-w-screen animation-fade animation-delay">
    <div class="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
        <p class="text-xs font-bold text-left text-pink-500 uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
            Got a Question? We’ve got answers.
        </p>
        <h3 class="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
            Frequently Asked Questions
        </h3>
        <div class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            <h3 class="text-lg font-bold text-blue-500 sm:text-xl md:text-2xl">Is it completely free?</h3>
            <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                YES! With PiperMonit you can add up to 100 assets free.
            </p>
        </div>
        <div class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            <h3 class="text-lg font-bold text-blue-500 sm:text-xl md:text-2xl">Do you offer pricing for pro version?</h3>
            <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                Yes, we do! We plan to add pro subscription in the future, for now just enjoy our free and open source service.
            </p>
        </div>
        <div class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            <h3 class="text-lg font-bold text-blue-500 sm:text-xl md:text-2xl">Can I request a feature?</h3>
            <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                Mention me <a class="text-blue-500 font-weight-bold" href="https://twitter.com/burhannahm">here</a> 
            </p>
        </div>

    </div>
</section>

<!-- Section 4 -->
<section class="text-gray-700 bg-gray-800 body-font">
    <div class="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
        <a href="#_" class="text-xl font-black leading-none text-gray-300 select-none logo flex">
          <i-carbon-chart-scatter class="font-black text-blue-400"/>&nbsp; PiperMonit
        </a>
        <p class="mt-4 text-sm text-gray-300 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">© 2021 PiperMonit - Free web monitoring
        </p>
        <span class="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">

            <a href="https://twitter.com/burhannahm" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Twitter</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
            </a>

            <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">GitHub</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
            </a>

        </span>
    </div>
</section>

</template>

<style scoped>
    ::v-deep .modal-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ::v-deep .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 0 1rem;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.25rem;
      background: rgb(31, 41, 55);
    }
    .modal__title {
      margin: 0 2rem 0 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .modal__close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
    </style>
    
    <style scoped>
    .dark-mode div::v-deep .modal-content {
      border-color: #2d3748;
      background-color: #1a202c;
    }
    </style>