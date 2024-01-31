<template>
  <div>
    <div class="FujinMenubar">
      <div class="columns is-variable is-2">
        <div class="column is-narrow" v-if="safe_environment">
          <MenuIcon :language="language" :translators_debugging="translators_debugging" />
        </div>
        <div class="column is-narrow" v-if="!safe_environment">
          <MenuIcon :unsafe="true" />
        </div>
        <div class="column is-narrow" v-if="app_name !== ''" id="MenuItem_App">
          <AppIcon :language="language" :translators_debugging="translators_debugging" :app_name="app_name"
            :app_menu="menubar.application" />
        </div>
        <div class="column is-narrow" v-if="safe_environment && menubar.file" id="MenuItem_File">
          <MenuItem :language="language" :hoverlock="menubar_open" @open="menubar_open_change" :translators_debugging="translators_debugging" :menu="menubar.file"
            v-if="menubar.file.visible" spirit="file" />
        </div>
        <div class="column is-narrow" v-if="safe_environment && menubar.edit" id="MenuItem_Edit">
          <MenuItem :language="language" :hoverlock="menubar_open" @open="menubar_open_change" :translators_debugging="translators_debugging" :menu="menubar.edit"
            v-if="menubar.edit.visible" spirit="edit" />
        </div>
        <template v-if="menubar.custom">
        <div class="column is-narrow" v-for="(child,i) in menubar.custom.children" :key="i">
          <MenuItem :language="language" :hoverlock="menubar_open" @open="menubar_open_change" :translators_debugging="translators_debugging" :menu="child"
            v-if="child.visible" spirit="custom" />
        </div>
        </template>
        <div class="column"></div>
        <div class="column is-narrow" id="MenuNetworkIcon">
          <NetworkIcon :state="network_state" />
        </div>
        <div class="column is-narrow" id="DateIndicator">
          <MenuDateIndicator :locale="language" :format="date_format" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import MenuIcon from "@/alpaca_toolbox/menubar/MenuIcon.vue";
  import AppIcon from "@/alpaca_toolbox/menubar/AppIcon.vue";
  import MenuItem from "@/alpaca_toolbox/menubar/MenuItem.vue";
  import NetworkIcon from "./NetworkIcon.vue";
  import MenuDateIndicator from "./MenuDateIndicator.vue";
  export default {
    name: 'FujinMenubar',
    components: {
      MenuIcon,
      AppIcon,
      MenuItem,
      NetworkIcon,
      MenuDateIndicator
    },
    props: {
      safe_environment: Boolean,
      app_name: String,
      menubar: Object
    },
    methods: {
      menubar_open_change: function(now) {
        this.menubar_open = now;
      }
    },
    data() {
      return {
        language: "cs_CZ",
        menubar_open: false,
        date_format: "short",
        translators_debugging: false,
        network_state: "off",
      }
    }
  }
</script>

<style scoped>
  .FujinMenubar {
    height: 32px;
    animation: fade-in-top 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    position: fixed;
    width: 100%;
    z-index: 999;
    animation-delay: 0.2s;
    padding-left: 10px;
    padding-right: 15px;
    color: white;
    background-color: #888888AA;
    backdrop-filter: blur(5px);
    width: calc(100%);
    user-select: none;
  }

  @keyframes fade-in-top {
    0% {
      transform: translateY(-30px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>