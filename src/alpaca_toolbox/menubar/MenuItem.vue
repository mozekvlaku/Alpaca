<template>
  <div>
    <div class="MenuIcon" v-if="menu != undefined">
      <b-dropdown aria-role="list" @active-change="open" :triggers="hoverable" :close-on-click="false">
        <template #trigger>
          <div class="MenuItem_Base" :id="'MenuItem' + menu.title.default">{{ get_title(menu) }}</div>
        </template>

          <b-dropdown-item  v-for="(child, i) in menu.children" :key="i" aria-role="listitem" :separator="child.type == 'divider'" :focused="true" :id="'MenuItem'+menu.title.default+i" @click="clicked(child.action, menu.title.default+i)">
            <span v-html="get_title(child)"></span></b-dropdown-item>

      </b-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MenuItem',
    components: {

    },
    props: {
      menu: Object,
      language: String,
      translators_debugging: Boolean,
      spirit: String,
      hoverlock: Boolean
    },
    computed: {
      language_computed() {
        if (this.language == null)
          return "default";
        else
          return this.language;
      },
      hoverable() {
        // TODO dodelat hovering
        if(!this.hoverlock)
          return ['click'];
        else
          return ['click'];
      }
    },
    methods: {
      open: function(now) {
        this.$emit('open', now);
      },
      clicked: function(action,i) {
        console.log("MenuItem" + i);
        
        setTimeout(()=> {
          document.getElementById("MenuItem" + i).classList.add("is-active")
        }, 100);
        setTimeout(() => {
          document.getElementById("MenuItem" + i).classList.remove("is-active")
        }, 130);
        setTimeout(() => {
          document.getElementById("MenuItem" + i).classList.add("is-active")
        }, 180);
        setTimeout(() => {
          document.getElementById("MenuItem" + i).classList.remove("is-active")
        }, 210);
        setTimeout(() => {
        document.getElementById('MenuItem' + this.menu.title.default).click();
      }, 260);
    
       
      },
      get_title: function(child) {
        if(child.title != undefined)
          if(child.title[this.language_computed] != null)
            return child.title[this.language_computed];
          else
            if(this.translators_debugging)
              return "* " + child.title.default + " *";
            else
              return child.title.default;
        else
          return "";
      }
    },
   
    data() {
      return {
        spirits: {
          file: []
        }
      }
    }
  }
</script>

<style scoped>
  .MenuItem_Base {
    height: 32px;
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 6px;
    cursor: pointer;
    font-size: 0.90rem;
  }
</style>