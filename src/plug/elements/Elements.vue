<template> 
    <component :is="component" :item='item' @event='event'></component>
</template>
<script>  

import FdButton from './button'
import FdCheck from './checkboxs';
import FdCounter from './counter';
import FdInput from './input';
import FdProgress from './progress';
import FdRadios from './radios';
import FdRate from './rate';
import FdSelect from './select';
import FdSlider from './slider';
import FdSwitch from './switch';
import FdSpan from './span'
import FdDate from './date'
import FdDropdown from './dropdown'
import FdImg from './img'
import FdIcon from './icon'
import FdUpload from './upload'
import FdCascader from './cascader'
import FdTree from './tree'
import FdTag from './tag'
import FdCheckbox from './checkbox'
import FdTags from './tags'
import FdRender from './render'
import FdBr from './br'
import FdHr from './hr'
import FdSpace from './space'

import exComponents from '../config/components'
const customMap = {}

import util from '../utils/util.js'

export default {
    name: 'elements',
    props: ['item'], 
    components: { 
        FdButton, 
        FdCheck, 
        FdCounter, 
        FdInput, 
        FdProgress, 
        FdRadios, 
        FdRate, 
        FdSelect, 
        FdSlider, 
        FdSwitch, 
        FdSpan, 
        FdDate,
        FdDropdown,
        FdImg,
        FdIcon,
        FdUpload,
        FdCascader,
        FdTree,
        FdTag,
        FdCheckbox,
        FdTags,
        FdRender,
        FdBr,
        FdHr,
        FdSpace 
    },
    computed: {
        component() {  
            let type = util.getType(this.item) 
            return this.customComponent(type) || type
        }
    },
    methods: { 
        customComponent(type) {
            return customMap[type.replace('-', '')] 
        },
        event(params) {
            this.$emit('event', params);
        },
        initMap() {
            for (let key in exComponents.components) { 
                customMap[exComponents.components[key].name] = exComponents.components[key]
            }
        }
    },
    created() {
        this.initMap()
    }, 
}
</script>
