<template>
  <div class="my-6 md:my-8">
    <div class="flex justify-end text-gray-200 font-bold">
      <span>100% uptime</span>
    </div>
    <div class="y-1 w-full flex">
      <div v-for="i in 100" class="bar status-normal"></div>
    </div>
    <div class="flex justify-between text-gray-400 font-bold">
      <span>Last 100 days</span>
      <span>Today</span>
    </div>
  </div>
</template>

<style scoped>
.bar {
  width: 8px;
  height: 45px;
  padding: 0;
  margin: 0 1px 0 0;
  -webkit-transition: filter 0.03s ease;
  transition: filter 0.03s ease;
}
.status-normal {
  @apply bg-blue-400
}
</style>