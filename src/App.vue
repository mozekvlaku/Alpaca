<template>
  <div>
    <div id="bootloader" v-if="runlevel == 0 && guimode">
      <BootloaderEnvironment :response="response.data"></BootloaderEnvironment>
    </div>
    <div id="menubar">
      <FujinMenubar v-if="runlevel != 0 && guimode" :safe_environment="runlevel == 2 && guimode" :app_name="activeAppName" :menubar="activeMenuBar"></FujinMenubar>
    </div>
    <transition-group>
    <div id="unsafe" v-if="runlevel == 1 && guimode" key="0">
      <UnsafeEnvironment :applications="applications.runlevel_1" :is-active="active.window" @setActiveWindow="setActiveWindow"></UnsafeEnvironment>
    </div>
    <div id="authenticated" v-if="runlevel == 2 && guimode" key="1">
      <AuthenticatedEnvironment></AuthenticatedEnvironment>
    </div>
    </transition-group>
    <div id="terminal" v-show="!guimode" key="2">
      <TerminalEnvironment @send="term_env_post" :response="response"></TerminalEnvironment>
    </div>
  </div>
</template>

<script>
import BootloaderEnvironment from "@/alpaca_environment/BootloaderEnvironment.vue";
import UnsafeEnvironment from "@/alpaca_environment/UnsafeEnvironment.vue";
import FujinMenubar from "@/alpaca_toolbox/menubar/FujinMenubar.vue";
import AuthenticatedEnvironment from "./alpaca_environment/AuthenticatedEnvironment.vue";
import TerminalEnvironment from "./alpaca_environment/TerminalEnvironment.vue";
import axios from 'axios';
export default {
  name: 'App',
  components: {
    BootloaderEnvironment,
    UnsafeEnvironment,
    FujinMenubar,
    AuthenticatedEnvironment,
    TerminalEnvironment
},
computed: {
  activeAppName() {
    let name = '';
    this.applications['runlevel_' + this.runlevel].forEach((item)=> {
      if(item.pid == this.active.application) 
        name = item.name;
    });
    return name;
  },
  activeMenuBar() {
      let menubar = {};
      this.applications['runlevel_' + this.runlevel].forEach((item) => {
        if (item.pid == this.active.application)
          menubar = item.menubar;
      });
      return menubar;
    }
},
  data() {
    return {
      fujin_instance: {
        development: "http://localhost:8080/kernelc.fujin",
        production: ""
      },
      runlevel: 0,
      guimode: false,
      response: {
        data: '',
        prompt: ' '
      },
      instructions: [],
      active: {
        application: 4,
        window: 5
      },
      applications: {
        runlevel_1: [
          {
            name: "Přihlášení do Fujinu",
            menubar: {"application": {
            "about_app": {
              "title": {
                "cs_CZ": "O Raijinu",
                "en_US": "About Raijin",
                "ns_FE": "Per Raijin...",
                "default": "About Raijin"
              },
              "action": {
                "type": "default",
                "manifest": "/etc/manifest/raijin"
              }
            }
          },
          "file": {
            "visible": true,
            "title": {
              "cs_CZ": "Soubor",
              "en_US": "File",
              "ns_FE": "Sleimon",
              "default": "File"
            },
            "children": [{
              "title": {
                "cs_CZ": "Nové okno Finderu",
                "en_US": "New Finder window",
                "ns_FE": "Sīeobonī loēknon dea Finder",
                "default": "New Finder window"
              },
              "action": {
                "type": "call_async",
                "payload": "/apps/finder/bin/finder.php"
              }
            }, {
              "title": {
                "cs_CZ": "Nový soubor",
                "en_US": "New text file",
                "ns_FE": "Sīeobonī teksteuyī sleimon",
                "default": "New text file"
              },
              "action": {
                "type": "call_async",
                "payload": "/apps/finder/bin/finder.php"
              }
            }, {
              "title": {
                "cs_CZ": "Otevřít...",
                "en_US": "Open...",
                "ns_FE": "Yaesītt...",
                "default": "Open..."
              },
              "action": {
                "type": "call_async",
                "payload": "new_window()"
              }
            },
            {
              "type": "divider"
            }, {
              "title": {
                "cs_CZ": "Odhlásit se",
                "en_US": "Log out",
                "ns_FE": "Kleootti",
                "default": "Log off"
              },
              "action": {
                "type": "js",
                "payload": "logout()"
              }
            }, {
              "title": {
                "cs_CZ": "Restartovat",
                "en_US": "Restart",
                "ns_FE": "Restattotti",
                "default": "Restart"
              },
              "action": {
                "type": "js",
                "payload": "location.reload()"
              }
            }, {
              "title": {
                "cs_CZ": "Vypnout",
                "en_US": "Shut down",
                "ns_FE": "Restattotti",
                "default": "Shut down"
              },
              "action": {
                "type": "js",
                "payload": "location.reload()"
              }
            }, {
              "type": "divider"
            }
            ]
          },
          "edit": {
            "visible": true,
            "title": {
              "cs_CZ": "Úpravy",
              "en_US": "Edit",
              "ns_FE": "Meynatteksteu",
              "default": "Edit"
            }
          },
          "custom": {
            "visible": true,
            "children": [{
              "visible": true,
              "title": {
                "cs_CZ": "Otevřít",
                "en_US": "Go",
                "ns_FE": "Leityae",
                "default": "Go"
              },
              "children": [{
                "title": {
                  "cs_CZ": "<i class=\"fas fa-folder-open ve-c\"></i>&nbsp;  Dokumenty",
                  "en_US": "<i class=\"fas fa-folder-open ve-c\"></i>&nbsp;  Documents",
                  "ns_FE": "<i class=\"fas fa-folder-open ve-c\"></i> &nbsp; Deokul",
                  "default": "<i class=\"fas fa-folder-open ve-c\"></i>  &nbsp;Documents"
                },
                "action": {
                  "type": "call_async",
                  "payload": "/apps/finder/bin/finder.php navigate /home/$USER/documents"
                }
              }, {
                "title": {
                  "cs_CZ": "<i class=\"fas fa-images ve-c\"></i>&nbsp;  Fotky",
                  "en_US": "<i class=\"fas fa-images ve-c\"></i>&nbsp;  Photos",
                  "ns_FE": "<i class=\"fas fa-images ve-c\"></i> &nbsp; Pxoteol",
                  "default": "<i class=\"fas fa-images ve-c\"></i>  &nbsp;Photos"
                },
                "action": {
                  "type": "call_async",
                  "payload": "/apps/finder/bin/finder.php navigate /home/$USER/images"
                }
              }]
            },
            {
              "visible": true,
              "title": {
                "cs_CZ": "Okno",
                "en_US": "Window",
                "ns_FE": "Loēkno",
                "default": "Window"
              },
              "children": [{
                "title": {
                  "cs_CZ": "Ukončit všechna okna",
                  "en_US": "Close all windows",
                  "ns_FE": "Loēknol khwadro boratti",
                  "default": "Close all windows"
                },
                "action": {
                  "type": "js",
                  "payload": "closeAllWindows()"
                }
              }]
            },
            {
              "visible": true,
              "title": {
                "cs_CZ": "Nápověda",
                "en_US": "Help",
                "ns_FE": "Yehye",
                "default": "Help"
              },
              "children": [{
                "title": {
                  "cs_CZ": "O Raijinu",
                  "en_US": "About Raijin",
                  "ns_FE": "Per Raijin...",
                  "default": "About Raijin"
                },
                "action": {
                  "type": "call_async",
                  "payload": "/usr/share/syshelpers/abouthelper.appf --manifest=/etc/manifest/raijin"
                }
              }]
            }
            ]
          }
        },
            pid: 4,
            windows: [
              {
                title: "Přihlašovací okno",
                id: 5,
                body: {
                template: `<div>
        Tlačenka {{bobek}}
        <button @click="changeBobekToHovno">Změna</button>
    </div>`,

                data() {
                  return {
                    bobek: "hovno"
                  }
                },
                methods: {
                  changeBobekToHovno: function () {
                    this.bobek = 'superbobek';
                  }
                
              }
                },
                width: 500,
                height: 250,
                centered: true,
                maximizable: false,
                minimizable: false,
                closeable: false,
                moveable: false
              }
            ]
          }
        ],
        runlevel_2: []
      }
    }
  },
  mounted() {
    this.sys_call('boot(1)', ()=>{
      this.process_instructions(0);
    })
  },
  watch: {
  },
  methods: {
    setActiveWindow:function(id) {
       //maybe will be problematic
      this.applications['runlevel_' + this.runlevel].forEach((item) => {
        item.windows.forEach((window) => {
          if(window.id == id)
          {
            this.active.window = window.id;
            this.active.application = item.pid;
          }
        });
      });
    },
    process_instructions: function(id) {
      if (this.instructions.length > 0) {
        let instruction = this.instructions[id];
        if (typeof instruction.process === "string") {
          this.sys_call(instruction.process, () => {
            setTimeout(() => {
              if (id < (this.instructions.length - 1))
                this.process_instructions(id + 1);
            }, instruction ? instruction.delay : 0);
          });
        }
      }
    },
    term_env_post: function(data)
    {
      this.cli_call(data);
    },
    gui_call: function(process_id, command) {
      axios.post(this.development, {
        c: command,
        a: 'g',
        p: process_id
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
    },
    sys_call: function (command, callback = null) {
      axios({
        method: 'POST',
        url: this.fujin_instance.development,
        params: {
          c: command,
          a: 'c',
          t: 'tty1',
          p: 1
        }
      }).then((response) => {
        let resp = {
          data: response.data.data,
          prompt: response.data.prompt
        }
        this.response = resp;
        this.runlevel = response.data.runlevel;
        this.guimode = response.data.guimode;
        this.instructions = response.data.instructions;

        if(command == 'reboot(1)') {
          this.sys_call('boot(1)', () => {
            this.process_instructions(0);
          })
        }

        if(callback != null)
          callback();
      }).catch((error) => {
        console.error(error);
      });
    },
    cli_call: function(command, display = 'tty1') {
      axios({
        method: 'POST',
        url: this.fujin_instance.development,
        params: {
          c: command,
          a: 'c',
          t: display
        }
      }).then((response) => {
        let resp = {
          data: response.data.data,
          prompt: response.data.prompt
        }
        
        this.runlevel = response.data.runlevel;
        this.guimode = response.data.guimode;
        this.response = resp;
      }).catch((error) => {
        let resp = {
          data: error,
          prompt: ''
        }
        this.response = resp;
      });
    }
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700;900&display=swap');
  html, body {
    overflow: hidden;
    overflow-y: hidden!important;
    background-color: black !important;
    height: 100vh;
    font-family: 'Inter', sans-serif!important;
  }
  body > * {
    overflow: unset;
    font-family: 'Inter', sans-serif!important;

  }
  #bootloader {
    width: 100vw;
    height: 100vh;
  }
  .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

a.dropdown-item, .dropdown .dropdown-menu .has-link a, button.dropdown-item {
padding-left: 7px;
    margin-left: 7px;
    margin-right: 7px;
    border-radius: 5px;
    padding-top: 4px;
    padding-bottom: 4px;
    width: calc(100% - 14px)!important;
}
</style>
