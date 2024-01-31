<template>
  <div>
    <div class="MenuIcon">
      <b-dropdown aria-role="list" :close-on-click="false">
        <template #trigger>
          <div class="MenuItem_Logo" id="MenuItem_Logo"><img src="" /></div>
        </template>
        <template v-for="(child, i) in children">
          <b-dropdown-item :key="i" v-if="!unsafe || child.unsafe" aria-role="listitem"
            :separator="child.type == 'divider'" :focused="true" :id="'MenuItemFujin'+i"
            @click="clicked(child.action, i)">
            <span v-html="get_title(child)"></span></b-dropdown-item>
        </template>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MenuIcon',
    components: {

    },
    props: {
      language: String,
      translators_debugging: Boolean,
      unsafe: Boolean
    },
    computed: {
      language_computed() {
        if (this.language == null)
          return "default";
        else
          return this.language;
      }
    },
    data() {
      return {
        children: [{
            title: {
              cs_CZ: "O tomto Fujinu",
              en_US: "About this Fujin",
              ns_FE: "Per kxei Fujin",
              default: "About this Fujin"
            },
            action: {
              type: "call_async",
              payload: "/apps/finder/bin/finder.php"
            }
          },
          {
            type: "divider"
          },
          {
            title: {
              cs_CZ: "Nastavení systému...",
              en_US: "System preferences...",
              ns_FE: "Sīstemēī kontrassil...",
              default: "System preferences..."
            },
            action: {
              type: "call_async",
              payload: "new_window()"
            }
          },
          {
            type: "divider"
          },
          {
            title: {
              cs_CZ: "Odhlásit se",
              en_US: "Log out",
              ns_FE: "Kleootti",
              default: "Log off"
            },
            action: {
              type: "js",
              payload: "logout()"
            }
          },
          {
            title: {
              cs_CZ: "Restartovat",
              en_US: "Restart",
              ns_FE: "Restattotti",
              default: "Restart"
            },
            unsafe: true,
            action: {
              type: "system_call",
              payload: "reboot(1)"
            }
          },
          {
            title: {
              cs_CZ: "Vypnout",
              en_US: "Shut down",
              ns_FE: "Restattotti",
              default: "Shut down"
            },
            unsafe: true,
            action: {
              type: "system_call",
              payload: "shut_down(1)"
            }
          }
        ]
      }
    },
    methods: {
      clicked: function (action, i) {
        console.log("MenuItem" + i);

        setTimeout(() => {
          document.getElementById("MenuItemFujin" + i).classList.add("is-active")
        }, 100);
        setTimeout(() => {
          document.getElementById("MenuItemFujin" + i).classList.remove("is-active")
        }, 150);
        setTimeout(() => {
          document.getElementById("MenuItemFujin" + i).classList.add("is-active")
        }, 200);
        setTimeout(() => {
          document.getElementById("MenuItemFujin" + i).classList.remove("is-active")
        }, 250);
        setTimeout(() => {
          document.getElementById('MenuItem_Logo').click();
        }, 300);
        setTimeout(() => {
          switch (action.type) {
            case 'system_call':
              this.$parent.$parent.sys_call(action.payload);
              break;
          }
        }, 400);

      },
      get_title: function (child) {
        if (child.title != undefined)
          if (child.title[this.language_computed] != null)
            return child.title[this.language_computed];
          else
        if (this.translators_debugging)
          return "* " + child.title.default+" *";
        else
          return child.title.default;
        else
          return "";
      }
    },
  }
</script>

<style scoped>
  .MenuItem_Base {
    height: 32px;
    margin-top: 6px;
    margin-left: 16px;
    font-size: 0.90rem;
  }

  .MenuItem_Logo {
    height: 32px;
    width: 32px;
    background-image: url(../../alpaca_res/fujin_logo_dark.svg);
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
</style>