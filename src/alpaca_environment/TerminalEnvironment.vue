<template>
  <div class="ap__term_div" ref="ap__term"></div>
</template>

<script>
import { Terminal } from 'xterm'; 
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
export default {
  components: {
  },
  props: {
    response: Object
  },
  data() {
    return {
      ap__term: null,
      ap__addons: [],
      ap__options: {
        cursorStyle: 'underline',
        allowTransparency: true,
        cursorBlink: true,
        cursorInactiveStyle: 'underline',
        cursorWidth: 10,
        disableStdin: false,
        fontFamily: 'Space Mono',
        fontSize: 16,
        letterSpacing: 'normal',
        convertEol: true
      },
      ap__buffer: ''
    }
  },
  watch: {
    response() {
      this.ap__get_response();
    }
  },
  methods: {
    ap__gather_command: function(data) {
      switch(data.key)
      {
        case '\r':
          this.ap__term.write('\n');
          this.ap__send_command();
          
          this.ap__buffer = '';
          break;
        case '\x7F':
          if (this.ap__buffer.length > 0) {
            this.ap__buffer = this.ap__buffer.slice(0, -1);
            this.ap__term.write("\x1b[D");
            this.ap__term.write("\x1b[K");
          }
          break;
        default:
          this.ap__term.write(data.key);
          this.ap__buffer += data.key;
        break;
      }
    }, 
    ap__send_command: function () {
      this.$emit('send', this.ap__buffer);
    },
    ap__get_response: function () {
      if(this.response.data == '')
        this.ap__term.write(this.response.data);
      else
        this.ap__term.writeln(this.response.data);

      this.ap__term.write(this.response.prompt);
    }
  },
  mounted() {
    // Xterm
    this.ap__term = new Terminal(this.ap__options);
    // Addons
    this.ap__addons.push(new FitAddon());

    // Load addons
    this.ap__addons.forEach(addon => {
      this.ap__term.loadAddon(addon);
    });

    this.ap__term.onKey(data => this.ap__gather_command(data));

    this.ap__term.open(this.$refs.ap__term);

    this.ap__get_response();
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap');
.ap__term_div {
  height: 100vh;
  .terminal {
    height: 100vh;
  }
}
</style>