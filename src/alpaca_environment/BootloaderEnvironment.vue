<template>
  <div id="Bootloader_Component" :class="{loaded: loaded_fujin}" :style="{ backgroundColor: brandings[current].background }">
    <div class="FujinBootloader_Background" :style="{backgroundColor: brandings[current].background}"></div>
    <div class="FujinBootloader_Logo">
      <img :src="get_logo" alt="Fujin"/>
    </div>
    <div class="FujinBootloader_Spinner" >
      <b-progress :show-value="brandings[current].show_messages" :value="response.progress ? response.progress : 0">
      <div v-if="brandings[current].show_messages">{{ response.progress ? response.message : '' }}</div> 
      </b-progress >
    </div>
    <div class="FujinBootloader_Legal">
      <div class="FujinBootloaderLegal_Left" v-html="brandings[current].legal.left" :style="{ color: brandings[current].foreground }"></div>
      <div class="FujinBootloaderLegal_Right" v-html="brandings[current].legal.right" :style="{ color: brandings[current].foreground }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BootloaderEnvironment',
  props: {
    response: [Array, Object, String] 
  },
  data() {
    return {
      loaded_fujin: false,
      loaded_value: undefined,
      loaded_message: "",
      current: "fujincore32",
      brandings: {
        unset: {
          logo: "FujinDev.svg",
          legal: {
            left: "<b>Copyright (c) 2024</b> Vespotok",
            right: "By using this prerelease software, you are accepting the Vespotok Tester Agreement."
          },
          show_messages: true,
          background: "#222",
          foreground: "#FFF"
        },
        fujinserver24: {
          logo: "FujinServer24.svg",
          legal: {
            left: "<b>Copyright (c) 2024</b> Vespotok",
            right: "Powered by NuKernel"
          },
          show_messages: false,
          background: "#222",
          foreground: "#FFF"
        },
        fujincore32: {
          logo: "FujinCore32.svg",
          legal: {
            left: "<b>Copyright (c) 2023</b> Vespotok",
            right: ""
          },
          show_messages: false,
          background: "#EEE",
          foreground: "#222"
        },
        fujiniot32: {
          logo: "FujinIOT32.svg",
          legal: {
            left: "<b>Copyright (c) 2023</b> Vespotok",
            right: ""
          },
          show_messages: false,
          background: "#EEE",
          foreground: "#222"
        }
      }
    }
  },
  computed: {
    get_logo: function() {
      return "https://cdn.vespotok.net/FujinBootloader/" + this.brandings[this.current].logo;
    }
  }
}
</script>

<style scoped>
#Bootloader_Component.loaded{animation:fade-out .2s ease-out both}
#Bootloader_Component  {
  overflow: hidden;
  animation:fade-in .2s cubic-bezier(.39,.575,.565,1.000) both
}
@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
@keyframes fade-out{0%{opacity:1}100%{opacity:0}}
.FujinBootloader_Spinner {
  position: fixed;
  width: 350px;
  bottom: 300px;
  left: calc(50% - 175px);
  z-index: 2;
}
.FujinBootloader_Background
{
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
.FujinBootloader_Logo
{
  width: 400px;
  top: 300px;
  left: calc(50% - 200px);
  z-index: 2;
  height: 130px;
  position: fixed;
}
.FujinBootloaderLegal_Left
{
  position:fixed;
  font-family: 'Manrope', Tahoma, Geneva, Verdana, sans-serif;
  bottom: 30px;
  left: 40px;
  z-index: 2;
}
.FujinBootloaderLegal_Right
{
  position:fixed;
  font-family: 'Manrope', Tahoma, Geneva, Verdana, sans-serif;
  bottom: 30px;
  right: 40px;
  z-index: 2;
}
</style>
