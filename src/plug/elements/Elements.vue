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
        FdTags
    },
    computed: {
        component() {
            return util.getType(this.item)
        }
    },
    methods: { 
        event(params) {
            this.$emit('event', params);
        }
    }
}
</script>
