<template>
    <div class="ap__window_wrapper">
        <div class="ap__window" :id="'ap__window'+id" :class="{'moving':moving, 'non-resizing': !resizing, 'active': active == id, 'maximized': maximized }" :ref="'window'+id" @click="$emit('activate', id)">
            <WindowTitle ref="title" :maximized="maximized" v-on:dblclick.native="toggleMaximize" :active="active == id" @maximize="toggleMaximize" @close="close" @minimize="minimize" :maximizable="maximizable" :minimizable="minimizable" :closeable="closeable">
                {{ title }}
            </WindowTitle>
            <div class="apw__body">
                <slot></slot>
            </div>
        </div>
        <Moveable
                    :className="'moveable'+this.id"
                    :target="['#ap__window'+this.id]"
                    :draggable="true"
                    :snapDirections="snap_direction"
                    :elementSnapDirections="snap_direction"
                    :elementGuidelines="['.FujinMenubar']"
                    :maxSnapElementGuidelineDistance = "50"
                    :edgeDraggable="['n', 's']"
                    :resizable="({ edge: ['e', 'w', 's', 'n'], renderDirections: ['e', 'w', 's', 'n'] })"
                    :snappable="true"
                    :min-height="300"
                    :min-width="200"
                    @drag="onDrag"
                    @resize="onScale"
                />
    </div>
</template>
<script>
import WindowTitle from './WindowTitle.vue';
import Moveable from 'vue-moveable';

export default {
    components: { WindowTitle, Moveable },
    props: {
        title: String,
        id: Number,
        active: Number,
        width: Number,
        height: Number,
        maximizable: Boolean,
        minimizable: Boolean,
        closeable:Boolean,
        moveable: Boolean,
        centered: Boolean
    },
    data() {
        return {
            snap_direction: { "top": true, "left": true, "bottom": true, "right": true, "center": true, "middle": true },
            moving: false,
            resizing: false,
            maximized: false,
            minimized: false,
            last_state: {
                transform: "",
                width: "",
                height: ""
            }
        }
    },
    mounted() {
        this.$refs['window' + this.id].addEventListener('mouseup', ()=>{
            this.moving = false;
            this.resizing = false;
        });

        if(!this.centered) {
            this.$refs['window' + this.id].style.left = Math.random() * (window.innerWidth - 200) + 0 + 'px';
            this.$refs['window' + this.id].style.top = Math.random() * (window.innerHeight - 532) + 32 + 'px';
        }
        else
        {
            this.$refs['window' + this.id].style.left = window.innerWidth/2 - this.width/2 + 'px';
            this.$refs['window' + this.id].style.top = window.innerHeight / 2 - this.height / 2 + 'px';
        }

        if (this.width){
            this.$refs['window' + this.id].style.width = this.width + 'px';
            this.last_state.width = `${this.width}px`;}
        if (this.height){
            this.$refs['window' + this.id].style.height = this.height + 'px';
            this.last_state.height = `${this.height}px`;}
        

    },
    methods: {
        close() {

        },
        minimize() {
            if(this.minimizable) {
                this.minimized = !this.minimized;
                if (this.minimized) {
                    this.$refs['window' + this.id].style.width = '20px';
                    this.$refs['window' + this.id].style.height = '30px';
                    this.$refs['window' + this.id].style.transform = null;
                    this.$refs['window' + this.id].style.top = window.innerHeight + 'px';
                    this.$refs['window' + this.id].style.left = '50px';
                }
                else {
                    this.$refs['window' + this.id].style.width = this.last_state.width;
                    this.$refs['window' + this.id].style.height = this.last_state.height;
                    this.$refs['window' + this.id].style.top = null;
                    this.$refs['window' + this.id].style.left = null;
                    this.$refs['window' + this.id].style.transform = this.last_state.transform;
                }
            }
        },
        toggleMaximize() {
            if(this.maximizable) {
                this.$emit('activate', this.id);
                this.maximized = !this.maximized;
                if (this.maximized) {
                    this.$refs['window' + this.id].style.width = '100%';
                    this.$refs['window' + this.id].style.height = '100%';
                    this.$refs['window' + this.id].style.transform = null;
                    this.$refs['window' + this.id].style.top = '32px';
                    this.$refs['window' + this.id].style.left = '0px';
                }
                else {
                    this.$refs['window' + this.id].style.width = this.last_state.width;
                    this.$refs['window' + this.id].style.height = this.last_state.height;
                    this.$refs['window' + this.id].style.top = null;
                    this.$refs['window' + this.id].style.left = null;
                    this.$refs['window' + this.id].style.transform = this.last_state.transform;
                }
            }
            
            
        },
        onDrag(e) {
            if(this.moveable) {

                this.$emit('activate', this.id);
                this.moving = true;
                if (this.maximized)
                    this.toggleMaximize();

                if (e.clientX > 0 && e.clientX < window.innerWidth && e.clientY > 10 && e.clientY < window.innerHeight) {

                    e.target.style.transform = e.transform;
                    this.last_state.transform = e.transform
                }
            }
        },
        onScale(e) {
            if(this.resizable) {

                this.$emit('activate', this.id);
                this.resizing = true;
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
                this.last_state.transform = e.drag.transform;
                this.last_state.width = `${e.width}px`;
                this.last_state.height = `${e.height}px`;
            }
        }
    }
}
</script>
<style scoped lang="scss">
.ap__window {
    position: fixed;
    width: 400px;
    display: flex;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    flex-direction: column;
    height: 400px;
    z-index: 200;
    filter: brightness(101%);
    &.active {
        z-index: 201;
        filter: none;
    }
    &.moving {
        transition: height .2s ease,width .2s ease, top .2s ease,left .2s ease;
    }
    &.non-resizing:not(.moving) {
        transition: height .2s ease,width .2s ease, top .2s ease,left .2s ease,transform .2s ease;
    }
    .apw__body {
        height: 100%;
        user-select: none;
        background-color: rgb(255, 255, 255);
    }
}
</style>
<style>
.moveable-line, .moveable-control, .moveable-guideline-group {
    opacity: 0; 
}
</style>