<template>
    <div class="v32_network_icon">
        <span class="v32_network_base" v-html="networkIcon"></span>
        <span class="v32_network_off" v-if="state == 'off'" v-html="networkIconOff"></span>
        <span class="v32_network_tx" v-if="state == 'tx'" v-html="networkIconTx"></span>
        <span class="v32_network_rx" v-if="state == 'rx'" v-html="networkIconRx"></span>
    </div>
</template>

<script>
    export default {
        props: {
            state: String
        },
        computed: {
            networkIcon() {
                return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="20" height="20" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-32697,-10819.7)">
        <g id="Artboard10" transform="matrix(0.603385,0,0,0.584202,13027.5,4510.05)">
            <rect x="32598.6" y="10800.5" width="46.405" height="47.929" style="fill:none;"/>
            <clipPath id="_clip1">
                <rect x="32598.6" y="10800.5" width="46.405" height="47.929"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
                <g transform="matrix(1.91534,0,0,1.97823,-30018.3,-10517.6)">
                    <g transform="matrix(1.01162,0,0,1.01162,-374.151,-130.471)">
                        <path d="M32686.5,10801.3L32691,10801.3L32691,10802.4L32688.6,10802.4L32688.6,10803.5L32700.6,10803.5L32700.6,10802.4L32698.2,10802.4L32698.2,10801.3L32702.7,10801.3L32702.7,10790.1L32686.5,10790.1L32686.5,10801.3ZM32701.4,10791.4L32701.4,10800C32701.4,10800 32687.8,10800 32687.8,10800C32687.8,10800 32687.8,10791.4 32687.8,10791.4L32701.4,10791.4Z" style="fill:white!important;"/>
                    </g>
                    <g transform="matrix(1,0,0,1,-2.98126,0)">
                        <path d="M32702,10785.1L32702,10778.3L32718.4,10778.3L32718.4,10789.6L32713.8,10789.6L32713.8,10790.7L32716.3,10790.7L32716.3,10791.8L32711.6,10791.8L32711.6,10788.3L32717.1,10788.3L32717.1,10779.6L32703.4,10779.6L32703.4,10785.1L32702,10785.1Z"  style="fill:white!important;"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
      `;
            },
            networkIconOff() {
                return `
       <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="20" height="20" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-miterlimit:1.5;">
    <g transform="matrix(1,0,0,1,-32730,-10819.7)">
        <g id="Artboard10" transform="matrix(0.603385,0,0,0.584202,13060.5,4510.05)">
            <rect x="32598.6" y="10800.5" width="46.405" height="47.929" style="fill:none;"/>
            <g transform="matrix(1.91534,0,0,1.97823,-30079.7,-10517.6)">
                <g transform="matrix(0.734769,0,0,0.734769,8669.6,2867.17)">
                    <circle cx="32762.7" cy="10786.4" r="8.075" style="fill:rgb(213,35,35);"/>
                </g>
                <g transform="matrix(0.610903,0,0,0.610903,12739.6,4199.33)">
                    <path d="M32738.4,10787.8L32748.4,10797.8" style="fill:none;stroke:var(--contrast-font)!important;stroke-width:1.84px;"/>
                </g>
                <g transform="matrix(5.53817e-14,0.610903,-0.610903,5.53817e-14,39336,-9210.38)">
                    <path d="M32738.4,10787.8L32748.4,10797.8" style="fill:none;stroke:var(--contrast-font)!important;stroke-width:1.84px;"/>
                </g>
            </g>
        </g>
    </g>
</svg>
      `;
            },
            networkIconTx() {
                return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="20" height="20" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-32761.5,-10819.7)">
        <g id="Artboard10" transform="matrix(0.603385,0,0,0.584202,13092,4510.05)">
            <rect x="32598.6" y="10800.5" width="46.405" height="47.929" style="fill:none;"/>
            <g transform="matrix(1.92494,0,0,1.97823,-30455.7,-10517.6)">
                <rect x="32757.9" y="10786.4" width="13.657" height="8.627" style="fill:var(--contrast-font)!important;"/>
            </g>
        </g>
    </g>
</svg>
      `;
            },
            networkIconRx() {
                return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="20" height="20" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-32792.4,-10819.7)">
        <g id="Artboard10" transform="matrix(0.603385,0,0,0.584202,13122.9,4510.05)">
            <rect x="32598.6" y="10800.5" width="46.405" height="47.929" style="fill:none;"/>
            <g transform="matrix(1.92494,0,0,1.97823,-30442.7,-10531)">
                <path d="M32771.6,10786.4L32757.9,10786.4L32757.9,10791.8L32766.1,10791.8L32766.1,10795L32771.6,10795L32771.6,10786.4Z" style="fill:var(--contrast-font)!important;"/>
            </g>
        </g>
    </g>
</svg>
      `;
            }
        }
    };
</script>

<style scoped>
    .v32_network_icon {
        padding-top: 7px;
    }

    .v32_network_base {
        position: absolute;
        width: 20px;
        height: 20px;
    }

    .v32_network_off {
        position: absolute;
        width: 20px;
        height: 20px;
    }

    .v32_network_tx {
        position: absolute;
        width: 20px;
        height: 20px;
    }

    .v32_network_rx {
        position: absolute;
        width: 20px;
        height: 20px;
    }
</style>