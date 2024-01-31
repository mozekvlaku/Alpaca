<template>
    <div class="ap__window_title" :class="{'active': active}">
        <div class="apwt__spacer"></div>
        <div class="apwt__icon"></div>
        <div class="apwt__title">
            <slot></slot>
        </div>
        <div class="apwt__spacer"></div>
        <div class="apwt__button" v-if="minimizable" v-html="minimize" @click="$emit('minimize')"></div>
        <div class="apwt__button" v-if="maximizable && maximized" v-html="restore" @click="$emit('maximize')"></div>
        <div class="apwt__button" v-if="maximizable && !maximized" v-html="maximize" @click="$emit('maximize')"></div>
        <div class="apwt__button" v-if="closeable" v-html="close" @click="$emit('close')"></div>
    </div>
</template>
<script>
export default {
    props: {
        maximized: Boolean,
        active: Boolean,
        maximizable: Boolean,
        minimizable: Boolean,
        closeable: Boolean,
    },
    computed: {
        minimize() {
            return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
                    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
                    <svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                        <g transform="matrix(1,0,0,1,-4965.72,249.37)">
                            <g transform="matrix(1,0,0,1,-436.001,-465.97)">
                                <path d="M5418.54,230.478L5418.54,233.426L5408.72,233.426L5408.72,230.478L5410.52,230.478C5410.52,232.035 5410.52,231.626 5410.52,231.626C5410.52,231.626 5416.74,231.626 5416.74,231.626L5416.74,230.478L5418.54,230.478Z" style="fill:rgb(103,103,103);" />
                            </g>
                            <g transform="matrix(0.860466,0,0,0.860466,629.596,-32.3667)">
                                <rect x="5039.27" y="-252.193" width="27.689" height="27.689" style="fill:none;" />
                            </g>
                        </g>
                    </svg>`;
        },
        maximize() {
            return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-4999.38,249.37)">
        <g transform="matrix(1.31818,0,0,1.31818,-2149.2,-532.933)">
            <path d="M5432.1,220.426L5435.82,220.426L5435.82,224.154L5434.46,224.154L5434.46,221.792L5432.1,221.792L5432.1,220.426ZM5432.1,227.881L5428.37,227.881L5428.37,224.154L5429.73,224.154L5429.73,226.516L5432.1,226.516L5432.1,227.881Z" style="fill:rgb(103,103,103);"/>
        </g>
        <g transform="matrix(0.860466,0,0,0.860466,663.263,-32.3667)">
            <rect x="5039.27" y="-252.193" width="27.689" height="27.689" style="fill:none;"/>
        </g>
    </g>
</svg>`;
        },
        close() {
            return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-5034.9,249.37)">
        <g transform="matrix(1,0,0,1,-41.196,-397.84)">
            <path d="M5088.01,151.051C5093.16,151.051 5097.34,155.232 5097.34,160.383C5097.34,165.533 5093.16,169.715 5088.01,169.715C5082.86,169.715 5078.68,165.533 5078.68,160.383C5078.68,155.232 5082.86,151.051 5088.01,151.051ZM5086.73,160.383L5083.18,163.935L5084.45,165.208L5088.01,161.656L5091.56,165.208L5092.83,163.935L5089.28,160.383L5092.83,156.831L5091.56,155.558L5088.01,159.11L5084.45,155.558L5083.18,156.831L5086.73,160.383Z" style="fill:rgb(217,203,159);"/>
        </g>
        <g transform="matrix(0.860466,0,0,0.860466,698.779,-32.3667)">
            <rect x="5039.27" y="-252.193" width="27.689" height="27.689" style="fill:none;"/>
        </g>
    </g>
</svg>`;
        },
        restore() {
            return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-5069.97,249.37)">
        <g transform="matrix(1.31818,0,0,1.31818,-2078.61,-532.933)">
            <path d="M5435.82,224.154L5432.1,224.154L5432.1,220.426L5433.46,220.426L5433.46,222.788L5435.82,222.788L5435.82,224.154ZM5428.37,224.154L5432.1,224.154L5432.1,227.881L5430.73,227.881L5430.73,225.519L5428.37,225.519L5428.37,224.154Z" style="fill:rgb(103,103,103);"/>
        </g>
        <g transform="matrix(0.860466,0,0,0.860466,733.854,-32.3667)">
            <rect x="5039.27" y="-252.193" width="27.689" height="27.689" style="fill:none;"/>
        </g>
    </g>
</svg>`;
        },
    }
}
</script>
<style scoped lang="scss">
$window_title_height: 32px;
.ap__window_title {
    width: 100%;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(236, 236, 236) 100%);
    height: $window_title_height;
    display: flex;
    user-select: none;
    align-items: center;
    padding: 0px 4px;
    filter: grayscale(100%) brightness(104%);
    &.active {
        filter: none;
    }
    .apwt__spacer {
        height: 24px;
        width: 100%;
        &.spacer__left {
            margin-left: 24px * 2;
        }
    }
    .apwt__title {
        font-size: 12px;
        text-wrap: nowrap;
    }
    .apwt__button {
        width: 24px;
        height: 24px;
        border-radius: 50px;
        cursor:pointer;
        transition: background-color .05s ease-in-out;
        &:hover {
            background-color: rgba(0, 0, 0, 0.075);
        }
    }
}
</style>