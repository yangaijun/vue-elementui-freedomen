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
import FdPagination from './pagination'

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
        FdPagination
    },
    computed: {
        component() {
            return this.getType(this.item.type)
        }
    },
    methods: { 
        getType(type) {
            const prefix = 'fd-' 
            if (typeof type === 'string') {
                return prefix + type.split('-')[0]
            } else if (typeof type === 'function') {
                return this.getType(type({value: this.item.value, data: this.item.$data}))
            }
            return null
        },
        event(params) {
            this.$emit('event', params);
        }
    }
}
</script>
