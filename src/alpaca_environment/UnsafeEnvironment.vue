<template>
  <div class="unsafe">
    <template v-for="application in applications">
      <GuiWindow v-for="window in application.windows" :title="window.title" :id="window.id" :key="window.id"
        :width="window.width" :height="window.height" :active="isActive" @activate="setActive"
        :closeable="window.closeable" :maximizable="window.maximizable" :minimizable="window.minimizable"
        :moveable="window.moveable" :centered="window.centered">
        <component :is="renderComponent(window.body)"></component>
      </GuiWindow>
    </template>
  </div>
</template>

<script>
  import GuiWindow from '@/alpaca_toolbox/windowing/GuiWindow.vue';
  import Vue from 'vue/dist/vue.js';
  export default {
    name: 'UnsafeEnvironment',
    components: {
      GuiWindow
    },
    props: {
      applications: Array,
      isActive: Number
    },
    methods: {
      renderComponent(componentCode) {
        return Vue.component('DynamicComponent', componentCode);
      },
      setActive: function (id) {
        this.$emit('setActiveWindow', id);
      }
    }
  }
</script>

<style scoped>
  .unsafe {
    background-image: url(https://vespotok.com/dev/mother//usr/share/backgrounds/mountains.jpg);
    width: 100%;
    height: 100vh;
    position: fixed;
    background-position: bottom;
    background-color: black !important;
    animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation-delay: .5s;
  }

  @keyframes scale-in-center {
    0% {
      opacity: 0;
      transform: scale(.96);
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>